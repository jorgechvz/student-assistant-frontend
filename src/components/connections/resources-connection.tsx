import React from "react";
import { Check, ArrowRight } from "lucide-react";
import type { AppState } from "@/types/connections.types";
import { Button } from "../ui/button";

interface ConnectIntegrationsProps {
  status: AppState;
  onConnect: (service: keyof AppState) => void;
  onContinue: () => void;
}

const ConnectIntegrations: React.FC<ConnectIntegrationsProps> = ({
  status,
  onConnect,
  onContinue,
}) => {
  const allConnected =
    status.canvasStatus === "connected" &&
    status.calendarStatus === "connected" &&
    status.notionStatus === "connected";

  const ServiceCard = ({
    id,
    name,
    icon,
    description,
    isConnected,
  }: {
    id: keyof AppState;
    name: string;
    icon: string;
    description: string;
    isConnected: boolean;
  }) => (
    <div
      className={`p-6 rounded-xl border-2 transition-all ${
        isConnected
          ? "border-blue-500 bg-blue-50/50"
          : "border-gray-200 bg-white hover:border-indigo-200"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div
            className={`p-3 rounded-lg ${
              isConnected
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <img src={icon} alt={`${name} icon`} className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
        </div>
        <Button
          onClick={() => !isConnected && onConnect(id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isConnected
              ? "bg-transparent text-blue-600 cursor-default flex items-center hover:bg-transparent"
              : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          {isConnected ? (
            <>
              <Check size={16} className="mr-1.5" />
              Connected
            </>
          ) : (
            "Connect"
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Setup Your Workspace
          </h1>
          <p className="text-gray-500">
            Connect your tools to enable Loop capabilities.
          </p>
        </div>

        <div className="space-y-4">
          <ServiceCard
            id="canvasStatus"
            name="Canvas LMS"
            icon={"https://img.icons8.com/fluency/48/canvas-student.png"}
            description="Sync your courses, assignments, and grades."
            isConnected={status.canvasStatus === "connected"}
          />
          <ServiceCard
            id="calendarStatus"
            name="Google Calendar"
            icon={"https://img.icons8.com/color/48/google-calendar--v2.png"}
            description="Schedule study sessions and track deadlines."
            isConnected={status.calendarStatus === "connected"}
          />
          <ServiceCard
            id="notionStatus"
            name="Notion"
            icon={"https://img.icons8.com/material-outlined/96/notion--v1.png"}
            description="Save summaries, notes, and study guides."
            isConnected={status.notionStatus === "connected"}
          />
        </div>

        <div className="pt-4 flex justify-end">
          <Button
            onClick={onContinue}
            disabled={!allConnected}
            size={"lg"}
            className={`flex items-center space-x-2 rounded-xl font-semibold transition-all ${
              allConnected
                ? "bg-primary text-white hover:bg-primary/90 shadow-lg hover:shadow-xl translate-y-0"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <span>Start Learning</span>
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConnectIntegrations;
