import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "up" | "down";
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
  className?: string;
}

export function StatusIndicator({
  status,
  size = "md",
  pulse = false,
  className,
}: StatusIndicatorProps) {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <span
        className={cn(
          "rounded-full",
          status === "up" ? "bg-success" : "bg-danger",
          sizeClasses[size],
          pulse && "animate-pulse",
          "transition-all duration-300"
        )}
      />
      {pulse && (
        <span
          className={cn(
            "absolute rounded-full -z-10 opacity-30",
            status === "up" ? "bg-success" : "bg-danger",
            size === "sm" ? "w-3 h-3" : size === "md" ? "w-5 h-5" : "w-7 h-7",
            "transition-all duration-300"
          )}
        />
      )}
    </div>
  );
}
