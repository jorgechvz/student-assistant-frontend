import { memo } from "react";
import { Calendar, ExternalLink, Loader2, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useUpcomingAssignments } from "@/hooks/use-canvas";

interface UpcomingAssignmentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UpcomingAssignmentsDialog = memo(
  function UpcomingAssignmentsDialog({
    open,
    onOpenChange,
  }: UpcomingAssignmentsDialogProps) {
    const { data: assignments, isLoading, error } = useUpcomingAssignments();

    const formatDueDate = (dateString: string) => {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = date.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      });

      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      let urgency = "text-gray-700";
      let urgencyLabel = "";

      if (diffDays < 0) {
        urgency = "text-red-600";
        urgencyLabel = "Overdue";
      } else if (diffDays === 0) {
        urgency = "text-orange-600";
        urgencyLabel = "Due today";
      } else if (diffDays === 1) {
        urgency = "text-orange-500";
        urgencyLabel = "Due tomorrow";
      } else if (diffDays <= 7) {
        urgency = "text-yellow-600";
        urgencyLabel = `Due in ${diffDays} days`;
      } else {
        urgencyLabel = `Due in ${diffDays} days`;
      }

      return { formattedDate, formattedTime, urgency, urgencyLabel };
    };

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Assignments
            </DialogTitle>
            <DialogDescription>
              Your upcoming assignments across all Canvas courses
            </DialogDescription>
          </DialogHeader>

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-4 text-sm text-muted-foreground">
                Loading assignments...
              </p>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error instanceof Error
                  ? error.message
                  : "Failed to load assignments. Make sure Canvas is connected."}
              </AlertDescription>
            </Alert>
          )}

          {!isLoading && !error && assignments && assignments.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No upcoming assignments</p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                You're all caught up!
              </p>
            </div>
          )}

          {!isLoading && !error && assignments && assignments.length > 0 && (
            <ScrollArea className="h-[50vh] pr-4">
              <div className="space-y-4">
                {assignments.map((assignment, index) => {
                  const { formattedDate, formattedTime, urgency, urgencyLabel } =
                    formatDueDate(assignment.due_at);

                  return (
                    <div
                      key={`${assignment.html_url}-${index}`}
                      className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm mb-1 truncate">
                            {assignment.assignment}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            {assignment.course}
                          </p>

                          {assignment.description && (
                            <p
                              className="text-xs text-gray-600 line-clamp-2 mb-3"
                              dangerouslySetInnerHTML={{
                                __html: assignment.description,
                              }}
                            />
                          )}

                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              variant="outline"
                              className={`text-xs ${urgency}`}
                            >
                              {urgencyLabel}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formattedDate} at {formattedTime}
                            </span>
                            {assignment.points > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                {assignment.points} pts
                              </Badge>
                            )}
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="shrink-0"
                        >
                          <a
                            href={assignment.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    );
  },
);
