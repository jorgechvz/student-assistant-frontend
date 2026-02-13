import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Cable, Trash2, Plus, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { axiosClient } from "@/api/axios-client";
import { CanvasConnectionForm } from "../connections/canvas-connection";

interface ConnectionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialService?: "canvas" | "notion" | "calendar";
}

export function ConnectionsDialog({
  open,
  onOpenChange,
  initialService,
}: ConnectionsDialogProps) {
  const [canvasConnected, setCanvasConnected] = useState(false);
  const [notionConnected, setNotionConnected] = useState(false);
  const [calendarConnected, setCalendarConnected] = useState(false);

  const [showCanvasForm, setShowCanvasForm] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      checkConnectionsStatus();

      if (initialService === "canvas") {
        checkCanvasStatus().then((connected) => {
          if (!connected) {
            setShowCanvasForm(true);
          }
        });
      }
    }
  }, [open, initialService]);

  const checkConnectionsStatus = async () => {
    try {
      const [canvasRes, notionRes, calendarRes] = await Promise.allSettled([
        axiosClient.get<{ connected: boolean; canvas_base_url?: string }>(
          "canvas/status",
        ),
        axiosClient.get<{ connected: boolean }>("auth/notion/status"),
        axiosClient.get<{ connected: boolean }>("auth/google/status"),
      ]);

      if (canvasRes.status === "fulfilled") {
        setCanvasConnected(canvasRes.value.data.connected);
        if (
          canvasRes.value.data.connected &&
          canvasRes.value.data.canvas_base_url
        ) {
          setBaseUrl(canvasRes.value.data.canvas_base_url);
        }
      }

      if (notionRes.status === "fulfilled") {
        setNotionConnected(notionRes.value.data.connected);
      }

      if (calendarRes.status === "fulfilled") {
        setCalendarConnected(calendarRes.value.data.connected);
      }
    } catch (error) {
      console.error("Error checking connections status:", error);
    }
  };

  const checkCanvasStatus = async (): Promise<boolean> => {
    try {
      const response = await axiosClient.get<{
        connected: boolean;
        canvas_base_url?: string;
      }>("canvas/status");
      setCanvasConnected(response.data.connected);
      if (response.data.connected && response.data.canvas_base_url) {
        setBaseUrl(response.data.canvas_base_url);
      }
      return response.data.connected;
    } catch (error) {
      console.error("Error checking Canvas status:", error);
      return false;
    }
  };

  const handleCanvasSuccess = async () => {
    setCanvasConnected(true);
    setShowCanvasForm(false);
    await checkCanvasStatus();
  };

  const handleDisconnectCanvas = async () => {
    try {
      await axiosClient.delete("canvas/disconnect");
      setCanvasConnected(false);
      setBaseUrl("");
      setShowCanvasForm(true);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to disconnect Canvas");
    }
  };

  const handleEditCanvas = () => {
    setShowCanvasForm(true);
    setError(null);
  };

  const handleDisconnectNotion = async () => {
    try {
      await axiosClient.delete("auth/notion/disconnect");
      setNotionConnected(false);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to disconnect Notion");
    }
  };

  const handleDisconnectCalendar = async () => {
    try {
      await axiosClient.delete("auth/google/disconnect");
      setCalendarConnected(false);
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Failed to disconnect Google Calendar",
      );
    }
  };

  const handleConnectNotion = () => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
    window.location.href = `${API_URL}/auth/notion/authorize`;
  };

  const handleConnectCalendar = () => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
    window.location.href = `${API_URL}/auth/google/authorize`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full md:min-w-3xl max-w-3xl max-h-[90vh] overflow-y-auto no-scrollbar">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Cable className="h-6 w-6" />
            Connections
          </DialogTitle>
          <DialogDescription>
            Connect your tools to enable AI Loop capabilities
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4 w-full">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {canvasConnected && !showCanvasForm ? (
            <div className="p-6 rounded-xl border-2 border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                    <img
                      src="https://img.icons8.com/fluency/48/canvas-student.png"
                      alt="Canvas LMS icon"
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      Canvas LMS
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Access assignments, courses, and grades
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant="outline"
                        className="border-green-500 text-green-700 dark:text-green-400"
                      >
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5" />
                        Connected
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEditCanvas}
                    className="text-xs"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDisconnectCanvas}
                    className="text-xs"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Disconnect
                  </Button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800 space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">
                    Base URL
                  </Label>
                  <p className="text-sm font-mono bg-background/50 px-3 py-2 rounded-md border mt-1">
                    {baseUrl}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">
                    API Token
                  </Label>
                  <p className="text-sm font-mono bg-background/50 px-3 py-2 rounded-md border mt-1">
                    {"•".repeat(40)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                    <img
                      src="https://img.icons8.com/fluency/48/canvas-student.png"
                      alt="Canvas LMS icon"
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      Canvas LMS
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Access assignments, courses, and grades
                    </p>
                  </div>
                </div>
              </div>

              <CanvasConnectionForm
                onSuccess={handleCanvasSuccess}
                onCancel={
                  canvasConnected ? () => setShowCanvasForm(false) : undefined
                }
                showCancelButton={canvasConnected}
              />
            </div>
          )}

          <div className="space-y-3">
            {calendarConnected ? (
              <div className="p-6 rounded-xl border-2 border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                      <img
                        src="https://img.icons8.com/color/48/google-calendar--v2.png"
                        alt="Google Calendar icon"
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        Google Calendar
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Schedule study sessions and track deadlines
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant="outline"
                          className="border-green-500 text-green-700 dark:text-green-400"
                        >
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5" />
                          Connected
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDisconnectCalendar}
                    className="text-xs"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Disconnect
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      <img
                        src="https://img.icons8.com/color/48/google-calendar--v2.png"
                        alt="Google Calendar icon"
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        Google Calendar
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Schedule study sessions and track deadlines
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleConnectCalendar}
                    className="flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Connect</span>
                  </Button>
                </div>
              </div>
            )}

            {notionConnected ? (
              <div className="p-6 rounded-xl border-2 border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                      <img
                        src="https://img.icons8.com/material-outlined/96/notion--v1.png"
                        alt="Notion icon"
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        Notion
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Save summaries, notes, and study guides
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant="outline"
                          className="border-green-500 text-green-700 dark:text-green-400"
                        >
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5" />
                          Connected
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDisconnectNotion}
                    className="text-xs"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Disconnect
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      <img
                        src="https://img.icons8.com/material-outlined/96/notion--v1.png"
                        alt="Notion icon"
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        Notion
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Save summaries, notes, and study guides
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleConnectNotion}
                    className="flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Connect</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
