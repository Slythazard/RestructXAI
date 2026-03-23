import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  ArrowRight,
  Upload,
  Database,
  MessageCircle,
  BarChart3,
  Brain,
} from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export function HeroSection({
  onNavigateToChat,
}: {
  onNavigateToChat: () => void;
}) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop logic here
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-blue-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, -120, 0],
            y: [0, 80, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Badge
                  variant="secondary"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  <Brain size={16} className="text-cyan-500" />
                  <span>AI-Powered PDF Intelligence</span>
                </Badge>
              </motion.div>
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <span className="text-foreground">
                  Harvest Insights from Your
                </span>{" "}
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent relative inline-block">
                  Intelligent Data
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-lg rounded-lg"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </span>
              </motion.h1>
              <motion.p
                className="text-xl lg:text-2xl text-muted-foreground max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Upload PDF documents and instantly chat with them. Extract
                insights, get summaries, and find answers from your documents
                using advanced AI.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              {/* <motion.div */}
              {/*   whileHover={{ scale: 1.05, y: -2 }} */}
              {/*   whileTap={{ scale: 0.95 }} */}
              {/* > */}
              {/*   <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 relative overflow-hidden group"> */}
              {/*     <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" /> */}
              {/*     <Upload className="mr-2" size={20} /> */}
              {/*     Upload PDF */}
              {/*     <ArrowRight className="ml-2" size={20} /> */}
              {/*   </Button> */}
              {/* </motion.div> */}
              {/* <motion.div */}
              {/*   whileHover={{ scale: 1.05, y: -2 }} */}
              {/*   whileTap={{ scale: 0.95 }} */}
              {/* > */}
              {/*   <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/5 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"> */}
              {/*     Try Demo */}
              {/*   </Button> */}
              {/* </motion.div> */}
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 pt-8 border-t border-cyan-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.div className="group" whileHover={{ scale: 1.05 }}>
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  5M+
                </div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  PDFs Processed
                </div>
              </motion.div>
              <motion.div className="group" whileHover={{ scale: 1.05 }}>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  100MB
                </div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  Max File Size
                </div>
              </motion.div>
              <motion.div className="group" whileHover={{ scale: 1.05 }}>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent">
                  99.9%
                </div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  Accuracy
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Data Upload Area */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 rounded-2xl blur-xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <Card
              className={`relative border-2 border-dashed transition-all duration-500 ${
                dragActive
                  ? "border-cyan-400 bg-cyan-400/5 shadow-2xl shadow-cyan-400/25"
                  : "border-cyan-500/30 hover:border-cyan-400/50 hover:bg-cyan-400/5"
              }`}
            >
              <CardContent
                className="p-12 text-center space-y-6"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-cyan-400/20 via-blue-500/20 to-purple-600/20 rounded-3xl flex items-center justify-center mx-auto relative"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-3xl blur-sm opacity-50 animate-pulse" />
                  <Database className="relative w-10 h-10 text-cyan-400" />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">
                    Drop your PDF files here
                  </h3>
                  <p className="text-muted-foreground">
                    Or click to browse and upload • PDF documents supported
                  </p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={onNavigateToChat}
                    variant="outline"
                    className="w-full border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/5 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  >
                    Choose Files
                  </Button>
                </motion.div>
                <div className="text-xs text-muted-foreground">
                  Supports PDF files up to 100MB • Secure processing
                </div>
              </CardContent>
            </Card>

            {/* Demo Chat Preview */}
            <motion.div
              className="mt-6 space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <motion.div
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 bg-muted/80 backdrop-blur-sm p-3 rounded-lg rounded-tl-none border border-muted-foreground/10">
                  <p className="text-sm">
                    What are the key findings in this research paper?
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-start space-x-3 justify-end"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <div className="flex-1 bg-gradient-to-r from-cyan-500/90 to-blue-600/90 backdrop-blur-sm text-white p-3 rounded-lg rounded-tr-none max-w-xs shadow-lg shadow-blue-500/25">
                  <p className="text-sm">
                    The paper presents three key findings: AI models achieve 95%
                    accuracy on benchmark tests, novel architecture reduces
                    training time by 40%, and the approach shows strong
                    generalization across domains...
                  </p>
                </div>
                <motion.div
                  className="w-8 h-8 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg relative"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                      "0 0 30px rgba(59, 130, 246, 0.5)",
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <BarChart3 className="w-4 h-4 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

