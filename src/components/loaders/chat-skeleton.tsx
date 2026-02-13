import { Skeleton } from "@/components/ui/skeleton";
import { Bot } from "lucide-react";

export function ChatSkeleton() {
  return (
    <div className="flex h-screen max-w-7xl bg-background overflow-hidden">
      <div className="hidden md:flex w-65 flex-col border-r h-full bg-sidebar">
        <div className="h-14 flex items-center px-4 border-b">
          <Skeleton className="h-6 w-32" />
        </div>

        <div className="flex-1 p-3 space-y-4 pt-6">
          <div className="space-y-1">
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
          </div>

          <div className="space-y-1 pt-4">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-8 w-full rounded-md" />
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
        </div>

        <div className="p-3 mt-auto border-t">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <div className="space-y-1">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-2 w-16" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col h-full bg-background relative max-w-3xl mx-auto">
        <div className="h-14 border-b flex items-center px-4 justify-between bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 md:hidden rounded-md" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        <ChatContentSkeleton />
      </div>
    </div>
  );
}

export function ChatContentSkeleton() {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden relative">
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full w-full overflow-y-auto">
          <div className="flex flex-col gap-4 max-w-3xl mx-auto p-4 pb-10">
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
              <Bot className="h-12 w-12 text-muted-foreground/50 mb-4 animate-pulse" />
              <Skeleton className="h-4 w-64" />
            </div>

            <div className="flex items-start gap-3">
              <Skeleton className="h-8 w-8 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-16" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[90%]" />
                  <Skeleton className="h-4 w-[80%]" />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 justify-end">
              <div className="flex-1 flex flex-col items-end space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-16 w-[60%] rounded-2xl rounded-tr-sm" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full shrink-0" />
            </div>

            <div className="flex items-start gap-3">
              <Skeleton className="h-8 w-8 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-16" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[95%]" />
                  <Skeleton className="h-4 w-[85%]" />
                  <Skeleton className="h-4 w-[75%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-2">
            <div className="flex-1 relative">
              <Skeleton className="h-12 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
