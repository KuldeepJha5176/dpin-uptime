import { useState } from "react";
import { cn } from "@/lib/utils";
import { StatusIndicator } from "@/components/status-indicator";
import { UptimeHistory } from "@/components/uptime-history";
import { ChevronDown, ChevronUp, ExternalLink, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Website } from "@/hooks/usewebsites";

interface WebsiteCardProps {
  website: Website;
  className?: string;
}

export function WebsiteCard({ website, className }: WebsiteCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Ensure ticks exist with a fallback to empty array
  const ticks = website.ticks || [];
  
  // Determine current status
  const latestTick = ticks.length > 0 ? ticks[ticks.length - 1] : null;
  const currentStatus = latestTick?.status === "up" ? "up" : "down";
  
  // Calculate average response time from the last 5 successful ticks
  const successTicks = ticks
    .filter(tick => tick.status === "up")
    .slice(-5);
  
  const avgResponseTime = successTicks.length 
    ? Math.round(successTicks.reduce((sum, tick) => sum + tick.latency, 0) / successTicks.length) 
    : 0;

  // Get the most recent check timestamp
  const lastChecked = latestTick?.createdAt || new Date().toISOString();

  return (
    <Card
      className={cn(
        "overflow-hidden border border-border/50 transition-all duration-300 hover:shadow-md",
        className
      )}
    >
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <StatusIndicator status={currentStatus} size="lg" pulse={true} />
          <div>
            <h3 className="font-medium">{website.name || website.url}</h3>
            <p className="text-sm text-muted-foreground">{website.url}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              {avgResponseTime > 0 ? `${avgResponseTime}ms` : 'N/A'}
            </span>
          </div>
          <div className="text-sm text-muted-foreground hidden sm:block">
            {new Date(lastChecked).toLocaleString()}
          </div>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <CardContent className="border-t pt-4 pb-5">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-sm font-medium">Last 30 minutes uptime</h4>
                <a
                  href={website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Visit site
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <UptimeHistory ticks={ticks} windowSize={3} maxWindows={10} />
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
