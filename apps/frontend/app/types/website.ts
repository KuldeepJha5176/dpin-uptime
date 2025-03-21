export interface UptimeRecord {
    timestamp: string;
    status: 'up' | 'down';
  }
  
  export interface Website {
    id: string;
    name: string;
    url: string;
    status: 'up' | 'down';
    uptime: UptimeRecord[];
    lastChecked: string;
    responseTime: number; // in milliseconds
  }