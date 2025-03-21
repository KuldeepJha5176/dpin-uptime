
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for small websites and personal projects",
    features: [
      "5 monitors",
      "5-minute check interval",
      "Email notifications",
      "24 hours data retention",
      "Basic uptime reports"
    ],
    buttonText: "Get Started"
  },
  {
    name: "Professional",
    price: "$79",
    description: "Ideal for growing businesses and professional sites",
    features: [
      "25 monitors",
      "1-minute check interval",
      "Email & SMS notifications",
      "30 days data retention",
      "Advanced uptime reports",
      "API access",
      "Custom status pages"
    ],
    highlighted: true,
    buttonText: "Try Pro"
  },
  {
    name: "Enterprise",
    price: "$199",
    description: "For large organizations with critical infrastructure",
    features: [
      "Unlimited monitors",
      "30-second check interval",
      "Email, SMS & Webhook notifications",
      "1 year data retention",
      "Real-time alerts",
      "Priority support",
      "Custom integrations",
      "Dedicated account manager"
    ],
    buttonText: "Contact Sales"
  }
];

const Pricing = () => {
  const handlePlanSelection = (plan: string) => {
    toast({
      title: `${plan} plan selected`,
      description: "We'll redirect you to the checkout page.",
    });
  };

  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">✨ Simple & Transparent Pricing ✨</h2>
          <p className="text-muted-foreground text-lg">
            Choose the perfect plan for your monitoring requirements.
            All plans include a 14-day free trial with no credit card required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`relative h-full ${tier.highlighted ? 'border-primary shadow-lg' : ''}`}
            >
                {tier.highlighted && (
                <Badge className="absolute -top-3 left-0 right-0 mx-auto w-fit" variant="default">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
                <CardDescription className="mt-2">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  variant={tier.highlighted ? 'default' : 'outline'}
                  onClick={() => handlePlanSelection(tier.name)}
                >
                  {tier.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Looking for something more tailored to your needs?
          </p>
          <Button 
            variant="outline"
            onClick={() => toast({
              title: "Contact request sent",
              description: "Our sales team will get back to you shortly.",
            })}
          >
            Contact our sales team for a custom quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
