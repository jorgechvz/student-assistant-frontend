export type IntegrationStatus = "connected" | "disconnected";

export interface AppState {
  canvasStatus: IntegrationStatus;
  calendarStatus: IntegrationStatus;
  notionStatus: IntegrationStatus;
}
