import { Loader2 } from "lucide-react";
import LoopLogo from "@/components/logo/logo";

export function SessionLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
        <div className="flex flex-col items-center justify-center gap-6 animate-in zoom-in-95 duration-300">
            <div className="relative p-6 rounded-2xl bg-secondary/30 backdrop-blur-sm border border-border/50 shadow-sm">
                 <LoopLogo size="sm" />
            </div>
            
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-secondary/50 border border-border/50">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                <span className="text-sm font-medium text-muted-foreground">{message}</span>
            </div>
        </div>
    </div>
  );
}
