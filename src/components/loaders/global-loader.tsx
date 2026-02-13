import LoopLogo from "@/components/logo/logo";

export function GlobalLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-background gap-6 animate-in fade-in duration-500">
      <div className="relative">
        <div className="animate-pulse">
            <LoopLogo size="md" />
        </div>
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10 scale-150 animate-pulse" />
      </div>
      
      <div className="flex items-center gap-1.5 mt-2">
        <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}
