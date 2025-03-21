"use client";

import { WebsiteCard } from "@/components/website-card";
import { AddWebsiteDialog } from "@/components/add-website-dialog";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Activity,
  ArrowUpCircle,
  AlertCircle,
  ArrowDownCircle
} from "lucide-react";
import { useWebsites, Website, WebsiteTick } from "@/hooks/useWebsites";
import axios from "axios";
import { API_BACKEND_URL } from "@/config";
import { useAuth } from "@clerk/nextjs";

const Index = () => {
  const { websites, loading, refreshWebsites, error } = useWebsites();
  const { getToken } = useAuth();

  // Process websites to aggregate ticks in 3-minute windows
  const processedWebsites = websites.map(website => {
    const aggregatedTicks = aggregateTicksInWindows(website.ticks, 3);
    return {
      ...website,
      ticks: aggregatedTicks
    };
  });

  const handleAddWebsite = async (name: string, url: string) => {
    try {
      const token = await getToken();
      
      if (!token) {
        console.error("Authentication token is missing");
        return;
      }
      
      await axios.post(
        `${API_BACKEND_URL}/api/v1/websites`, 
        { name, url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Refresh websites list after adding a new one
      refreshWebsites();
    } catch (err) {
      console.error("Error adding website:", err);
    }
  };

  // Calculate website statistics
  const totalUp = processedWebsites.filter(site => {
    const latestTick = site.ticks.length > 0 ? site.ticks[site.ticks.length - 1] : null;
    return latestTick?.status === "up";
  }).length;
    
  const totalDown = processedWebsites.length - totalUp;
  
  // Get last check time from the most recently updated website
  const getLastCheckedTime = () => {
    if (processedWebsites.length === 0) return null;
    
    let latestTime = new Date(0); // Start with epoch time
    
    processedWebsites.forEach(website => {
      if (website.ticks.length > 0) {
        const lastTickTime = new Date(website.ticks[website.ticks.length - 1].createdAt);
        if (lastTickTime > latestTime) {
          latestTime = lastTickTime;
        }
      }
    });
    
    return latestTime.getTime() === 0 ? null : latestTime;
  };
  
  const lastCheckedTime = getLastCheckedTime();

  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen bg-background transition-colors duration-300">
        <div className="container max-w-5xl mx-auto py-8 px-4 sm:px-6">
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Uptime Monitor
              </h1>
              <p className="text-muted-foreground mt-1">
                Monitor your websites status in real-time
              </p>
            </div>
            <div className="flex items-center gap-3">
              <AddWebsiteDialog onAddWebsite={handleAddWebsite} />
              {/* <ThemeToggle /> */}
            </div>
          </header>

          {processedWebsites.length > 0 && !loading && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-card rounded-lg p-4 border border-border/50 flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Websites</p>
                  <p className="text-2xl font-semibold">{processedWebsites.length}</p>
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border/50 flex items-center gap-3">
                <div className="p-2 rounded-full bg-success/10">
                  <ArrowUpCircle className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Up Websites</p>
                  <p className="text-2xl font-semibold">{totalUp}</p>
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border/50 flex items-center gap-3">
                <div className="p-2 rounded-full bg-danger/10">
                  <ArrowDownCircle className="h-5 w-5 text-danger" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Down Websites</p>
                  <p className="text-2xl font-semibold">{totalDown}</p>
                </div>
              </div>
            </div>
          )}
          
          <main>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-medium">Your Websites</h2>
              {processedWebsites.length > 0 && lastCheckedTime && (
                <span className="text-sm text-muted-foreground hidden sm:inline-block">
                  Last checked: {lastCheckedTime.toLocaleTimeString()}
                </span>
              )}
            </div>
            
            {error && (
              <div className="p-4 mb-4 bg-danger/10 text-danger rounded-lg border border-danger/20">
                Error loading websites: {error}
              </div>
            )}
            
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-24 bg-muted/40 rounded-lg"
                  />
                ))}
              </div>
            ) : processedWebsites.length > 0 ? (
              <div className="space-y-4">
                {processedWebsites.map((website) => (
                  <WebsiteCard key={website.id} website={website} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border rounded-lg bg-card/50">
                <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No websites yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Start monitoring your websites by adding your first website
                </p>
                <AddWebsiteDialog onAddWebsite={handleAddWebsite} />
              </div>
            )}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

// Helper function to aggregate ticks into time windows
function aggregateTicksInWindows(ticks: WebsiteTick[], windowMinutes: number): WebsiteTick[] {
  if (!ticks || ticks.length === 0) return [];
  
  // Sort ticks by createdAt
  const sortedTicks = [...ticks].sort((a, b) => 
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  
  const windowMs = windowMinutes * 60 * 1000;
  const aggregatedTicks: WebsiteTick[] = [];
  
  let currentWindowStart = new Date(sortedTicks[0].createdAt).getTime();
  let currentWindowEnd = currentWindowStart + windowMs;
  let currentWindowTicks: WebsiteTick[] = [];
  
  sortedTicks.forEach(tick => {
    const tickTime = new Date(tick.createdAt).getTime();
    
    if (tickTime <= currentWindowEnd) {
      // Tick belongs to current window
      currentWindowTicks.push(tick);
    } else {
      // Process previous window and move to next
      if (currentWindowTicks.length > 0) {
        aggregatedTicks.push(aggregateWindow(currentWindowTicks));
      }
      
      // Find the appropriate new window
      while (tickTime > currentWindowEnd) {
        currentWindowStart = currentWindowEnd;
        currentWindowEnd = currentWindowStart + windowMs;
      }
      
      currentWindowTicks = [tick];
    }
  });
  
  // Process the last window
  if (currentWindowTicks.length > 0) {
    aggregatedTicks.push(aggregateWindow(currentWindowTicks));
  }
  
  return aggregatedTicks;
}

// Aggregate a window of ticks into a single representative tick
function aggregateWindow(windowTicks: WebsiteTick[]): WebsiteTick {
  // Use the most recent timestamp
  const latestTick = windowTicks.reduce((latest, current) => 
    new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest
  );
  
  // Count statuses
  const statusCount: Record<string, number> = {};
  windowTicks.forEach(tick => {
    statusCount[tick.status] = (statusCount[tick.status] || 0) + 1;
  });
  
  // Determine dominant status
  let dominantStatus = "unknown";
  let maxCount = 0;
  for (const [status, count] of Object.entries(statusCount)) {
    if (count > maxCount) {
      maxCount = count;
      dominantStatus = status;
    }
  }
  
  // Calculate average latency for 'up' ticks
  const upTicks = windowTicks.filter(tick => tick.status === "up");
  const avgLatency = upTicks.length > 0
    ? upTicks.reduce((sum, tick) => sum + tick.latency, 0) / upTicks.length
    : 0;
  
  return {
    id: latestTick.id,
    createdAt: latestTick.createdAt,
    status: dominantStatus,
    latency: Math.round(avgLatency)
  };
}

export default Index;