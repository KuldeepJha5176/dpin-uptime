import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { SignInButton } from '@clerk/nextjs';

const Hero = () => {
  return (
    <section className="pt-32 pb-24 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <div className="inline-block glass-morphism px-4 py-2 rounded-full text-sm text-primary">
              99.99% Uptime Monitoring
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gradient">
              Know when your services are <span className="text-primary animate-pulse-slow">down</span> before your customers do
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-time monitoring and alerting for your websites, APIs, and services. 
              Get notified instantly when something goes wrong.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <SignInButton mode="modal">
            <Button size="lg" className="group">
              Start monitoring for free
              <ArrowRight className="ml-2 group-hover:animate-move-right" />
            </Button>
            </SignInButton>
            <Button variant="outline" size="lg">
              View demo
              </Button>
          </div>
          
          <div className="pt-8">
            <p className="text-sm text-muted-foreground mb-4">Trusted by industry leaders</p>
            <div className="flex flex-wrap justify-center gap-8">
              {['Company 1', 'Company 2', 'Company 3', 'Company 4'].map((company, i) => (
                <div key={i} className="text-white/40 font-semibold">{company}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/20 rounded-full filter blur-[80px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#8B5CF6]/20 rounded-full filter blur-[100px] animate-pulse-slow animation-delay-1000"></div>
      </div>
    </section>
  );
};

export default Hero;
