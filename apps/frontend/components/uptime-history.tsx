import { WebsiteTick } from "@/hooks/useWebsites";
import { cn } from "@/lib/utils";

interface UptimeHistoryProps {
  ticks: WebsiteTick[];
  className?: string;
  windowSize?: number; // Size of each window in minutes
  maxWindows?: number; // Maximum number of windows to display
}

export function UptimeHistory({ 
  ticks, 
  className, 
  windowSize = 3, 
  maxWindows = 10 
}: UptimeHistoryProps) {
  // Group ticks by time windows (3-minute intervals)
  const aggregatedTicks = aggregateTicksByTimeWindow(ticks, windowSize, maxWindows);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between gap-1.5 h-8">
        {aggregatedTicks.map((window, index) => (
          <div
            key={index}
            className="group relative h-full"
            title={`${window.status === "up" ? "Up" : "Down"} (${window.upPercentage.toFixed(0)}%) at ${formatTimeRange(window.startTime, window.endTime)}`}
          >
            <div className="w-8 h-full rounded-md flex items-center justify-center overflow-hidden backdrop-blur-sm transition-all duration-300 border border-border">
              <div
                className={cn(
                  "h-full w-full transform transition-all duration-300 group-hover:scale-95",
                  window.status === "up"
                    ? "bg-success"
                    : "bg-danger"
                )}
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 text-xs whitespace-nowrap pointer-events-none">
              {formatTimeWindow(window.startTime)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper functions
function aggregateTicksByTimeWindow(
  ticks: WebsiteTick[], 
  windowSize: number, 
  maxWindows: number
) {
  if (!ticks || ticks.length === 0) {
    return Array(maxWindows).fill({ status: "unknown", upPercentage: 0, startTime: new Date(), endTime: new Date() });
  }

  // Sort ticks by createdAt in ascending order
  const sortedTicks = [...ticks].sort((a, b) => 
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  // Get the most recent timestamp
  const latestTimestamp = new Date(sortedTicks[sortedTicks.length - 1].createdAt);
  
  // Calculate window boundaries going backwards from the latest timestamp
  const windows = [];
  
  for (let i = 0; i < maxWindows; i++) {
    // Window end time (for the latest window, it's the latest timestamp)
    const endTime = new Date(latestTimestamp.getTime() - i * windowSize * 60000);
    
    // Window start time
    const startTime = new Date(endTime.getTime() - windowSize * 60000);
    
    // Filter ticks that fall within this window
    const windowTicks = sortedTicks.filter(tick => {
      const tickTime = new Date(tick.createdAt).getTime();
      return tickTime >= startTime.getTime() && tickTime < endTime.getTime();
    });
    
    // Calculate uptime percentage for this window
    const upTicks = windowTicks.filter(tick => tick.status === "up").length;
    const upPercentage = windowTicks.length > 0 ? (upTicks / windowTicks.length) * 100 : 0;
    
    // Determine overall status (up if upPercentage >= 90%, otherwise down)
    const status = upPercentage >= 90 ? "up" : "down";
    
    windows.unshift({
      startTime,
      endTime,
      upPercentage,
      status,
      ticks: windowTicks
    });
  }
  
  return windows;
}
