import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ArrowRight, Upload, BookOpen, MessageSquare, Zap } from "lucide-react";
import { motion } from "motion/react";

export function CTASection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Main CTA */}
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500 bg-clip-text text-transparent relative">
                Start Chatting
                <motion.div
                  className="absolute -inset-3 bg-gradient-to-r from-pink-400/20 via-red-500/20 to-yellow-500/20 blur-xl rounded-lg"
                  animate={{ 
                    opacity: [0.3, 0.7, 0.3],
                    scale: [1, 1.1, 1],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>{" "}
              <span className="text-foreground">with Your PDFs</span>{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent relative">
                Today
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </span>
            </motion.h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of professionals, students, and researchers who are already using 
              DATAHarvest to unlock insights from their documents in seconds.
            </p>
          </div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="text-lg px-8 py-6 relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <Upload className="mr-2" size={20} />
                <span className="relative z-10">Upload Your First PDF</span>
                <ArrowRight className="ml-2" size={20} />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 relative overflow-hidden group">
                <span className="relative z-10">Try Demo</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </Button>
            </motion.div>
          </motion.div>

          <p className="text-sm text-muted-foreground">
            No credit card required • 3 free PDFs • Start in under 30 seconds
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: BookOpen, title: "User Guide", description: "Learn how to get the most from your PDFs", color: "red", index: 0 },
            { icon: MessageSquare, title: "Support", description: "Get help when you need it", color: "orange", index: 1 },
            { icon: Zap, title: "API Access", description: "Integrate PDF intelligence into your apps", color: "yellow", index: 2 }
          ].map((item) => (
            <motion.div
              key={item.index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: item.index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br from-${item.color}-400/10 to-${item.color}-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <motion.div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${item.color}-400 to-${item.color}-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`}
                />
                <CardContent className="p-6 text-center space-y-4 relative z-10">
                  <motion.div 
                    className={`w-12 h-12 rounded-lg bg-${item.color}-100 flex items-center justify-center mx-auto group-hover:bg-${item.color}-200 transition-colors relative`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r from-${item.color}-400/20 to-${item.color}-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-card-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}