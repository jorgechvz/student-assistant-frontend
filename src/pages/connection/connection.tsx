import ConnectIntegrations from "@/components/connections/resources-connection";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CanvasConnectionForm } from "@/components/connections/canvas-connection";
import type { AppState } from "@/types/connections.types";
import { useState, useEffect } from "react";
import { axiosClient } from "@/api/axios-client";
import { useNavigate, useLocation } from "react-router-dom";
import { SessionLoader } from "@/components/loaders/session-loader";

export const ConnectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const intendedPath = (location.state as any)?.from?.pathname;
  const [showCanvasDialog, setShowCanvasDialog] = useState(false);
  const [hasCheckedConnections, setHasCheckedConnections] = useState(false);

  const [integrationState, setIntegrationState] = useState<AppState>({
    canvasStatus: "disconnected",
    calendarStatus: "disconnected",
    notionStatus: "disconnected",
  });

  useEffect(() => {
    const checkConnectionStatus = async () => {
      try {
        const results = await Promise.allSettled([
          axiosClient.get<{ connected: boolean }>("/canvas/status"),
          axiosClient.get<{ connected: boolean }>("/auth/notion/status"),
          axiosClient.get<{ connected: boolean }>("/auth/google/status"),
        ]);

        const [canvasResult, notionResult, googleResult] = results;

        setIntegrationState((prev) => {
          const newState = { ...prev };

          if (canvasResult.status === "fulfilled") {
            newState.canvasStatus = canvasResult.value.data.connected
              ? "connected"
              : "disconnected";
          }

          if (notionResult.status === "fulfilled") {
            newState.notionStatus = notionResult.value.data.connected
              ? "connected"
              : "disconnected";
          }

          if (googleResult.status === "fulfilled") {
            newState.calendarStatus = googleResult.value.data.connected
              ? "connected"
              : "disconnected";
          }

          return newState;
        });

        // If all connections already done, skip straight to chat (or intended path)
        if (
          (canvasResult.status === "fulfilled" && canvasResult.value.data.connected) &&
          (notionResult.status === "fulfilled" && notionResult.value.data.connected) &&
          (googleResult.status === "fulfilled" && googleResult.value.data.connected)
        ) {
          navigate(intendedPath || "/chat", { replace: true });
          return;
        }

        setHasCheckedConnections(true);
      } catch (error) {
        console.error("Error checking connection status:", error);
        setHasCheckedConnections(true);
      }
    };

    checkConnectionStatus();

    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      const service = params.get("service");

      if (service === "notion") {
        setIntegrationState((prev) => ({ ...prev, notionStatus: "connected" }));
      } else if (service === "google" || service === "calendar") {
        setIntegrationState((prev) => ({
          ...prev,
          calendarStatus: "connected",
        }));
      } else if (service === "canvas") {
        setIntegrationState((prev) => ({
          ...prev,
          canvasStatus: "connected",
        }));
      }

      window.history.replaceState({}, "", "/connection");
      setHasCheckedConnections(true);
    }
  }, []);

  const handleConnect = async (service: keyof AppState) => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

    if (service === "canvasStatus") {
      try {
        const response = await axiosClient.get<{ connected: boolean }>(
          "/canvas/status",
        );
        if (!response.data.connected) {
          setShowCanvasDialog(true);
        }
      } catch (error) {
        setShowCanvasDialog(true);
      }
      return;
    }

    if (service === "notionStatus") {
      window.location.href = `${API_URL}/auth/notion/authorize`;
    }

    if (service === "calendarStatus") {
      window.location.href = `${API_URL}/auth/google/authorize`;
    }
  };

  const handleContinue = () => {
    navigate("/chat");
  };

  const handleCanvasSuccess = async (canvasUserName: string) => {
    console.log("Canvas connected successfully as:", canvasUserName);

    setIntegrationState((prev) => ({
      ...prev,
      canvasStatus: "connected",
    }));

    setTimeout(() => {
      setShowCanvasDialog(false);
    }, 2000);
  };

  const handleCanvasDialogClose = () => {
    setShowCanvasDialog(false);
  };

  if (!hasCheckedConnections) {
    return <SessionLoader message="Verificando conexiones..." />;
  }

  return (
    <>
      <title>Connect Integrations | Loop</title>
      <meta
        name="description"
        content="Connect your Canvas, Notion and Google Calendar accounts to enhance your Loop experience"
      />
      <ConnectIntegrations
        status={integrationState}
        onConnect={handleConnect}
        onContinue={handleContinue}
      />

      <Dialog open={showCanvasDialog} onOpenChange={handleCanvasDialogClose}>
        <DialogContent className="sm:max-w-175">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <img
                src="https://img.icons8.com/fluency/48/canvas-student.png"
                alt="Canvas LMS"
                className="w-6 h-6"
              />
              Connect Canvas LMS
            </DialogTitle>
            <DialogDescription>
              Enter your Canvas credentials to sync your courses, assignments,
              and grades.
            </DialogDescription>
          </DialogHeader>

          <CanvasConnectionForm
            onSuccess={handleCanvasSuccess}
            onCancel={handleCanvasDialogClose}
            showCancelButton={true}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
