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
  const { data } = await axiosClient.get(
    CANVAS_ENDPOINTS.UPCOMING_ASSIGNMENTS,
  );

  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.assignments)) return data.assignments;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
}
