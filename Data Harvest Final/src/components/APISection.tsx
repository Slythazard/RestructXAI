import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Code, ArrowRight, Copy, CheckCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

const codeExamples = {
  upload: `// Upload and process a PDF
const response = await fetch('/api/pdf/upload', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'multipart/form-data'
  },
  body: formData
});

const { documentId } = await response.json();`,
  
  chat: `// Ask questions about the PDF
const response = await fetch('/api/pdf/chat', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    documentId: 'doc_123',
    question: 'What are the main conclusions?',
    context: true
  })
});

const { answer, sources } = await response.json();`,

  extract: `// Extract structured data
const response = await fetch('/api/pdf/extract', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    documentId: 'doc_123',
    extractType: 'tables',
    format: 'json'
  })
});

const { data, metadata } = await response.json();`
};

const features = [
  {
    title: "RESTful API",
    description: "Simple HTTP endpoints for all PDF operations",
    icon: "🌐"
  },
  {
    title: "SDKs Available",
    description: "Python, Node.js, and more coming soon",
    icon: "📦"
  },
  {
    title: "Webhook Support",
    description: "Real-time notifications for long-running tasks",
    icon: "🔔"
  },
  {
    title: "Rate Limiting",
    description: "Fair usage policies with burst support",
    icon: "⚡"
  },
  {
    title: "Enterprise Security",
    description: "SOC 2 compliant with enterprise SSO",
    icon: "🔒"
  },
  {
    title: "Comprehensive Docs",
    description: "Interactive API documentation and examples",
    icon: "📚"
  }
];

export function APISection() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="inline-flex items-center space-x-2 relative overflow-hidden">
              <Code size={16} />
              <span>Developer API</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
              />
            </Badge>
          </motion.div>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent relative">
              Powerful API
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-blue-400/15 via-indigo-500/15 to-purple-600/15 blur-xl rounded-lg"
                animate={{ 
                  opacity: [0.2, 0.6, 0.2],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>{" "}
            <span className="text-foreground relative">
              for Developers
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </span>
          </motion.h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Integrate PDF intelligence into your applications with our simple, 
            powerful API. Process documents at scale with enterprise-grade reliability.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Code Examples */}
            <div className="space-y-6">
              <motion.h3 
                className="text-2xl font-bold relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  Quick Start Examples
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </motion.h3>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 relative overflow-hidden">
                    <TabsTrigger value="upload" className="relative z-10">Upload</TabsTrigger>
                    <TabsTrigger value="chat" className="relative z-10">Chat</TabsTrigger>
                    <TabsTrigger value="extract" className="relative z-10">Extract</TabsTrigger>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-blue-500/10 to-purple-500/10"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                  </TabsList>
                
                  {Object.entries(codeExamples).map(([key, code]) => (
                    <TabsContent key={key} value={key}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="relative overflow-hidden">
                          <motion.div
                            className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                          />
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg capitalize">{key} PDF</CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyCode(code, key)}
                            className="h-8 w-8 p-0"
                          >
                            {copiedCode === key ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{code}</code>
                        </pre>
                      </CardContent>
                        </Card>
                      </motion.div>
                    </TabsContent>
                  ))}
                </Tabs>
              </motion.div>

              <div className="flex gap-4">
                <Button>
                  Get API Key
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button variant="outline">
                  View Full Docs
                </Button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="space-y-6">
              <motion.h3 
                className="text-2xl font-bold relative"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  API Features
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </motion.h3>
              
              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <Card className="p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                      <motion.div
                        className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-500 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500"
                      />
                      <div className="flex items-start space-x-4 relative z-10">
                        <motion.div 
                          className="text-2xl"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ duration: 0.3 }}
                        >
                          {feature.icon}
                        </motion.div>
                        <div className="space-y-1">
                          <h4 className="font-semibold text-card-foreground">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Pricing info */}
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-card-foreground">API Pricing</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">First 1,000 requests</span>
                        <span className="text-sm font-medium">Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Additional requests</span>
                        <span className="text-sm font-medium">$0.01 each</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Enterprise volume</span>
                        <span className="text-sm font-medium">Custom pricing</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}