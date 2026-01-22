export type IntegrationStatus = "connected" | "disconnected";

export interface AppState {
  calendarStatus: IntegrationStatus;
  notionStatus: IntegrationStatus;
}
