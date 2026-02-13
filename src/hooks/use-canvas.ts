import { useQuery } from "@tanstack/react-query";
import { getUpcomingAssignments } from "@/api/canvas.api";

export const canvasKeys = {
  all: ["canvas"] as const,
  upcomingAssignments: () =>
    [...canvasKeys.all, "upcoming-assignments"] as const,
} as const;

export function useUpcomingAssignments() {
  return useQuery({
    queryKey: canvasKeys.upcomingAssignments(),
    queryFn: getUpcomingAssignments,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
