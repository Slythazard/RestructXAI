import { Button } from "./ui/button";
import { Menu, X, Database } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl blur-sm opacity-75 animate-pulse"></div>
            <Database className="relative w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            DATAHarvest
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <motion.a 
            href="#" 
            className="text-muted-foreground hover:text-foreground transition-all duration-300 relative group"
            whileHover={{ y: -2 }}
          >
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
          </motion.a>
          <motion.a 
            href="#" 
            className="text-muted-foreground hover:text-foreground transition-all duration-300 relative group"
            whileHover={{ y: -2 }}
          >
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
          </motion.a>
          <motion.a 
            href="#" 
            className="text-foreground font-medium relative group"
            whileHover={{ y: -2 }}
          >
            PDF Analysis
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></span>
          </motion.a>
          <motion.a 
            href="#" 
            className="text-muted-foreground hover:text-foreground transition-all duration-300 relative group"
            whileHover={{ y: -2 }}
          >
            API
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
          </motion.a>
          <motion.a 
            href="#" 
            className="text-muted-foreground hover:text-foreground transition-all duration-300 relative group"
            whileHover={{ y: -2 }}
          >
            Help
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
          </motion.a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" className="hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
              Sign In
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
              Upload PDF
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden border-t bg-background"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <motion.a 
              href="#" 
              className="block text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ x: 4 }}
            >
              Features
            </motion.a>
            <motion.a 
              href="#" 
              className="block text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ x: 4 }}
            >
              Pricing
            </motion.a>
            <motion.a 
              href="#" 
              className="block text-foreground font-medium"
              whileHover={{ x: 4 }}
            >
              PDF Analysis
            </motion.a>
            <motion.a 
              href="#" 
              className="block text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ x: 4 }}
            >
              API
            </motion.a>
            <motion.a 
              href="#" 
              className="block text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ x: 4 }}
            >
              Help
            </motion.a>
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full">Sign In</Button>
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600">Upload PDF</Button>
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}