import React from 'react';
import FeatureCard from '@/components/ui/FeatureCard';
import { Activity, Bell, Clock, Server, Zap, Shield } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: 'Real-time Monitoring',
      description: 'Monitor your websites, APIs, and services in real-time with second-level precision.',
      icon: Activity
    },
    {
      title: 'Instant Alerts',
      description: 'Get instant notifications via Slack, SMS, email, or any other channel when something goes wrong.',
      icon: Bell
    },
    {
      title: 'Global Check Points',
      description: 'Monitor from multiple locations around the world to ensure global availability.',
      icon: Server
    },
    {
      title: 'Downtime Detection',
      description: 'Detect downtime within seconds, not minutes, allowing for immediate response.',
      icon: Clock
    },
    {
      title: 'Performance Insights',
      description: 'Track response times and get insights into your application performance.',
      icon: Zap
    },
    {
      title: 'Status Pages',
      description: 'Create beautiful status pages to keep your customers informed about your service status.',
      icon: Shield
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-gradient">Complete monitoring solution for your services</h2>
          <p className="text-muted-foreground">Everything you need to keep your services up and running, all in one platform.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <FeatureCard 
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;