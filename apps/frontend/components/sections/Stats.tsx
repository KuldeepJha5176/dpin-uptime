"use client";
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Stats = () => {
  const Router = useRouter();
  const performanceData = [
    { name: 'Mon', value: 99.97 },
    { name: 'Tue', value: 100 },
    { name: 'Wed', value: 99.99 },
    { name: 'Thu', value: 100 },
    { name: 'Fri', value: 99.98 },
    { name: 'Sat', value: 100 },
    { name: 'Sun', value: 100 },
  ];
  
  const stats = [
    { label: 'Uptime', value: '99.99%' },
    { label: 'Alerts', value: '24/7' },
    { label: 'Response Time', value: '<300ms' },
    { label: 'Services Monitored', value: '1,000+' },
  ];

  return (
    <section id="stats" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="glass-morphism rounded-2xl p-8 md:p-12 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-gradient">Monitor with confidence</h2>
                <p className="text-muted-foreground">
                  Our platform provides real-time insights into your service performance.
                  Know exactly when and why your services are down.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <Button onClick={() => Router.push("/dashboard")} variant="default" size="lg">
                View full dashboard
                <ArrowRight className="ml-2 group-hover:animate-move-right" />
              </Button>
             
            </div>
            
            <div className="h-80 w-full">
              <ChartContainer 
                config={{
                  area: {
                    theme: {
                      light: '#4A90E2',
                      dark: '#4A90E2',
                    },
                  },
                  grid: {
                    theme: {
                      light: 'rgba(255, 255, 255, 0.1)',
                      dark: 'rgba(255, 255, 255, 0.1)',
                    },
                  },
                }} 
                className="h-full w-full"
              >
                <AreaChart 
                  data={performanceData} 
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4A90E2" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255, 255, 255, 0.1)" strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: 'rgba(255, 255, 255, 0.7)' }} 
                    axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }} 
                  />
                  <YAxis 
                    domain={[99.5, 100.5]} 
                    tick={{ fill: 'rgba(255, 255, 255, 0.7)' }} 
                    axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }} 
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4A90E2" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;