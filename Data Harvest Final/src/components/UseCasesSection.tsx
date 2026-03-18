import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";

const useCases = [
  {
    title: "Academic Research",
    description: "Students and researchers analyze scientific papers, extract key insights, and accelerate their research process.",
    image: "https://images.unsplash.com/photo-1620233383573-b51d099bb075?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRvY3VtZW50JTIwYW5hbHlzaXMlMjBsYXB0b3B8ZW58MXx8fHwxNzU3NjAwMTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Research", "Academic", "Analysis"]
  },
  {
    title: "Business Document Analysis",
    description: "Professionals quickly process contracts, reports, and legal documents to extract critical information.",
    image: "https://images.unsplash.com/photo-1693045181676-57199422ee66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZGYlMjBkb2N1bWVudHMlMjBvZmZpY2UlMjBwYXBlcndvcmt8ZW58MXx8fHwxNzU3NjAwMTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Business", "Legal", "Analysis"]
  }
];

const industries = [
  { name: "Legal", description: "Contract analysis and document review" },
  { name: "Education", description: "Research assistance and study materials" },
  { name: "Healthcare", description: "Medical literature and case studies" },
  { name: "Finance", description: "Financial reports and compliance documents" },
  { name: "Consulting", description: "Client reports and market research" },
  { name: "Publishing", description: "Manuscript review and content analysis" }
];

export function UseCasesSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent relative">
              Real-World
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-purple-400/20 via-pink-500/20 to-red-500/20 blur-lg rounded-lg"
                animate={{ 
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>{" "}
            <span className="text-foreground relative">
              Applications
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
            </span>
          </motion.h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how professionals across industries are using DATAHarvest to streamline document analysis and boost productivity.
          </p>
        </div>

        {/* Featured Use Cases */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, rotateY: 2 }}
            >
              <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                />
              <div className="aspect-video relative overflow-hidden">
                <ImageWithFallback
                  src={useCase.image}
                  alt={useCase.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {useCase.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="bg-white/20 text-white border-white/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{useCase.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {useCase.description}
                </CardDescription>
              </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Industries Grid */}
        <div className="space-y-8">
          <motion.h3 
            className="text-2xl md:text-3xl font-bold text-center relative inline-block w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-orange-400 via-yellow-500 to-amber-400 bg-clip-text text-transparent relative">
              Trusted Across
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </span>{" "}
            <span className="text-foreground">Industries</span>
          </motion.h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 1 }}
              >
                <Card className="p-6 hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 to-amber-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400"
                  />
                <div className="space-y-2">
                  <h4 className="font-semibold text-card-foreground">{industry.name}</h4>
                  <p className="text-sm text-muted-foreground">{industry.description}</p>
                </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}