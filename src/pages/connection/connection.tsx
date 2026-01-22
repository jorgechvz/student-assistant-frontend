import ConnectIntegrations from "@/components/connections/resources-connection";
import type { AppState } from "@/types/connections.types";
import { useState, useEffect } from "react";
import { axiosClient } from "@/api/axios-client";

export const ConnectionPage = () => {
  const [integrationState, setIntegrationState] = useState<AppState>({
    calendarStatus: "disconnected",
    notionStatus: "disconnected",
  });

  useEffect(() => {
    const checkConnectionStatus = async () => {
      try {
        const results = await Promise.allSettled([
          axiosClient.get<{ connected: boolean }>("/auth/notion/status"),
          axiosClient.get<{ connected: boolean }>("/auth/google/status"),
        ]);

        const [notionResult, googleResult] = results;

        setIntegrationState((prev) => {
          const newState = { ...prev };

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
      } catch (error) {
        console.error("Error general checking connection capabilities:", error);
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
      }

      window.history.replaceState({}, "", "/connection");
    }
  }, []);

  const handleConnect = (service: keyof AppState) => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

    if (service === "notionStatus") {
      window.location.href = `${API_URL}/auth/notion/authorize`;
    }
    if (service === "calendarStatus") {
      window.location.href = `${API_URL}/auth/google/authorize`;
    }
  };

  const handleContinue = () => {
    console.log("Continuing to the next step...");
  };

  return (
    <ConnectIntegrations
      status={integrationState}
      onConnect={handleConnect}
      onContinue={handleContinue}
    />
  );
};
