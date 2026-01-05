import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Code, Heart, Zap, Terminal } from 'lucide-react';

export default function Intail() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-background text-foreground overflow-hidden relative">

      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-purple-500/20 blur-[100px]" />
      </div>

      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8 relative z-10">

        {/* Hero Title */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Match. Chat. <span className="text-primary">Code.</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            The ultimate platform for developers to find their perfect coding partner.
            Connect based on tech stack, experience, and compatibility.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 min-w-[200px]">
          <Button asChild size="lg" className="h-12 px-8 text-base">
            <Link to="/signup">Create Account</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
            <Link to="/login">Login</Link>
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/50 w-full max-w-5xl">
          <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Terminal size={24} />
            </div>
            <h3 className="font-bold">Tech Stack Match</h3>
            <p className="text-sm text-muted-foreground">Find devs who speak your language.</p>
          </div>
          <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Zap size={24} />
            </div>
            <h3 className="font-bold">Instant Connections</h3>
            <p className="text-sm text-muted-foreground">Swipe right to connect immediately.</p>
          </div>
          <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Heart size={24} />
            </div>
            <h3 className="font-bold">Community Driven</h3>
            <p className="text-sm text-muted-foreground">Build relationships that last.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
