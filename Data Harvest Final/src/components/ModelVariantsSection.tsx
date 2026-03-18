import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check, ArrowRight } from "lucide-react";

const variants = [
  {
    name: "Gemini Ultra",
    description: "Our most capable model for highly complex tasks",
    badge: "Most Capable",
    features: [
      "Advanced reasoning and problem-solving",
      "Multimodal understanding",
      "32K token context window",
      "Best-in-class performance",
      "Creative and analytical tasks"
    ],
    price: "Usage-based pricing",
    recommended: true
  },
  {
    name: "Gemini Pro",
    description: "Best performance and versatility across a wide range of tasks",
    badge: "Most Popular",
    features: [
      "Excellent reasoning capabilities",
      "Multimodal support",
      "32K token context window",
      "Fast inference",
      "Production-ready"
    ],
    price: "Free tier available",
    recommended: false
  },
  {
    name: "Gemini Nano",
    description: "Our most efficient model for on-device tasks",
    badge: "Most Efficient",
    features: [
      "Optimized for mobile devices",
      "Offline capabilities",
      "Low latency responses",
      "Privacy-focused",
      "Edge deployment"
    ],
    price: "Contact sales",
    recommended: false
  }
];

export function ModelVariantsSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Choose Your Gemini
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Different sizes of Gemini for different needs, from mobile devices to large-scale applications.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {variants.map((variant, index) => (
            <Card 
              key={index} 
              className={`relative ${
                variant.recommended 
                  ? 'border-2 border-primary shadow-lg scale-105' 
                  : 'border hover:border-primary/20'
              } transition-all duration-300`}
            >
              {variant.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Recommended
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-6">
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-fit">
                    {variant.badge}
                  </Badge>
                  <CardTitle className="text-2xl">{variant.name}</CardTitle>
                  <CardDescription className="text-base">
                    {variant.description}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {variant.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t">
                  <div className="text-sm text-muted-foreground mb-4">
                    {variant.price}
                  </div>
                  <Button 
                    className="w-full" 
                    variant={variant.recommended ? "default" : "outline"}
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}