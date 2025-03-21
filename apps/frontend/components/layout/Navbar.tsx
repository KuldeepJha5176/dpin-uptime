import React from 'react';
import { Button } from '@/components/ui/button';
import { Activity } from 'lucide-react';
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 glass-morphism border-b border-white/5">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">UpMonitor</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-white transition-colors">Features</a>
          <a href="#stats" className="text-sm text-muted-foreground hover:text-white transition-colors">Dashboard</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Pricing</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Documentation</a>
        </nav>
        
        <div className="flex items-center gap-4">
        {/* <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Log in</Button>
        <Button size="sm">Try for free</Button> */}
           <SignedOut>
                <SignInButton />
                <SignUpButton />
            </SignedOut>
            <SignedIn>
                   <UserButton />
            </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
