import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2, Plus, AlertCircle, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { axiosClient } from "@/api/axios-client";

interface CanvasConnectionFormProps {
  onSuccess?: (canvasUserName: string) => void;
  onCancel?: () => void;
  showCancelButton?: boolean;
}

export function CanvasConnectionForm({
  onSuccess,
  onCancel,
  showCancelButton = false,
}: CanvasConnectionFormProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [canvasUserName, setCanvasUserName] = useState<string | null>(null);

  const handleConnect = async () => {
    setError(null);
    setSuccess(false);

    if (!baseUrl.trim() || !token.trim()) {
      setError("Please fill in all fields");
      return;
    }

    try {
      new URL(baseUrl);
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    setIsConnecting(true);

    try {
      const response = await axiosClient.post<{
        message: string;
        canvas_user_name: string;
      }>("canvas/setup", {
        canvas_base_url: baseUrl.trim(),
        access_token: token.trim(),
      });

      setSuccess(true);
      setCanvasUserName(response.data.canvas_user_name);

      if (onSuccess) {
        onSuccess(response.data.canvas_user_name);
      }

      setTimeout(() => {
        setToken("");
      }, 2000);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.detail ||
        "Failed to connect to Canvas. Please check your credentials.";
      setError(errorMessage);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-4">
      {success && canvasUserName && (
        <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
          <Check className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            Successfully connected to Canvas LMS as{" "}
            <span className="font-semibold">{canvasUserName}</span>!
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="canvas-url" className="text-sm font-medium">
          Canvas Base URL
          <span className="text-destructive ml-1">*</span>
        </Label>
        <Input
          id="canvas-url"
          type="url"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          placeholder="https://your-school.instructure.com"
          disabled={isConnecting || success}
          className="text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Your Canvas institution URL (e.g., https://canvas.instructure.com)
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="canvas-token" className="text-sm font-medium">
          API Access Token
          <span className="text-destructive ml-1">*</span>
        </Label>
        <Input
          id="canvas-token"
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter your Canvas API token"
          disabled={isConnecting || success}
          className="text-sm"
        />
        <div className="text-xs text-muted-foreground space-y-1">
          <p className="flex items-center gap-1 flex-wrap">
            Don't have a token?
            <a
              href="https://community.canvaslms.com/t5/Student-Guide/How-do-I-manage-API-access-tokens-as-a-student/ta-p/273"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              Learn how to generate one
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-xs">
          Your credentials are stored securely and encrypted. We only use them
          to fetch your course data and never share your information with third
          parties.
        </AlertDescription>
      </Alert>

      <div className="flex justify-end gap-2 pt-2">
        {showCancelButton && onCancel && !success && (
          <Button variant="outline" onClick={onCancel} disabled={isConnecting}>
            Cancel
          </Button>
        )}
        <Button
          onClick={handleConnect}
          disabled={isConnecting || success}
          className="flex items-center space-x-2"
        >
          {isConnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : success ? (
            <>
              <Check className="h-4 w-4" />
              <span>Connected</span>
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              <span>Connect Canvas</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
