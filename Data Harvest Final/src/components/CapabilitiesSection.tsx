import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  MessageSquare, 
  FileText, 
  Search, 
  Download, 
  Languages,
  Zap,
  Shield,
  GraduationCap,
  FileSearch,
  FileSpreadsheet,
  FileCheck
} from "lucide-react";
import { motion } from "motion/react";

const capabilities = [
  {
    icon: MessageSquare,
    title: "Smart Q&A",
    description: "Ask natural language questions and get precise answers from your PDF content",
    badge: "Smart",
    gradient: "from-cyan-400 to-blue-500"
  },
  {
    icon: FileText,
    title: "Document Summarization",
    description: "Generate comprehensive summaries of long documents in seconds",
    badge: "Essential",
    gradient: "from-blue-400 to-purple-500"
  },
  {
    icon: Search,
    title: "Intelligent Search",
    description: "Find specific information across entire documents using semantic search",
    badge: "Search",
    gradient: "from-purple-400 to-pink-500"
  },
  {
    icon: FileSpreadsheet,
    title: "Data Extraction",
    description: "Extract tables, charts, and structured data from PDF documents automatically",
    badge: "Analysis",
    gradient: "from-pink-400 to-red-500"
  },
  {
    icon: Download,
    title: "Export Insights",
    description: "Export conversations, summaries, and extracted data in multiple formats",
    badge: "Export",
    gradient: "from-red-400 to-orange-500"
  },
  {
    icon: Languages,
    title: "Multi-Language",
    description: "Process PDFs in 50+ languages with accurate translations",
    badge: "Global",
    gradient: "from-orange-400 to-yellow-500"
  },
  {
    icon: Zap,
    title: "Instant Processing",
    description: "Upload and start chatting with PDFs in under 10 seconds",
    badge: "Performance",
    gradient: "from-yellow-400 to-green-500"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Enterprise-grade security with end-to-end encryption for your documents",
    badge: "Security",
    gradient: "from-green-400 to-teal-500"
  },
  {
    icon: GraduationCap,
    title: "Academic Research",
    description: "Specialized tools for research papers, citations, and academic analysis",
    badge: "Academic",
    gradient: "from-teal-400 to-cyan-500"
  }
];

export function CapabilitiesSection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 right-1/4 w-72 h-72 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, -60, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            <span className="text-foreground">Intelligent PDF</span>{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent relative inline-block">
              Capabilities
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-cyan-400/15 via-blue-500/15 to-purple-600/15 blur-lg rounded-lg"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform PDF documents into interactive conversations. Extract insights, get summaries, 
            and unlock the full potential of your documents with cutting-edge AI technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="group h-full hover:shadow-2xl transition-all duration-500 border-2 hover:border-cyan-500/30 bg-card/50 backdrop-blur-sm relative overflow-hidden">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 from-cyan-400 via-blue-500 to-purple-600" />
                  
                  <CardHeader className="pb-4 relative z-10">
                    <div className="flex items-start justify-between">
                      <motion.div 
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${capability.gradient}/10 flex items-center justify-center group-hover:${capability.gradient}/20 transition-all duration-500 relative`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {/* Icon glow */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${capability.gradient} rounded-xl blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                        <Icon className={`relative w-7 h-7 bg-gradient-to-br ${capability.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`} />
                      </motion.div>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs bg-gradient-to-r ${capability.gradient}/10 border-${capability.gradient.split(' ')[1]}/20 hover:shadow-lg transition-all duration-300`}
                      >
                        {capability.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-foreground transition-colors duration-300">
                      {capability.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-base group-hover:text-muted-foreground/80 transition-colors duration-300">
                      {capability.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}