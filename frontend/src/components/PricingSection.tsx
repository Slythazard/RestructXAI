import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check, ArrowRight, Star } from "lucide-react";
import { motion } from "motion/react";

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started with PDF analysis",
    price: "$0",
    period: "forever",
    badge: null,
    features: [
      "3 PDFs per month",
      "Up to 10MB file size",
      "Basic Q&A functionality",
      "Document summarization",
      "Text extraction",
      "Community support"
    ],
    limitations: [
      "Limited chat history",
      "Standard processing speed"
    ],
    recommended: false,
    cta: "Get Started Free"
  },
  {
    name: "Pro",
    description: "Advanced features for professionals and researchers",
    price: "$19",
    period: "per month",
    badge: "Most Popular",
    features: [
      "Unlimited PDFs",
      "Up to 500MB file size",
      "Advanced AI analysis",
      "Multi-language support",
      "Data extraction & export",
      "Priority processing",
      "Chat history & organization",
      "Email support"
    ],
    limitations: [],
    recommended: true,
    cta: "Start Pro Trial"
  },
  {
    name: "Enterprise",
    description: "Custom solutions for teams and organizations",
    price: "Custom",
    period: "pricing",
    badge: "Enterprise",
    features: [
      "Everything in Pro",
      "Unlimited file size",
      "API access",
      "Custom integrations",
      "White-label solutions",
      "Advanced security & compliance",
      "Dedicated account manager",
      "24/7 priority support"
    ],
    limitations: [],
    recommended: false,
    cta: "Contact Sales"
  }
];

export function PricingSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold relative inline-block">
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent relative">
              Simple, Transparent
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-blue-500/20 blur-lg rounded-lg"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>{" "}
            <span className="text-foreground relative">
              Pricing
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.2, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that fits your needs. Start free and upgrade as you grow.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card 
                className={`relative ${
                  plan.recommended 
                    ? 'border-2 border-primary shadow-lg scale-105 bg-gradient-to-br from-primary/5 to-primary/10' 
                    : 'border hover:border-primary/20'
                } transition-all duration-300 overflow-hidden group`}
              >
                {plan.recommended && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  />
                )}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-6">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                  <div className="pt-4">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, limitIndex) => (
                    <div key={limitIndex} className="flex items-start space-x-3 opacity-60">
                      <div className="w-5 h-5 mt-0.5 flex-shrink-0 flex items-center justify-center">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">{limitation}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <Button 
                    className="w-full" 
                    variant={plan.recommended ? "default" : "outline"}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16 space-y-4">
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <span>Cancel anytime</span>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <span>No setup fees</span>
          </div>
        </div>
      </div>
    </section>
  );
}