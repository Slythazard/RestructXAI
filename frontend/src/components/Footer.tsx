import { Separator } from "./ui/separator";
import { Database } from "lucide-react";
import { motion } from "motion/react";

const footerLinks = {
  product: {
    title: "Product",
    links: [
      { name: "Data Analysis", href: "#" },
      { name: "AI Insights", href: "#" },
      { name: "Smart Visualization", href: "#" },
      { name: "API Access", href: "#" },
      { name: "Enterprise", href: "#" }
    ]
  },
  developers: {
    title: "Developers",
    links: [
      { name: "API Documentation", href: "#" },
      { name: "Python SDK", href: "#" },
      { name: "REST API", href: "#" },
      { name: "Code Examples", href: "#" },
      { name: "Rate Limits", href: "#" }
    ]
  },
  company: {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Security", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Blog", href: "#" }
    ]
  },
  support: {
    title: "Support",
    links: [
      { name: "Help Center", href: "#" },
      { name: "Contact Support", href: "#" },
      { name: "System Status", href: "#" },
      { name: "Feature Requests", href: "#" },
      { name: "Community", href: "#" }
    ]
  }
};

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Brand */}
          <motion.div 
            className="lg:col-span-1 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl blur-sm opacity-50" />
                <Database className="relative w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                DATAHarvest
              </span>
            </motion.div>
            <p className="text-sm text-muted-foreground">
              Transforming raw data into actionable insights through intelligent AI-powered analysis and visualization.
            </p>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([key, section], sectionIndex) => (
            <motion.div 
              key={key} 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-foreground">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <motion.a 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-cyan-400 transition-all duration-300 relative group"
                      whileHover={{ x: 2 }}
                    >
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <Separator className="my-8 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

        {/* Bottom */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <motion.a 
              href="#" 
              className="hover:text-cyan-400 transition-colors relative group"
              whileHover={{ y: -1 }}
            >
              Privacy Policy
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-cyan-400 transition-colors relative group"
              whileHover={{ y: -1 }}
            >
              Terms of Service
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-cyan-400 transition-colors relative group"
              whileHover={{ y: -1 }}
            >
              Cookie Policy
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-cyan-400 transition-colors relative group"
              whileHover={{ y: -1 }}
            >
              Accessibility
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </motion.a>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2024 <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-semibold">DATAHarvest</span>. All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  );
}