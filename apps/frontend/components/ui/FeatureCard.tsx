import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon }) => {
  return (
    <div className="glass-morphism p-6 rounded-xl transition-all duration-300 hover:bg-white/10 hover:shadow-lg group">
      <div className="flex gap-4 items-start">
        <div className="p-3 rounded-lg bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-xl">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
