import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-primary/20 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
          <div className="absolute inset-0 rounded-full border-t-4 border-primary animate-spin" />
        </div>
        
        {/* Loading Text */}
        <div className="text-center">
          <p className="font-orbitron text-lg text-foreground mb-2">{message}</p>
          <div className="flex items-center justify-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
