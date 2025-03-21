"use client";
import React from 'react';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Appbar from '@/components/Appbar';
import Features from '@/components/sections/Features';
import Stats from '@/components/sections/Stats';
import Pricing from '@/components/sections/Pricing';
import Footer from '@/components/layout/Footer';
import App from 'next/app';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <AnimatedBackground />
      {/* <Navbar /> */}
      
      
      <main className="flex-grow">
        <Hero />
        <Features />
        <Stats />
        <Pricing />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
