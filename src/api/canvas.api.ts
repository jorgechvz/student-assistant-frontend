import { axiosClient } from "./axios-client";

export interface UpcomingAssignment {
  course: string;
  assignment: string;
  description: string;
  due_at: string;
  points: number;
  html_url: string;
}

const CANVAS_ENDPOINTS = {
  UPCOMING_ASSIGNMENTS: "/canvas/upcoming-assignments",
} as const;

export async function getUpcomingAssignments(): Promise<UpcomingAssignment[]> {
  const { data } = await axiosClient.get<UpcomingAssignment[]>(
    CANVAS_ENDPOINTS.UPCOMING_ASSIGNMENTS,
  );
  return data;
}
