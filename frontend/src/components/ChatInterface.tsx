import { io } from "socket.io-client";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import {
  Send,
  Paperclip,
  Plus,
  BarChart3,
  MessageSquare,
  User,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ForceGraph2D from "react-force-graph-2d";

interface GraphNode {
  id: string;
  label: string;
  val?: number;
}

interface GraphEdge {
  source: string;
  target: string;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphEdge[];
}

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  hasVisualization?: boolean;
  data?: Array<{ name: string; value: number }>;
  hasKnowledgeGraph?: boolean;
  graphData?: GraphData;
}

interface ChatInterfaceProps {
  onBack: () => void;
}

export function ChatInterface({ onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const socketRef = useRef<any>(null);
  const activeTaskMessageId = useRef<string | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);
  const connectSocket = (roomId: string) => {
    // 🔥 Close previous socket if exists
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    const socket = io("http://localhost:8000", {
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      console.log("Joining room:", roomId);
      socket.emit("join_room", { task_id: roomId });
    });

    // socket.emit("join_room", { taskId: roomId });

    socket.on("task_update", (data: any) => {
      console.log("Task Update:", data);

      setMessages((prev: Message[]) => {
        // If no active message → create one
        if (!activeTaskMessageId.current) {
          const newId = Date.now().toString();
          activeTaskMessageId.current = newId;

          return [
            ...prev,
            {
              id: newId,
              role: "ai",
              content: data.message || "Processing...",
              hasVisualization: !!data.chart_data,
              data: data.chart_data,
            },
          ];
        }

        // Otherwise update existing message
        return prev.map((msg) =>
          msg.id === activeTaskMessageId.current
            ? {
                ...msg,
                content: data.message || msg.content,
                hasVisualization: !!data.chart_data,
                data: data.chart_data || msg.data,
              }
            : msg,
        );
      });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  };

  const detectDataInMessage = (content: string): boolean => {
    const dataKeywords = [
      "visualize",
      "chart",
      "graph",
      "plot",
      "data",
      "numbers",
      "show me",
    ];
    const hasNumbers = /\d+/.test(content);
    const hasKeywords = dataKeywords.some((keyword) =>
      content.toLowerCase().includes(keyword),
    );
    return hasNumbers || hasKeywords;
  };

  const detectKnowledgeGraphRequest = (content: string): boolean => {
    const knowledgeGraphKeywords = [
      "knowledge graph",
      "show graph",
      "graph of",
      "relationship",
      "connections between",
      "network of",
      "mind map",
      "concept map",
      "show connections",
      "show relationships",
    ];
    return knowledgeGraphKeywords.some((keyword) =>
      content.toLowerCase().includes(keyword),
    );
  };

  // const connectWebSocket = (roomId: string) => {

  // const socket = new WebSocket(`ws://localhost:8000/ws/${roomId}`);

  // socketRef.current = socket;

  // socket.onopen = () => {
  //   console.log("WebSocket connected");
  // };

  //   socket.onmessage = (event) => {
  //     const data = JSON.parse(event.data);

  //     console.log("Socket message:", data);

  //     const aiMessage: Message = {
  //       id: Date.now().toString(),
  //       role: "ai",
  //       content: data.message || "Processing update received",
  //       hasVisualization: data.chart_data ? true : false,
  //       data: data.chart_data,
  //     };

  //     setMessages(prev => [...prev, aiMessage]);
  //   };

  //   socket.onerror = (error) => {
  //     console.error("WebSocket error:", error);
  //   };

  //   socket.onclose = () => {
  //     console.log("WebSocket disconnected");
  //   };
  // };

  const fetchKnowledgeGraphData = async (query: string): Promise<GraphData> => {
    // Mock API call - simulating microservice response
    // In production, replace this with actual API call:
    // const response = await fetch('YOUR_API_ENDPOINT', {
    //   method: 'POST',
    //   body: JSON.stringify({ query })
    // });
    // return await response.json();

    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate dynamic mock data based on query
        const isAITopic =
          query.toLowerCase().includes("ai") ||
          query.toLowerCase().includes("artificial intelligence") ||
          query.toLowerCase().includes("machine learning");

        if (isAITopic) {
          resolve({
            nodes: [
              { id: "AI", label: "Artificial Intelligence", val: 25 },
              { id: "ML", label: "Machine Learning", val: 20 },
              { id: "DL", label: "Deep Learning", val: 18 },
              { id: "NLP", label: "Natural Language Processing", val: 15 },
              { id: "CV", label: "Computer Vision", val: 15 },
              { id: "RL", label: "Reinforcement Learning", val: 12 },
              { id: "NN", label: "Neural Networks", val: 18 },
              { id: "CNN", label: "Convolutional NN", val: 12 },
              { id: "RNN", label: "Recurrent NN", val: 12 },
              { id: "Transformer", label: "Transformers", val: 16 },
              { id: "GPT", label: "GPT Models", val: 14 },
              { id: "Data", label: "Data Science", val: 15 },
            ],
            links: [
              { source: "AI", target: "ML" },
              { source: "ML", target: "DL" },
              { source: "ML", target: "RL" },
              { source: "DL", target: "NN" },
              { source: "NN", target: "CNN" },
              { source: "NN", target: "RNN" },
              { source: "DL", target: "Transformer" },
              { source: "Transformer", target: "GPT" },
              { source: "ML", target: "NLP" },
              { source: "NLP", target: "Transformer" },
              { source: "ML", target: "CV" },
              { source: "CV", target: "CNN" },
              { source: "AI", target: "Data" },
              { source: "Data", target: "ML" },
            ],
          });
        } else {
          // Generic knowledge graph
          resolve({
            nodes: [
              { id: "Root", label: "Main Topic", val: 25 },
              { id: "A", label: "Concept A", val: 18 },
              { id: "B", label: "Concept B", val: 18 },
              { id: "C", label: "Concept C", val: 18 },
              { id: "A1", label: "Sub-concept A1", val: 12 },
              { id: "A2", label: "Sub-concept A2", val: 12 },
              { id: "B1", label: "Sub-concept B1", val: 12 },
              { id: "C1", label: "Sub-concept C1", val: 12 },
            ],
            links: [
              { source: "Root", target: "A" },
              { source: "Root", target: "B" },
              { source: "Root", target: "C" },
              { source: "A", target: "A1" },
              { source: "A", target: "A2" },
              { source: "B", target: "B1" },
              { source: "C", target: "C1" },
              { source: "A", target: "B" },
              { source: "B", target: "C" },
            ],
          });
        }
      }, 800);
    });
  };

  const generateMockData = (): Array<{ name: string; value: number }> => {
    return [
      { name: "Jan", value: 400 },
      { name: "Feb", value: 300 },
      { name: "Mar", value: 600 },
      { name: "Apr", value: 800 },
      { name: "May", value: 500 },
      { name: "Jun", value: 700 },
      { name: "Jul", value: 900 },
      { name: "Aug", value: 850 },
      { name: "Sep", value: 950 },
      { name: "Oct", value: 1100 },
      { name: "Nov", value: 1000 },
      { name: "Dec", value: 1200 },
    ];
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev: Message[]) => [...prev, userMessage]);

    const currentInput = input;
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // Check for knowledge graph request first
    const isKnowledgeGraphRequest = detectKnowledgeGraphRequest(currentInput);

    if (isKnowledgeGraphRequest) {
      // Handle knowledge graph request
      try {
        const graphData = await fetchKnowledgeGraphData(currentInput);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content:
            "I've generated a knowledge graph visualization showing the relationships and connections. You can drag nodes to explore, zoom in/out, and hover over nodes to see details.",
          hasKnowledgeGraph: true,
          graphData: graphData,
        };
        setMessages((prev: Message[]) => [...prev, aiMessage]);
      } catch (error) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content:
            "Sorry, I encountered an error generating the knowledge graph. Please try again.",
        };
        setMessages((prev: Message[]) => [...prev, errorMessage]);
      }
    } else {
      // Handle regular data visualization request
      setTimeout(() => {
        const shouldVisualize = detectDataInMessage(currentInput);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "ai",
          content: shouldVisualize
            ? "I've created a visualization of your data below. The chart shows the trend over time with key insights highlighted."
            : "I understand you want to work with your data. Could you share some specific data points or upload a file so I can create beautiful visualizations for you?",
          hasVisualization: shouldVisualize,
          data: shouldVisualize ? generateMockData() : undefined,
        };
        setMessages((prev: Message[]) => [...prev, aiMessage]);
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    activeTaskMessageId.current = null;
    if (!file) return;

    e.target.value = "";

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: `Uploaded file: ${file.name}`,
    };

    setMessages((prev: Message[]) => [...prev, userMessage]);

    try {
      const uplReqResponse = await fetch(
        "http://localhost:8000/api/v1/endpoints/ingestion/upload",
        {
          method: "GET",
        },
      );

      const { file_id, object_key, url } = await uplReqResponse.json();

      console.log(url);

      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: file,
        // headers: {
        //   "Content-Type": file.type || "application/octect-stream",
        // },
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload Failed");
      }

      const processResponse = await fetch(
        "http://localhost:8000/api/v1/endpoints/ingestion/process",
        {
          method: "POST",
          body: JSON.stringify({
            object_key: object_key,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const processData = await processResponse.json();

      console.log(`Processing Started....${JSON.stringify(processData)}`);
      if (processData.status === "ingestion.queued") {
        const aiMessage: Message = {
          id: Date.now().toString(),
          role: "ai",
          content: `Ingestion started. Task ID: ${processData.task_id}`,
        };

        connectSocket(processData.task_id);
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Upload failed:", error);

      setMessages((prev: Message[]) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "ai",
          content: "Error uploading file",
        },
      ]);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  const calculateStats = (data: Array<{ name: string; value: number }>) => {
    const values = data.map((d) => d.value);
    const total = values.reduce((sum, val) => sum + val, 0);
    const average = Math.round(total / values.length);
    const peak = Math.max(...values);
    return { total, average, peak };
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-[#0f0f0f] border border-white/10 hover:bg-white/5"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed lg:relative w-[280px] h-full bg-[#0f0f0f] border-r border-white/10 flex flex-col z-40"
          >
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <motion.div className="relative" whileHover={{ scale: 1.05 }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl blur-lg opacity-50" />
                  <div className="relative w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Visualize
                  </h1>
                  <p className="text-xs text-white/50 uppercase tracking-wider">
                    AI Data Studio
                  </p>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="p-4">
              <Button
                onClick={onBack}
                variant="ghost"
                className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
              >
                <ArrowLeft className="mr-2" size={16} />
                Back to Home
              </Button>
            </div>

            {/* New Chat Button */}
            <div className="p-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleNewChat}
                  className="w-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                >
                  <Plus className="mr-2" size={20} />
                  New Chat
                </Button>
              </motion.div>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto px-4">
              <div className="space-y-2">
                <p className="text-xs text-white/50 uppercase tracking-wider px-2 py-2">
                  Chat History
                </p>
                <motion.div
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-200 border border-white/5"
                >
                  <div className="flex items-center space-x-2">
                    <MessageSquare size={16} className="text-blue-400" />
                    <span className="text-sm text-white/70 truncate">
                      Sales Data Analysis
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-all duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <MessageSquare size={16} className="text-purple-400" />
                    <span className="text-sm text-white/70 truncate">
                      Revenue Trends Q3
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-all duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <MessageSquare size={16} className="text-cyan-400" />
                    <span className="text-sm text-white/70 truncate">
                      Customer Metrics
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* User Profile */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-200">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">User</p>
                  <p className="text-xs text-white/50">user@example.com</p>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {messages.length === 0 ? (
          // Empty State
          <div className="flex-1 flex items-center justify-center p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl w-full text-center space-y-8"
            >
              <div className="space-y-4">
                <motion.h2
                  className="text-4xl md:text-5xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  How can I help you visualize data today?
                </motion.h2>
                <motion.p
                  className="text-xl text-white/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Share your data and I'll create beautiful visualizations
                </motion.p>
              </div>

              {/* Central Input Box */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl" />
                <div className="relative bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl shadow-blue-500/10">
                  <div className="flex items-end space-x-2 p-4">
                    <Textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Share your data or ask me to create a visualization..."
                      className="flex-1 bg-transparent border-none text-white placeholder:text-white/40 resize-none min-h-[60px] max-h-[200px] focus-visible:ring-0 focus-visible:ring-offset-0"
                      rows={1}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = target.scrollHeight + "px";
                      }}
                    />
                    <div className="flex items-center space-x-2">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleFileUpload}
                          className="bg-white/5 hover:bg-white/10 border border-white/10"
                        >
                          <Paperclip size={20} className="text-white/70" />
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          size="icon"
                          onClick={handleSend}
                          disabled={!input.trim()}
                          className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                        >
                          <Send size={20} />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        ) : (
          // Active Chat State - ChatGPT-like Layout
          <>
            {/* Scrollable Messages Area */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} items-start space-x-4`}
                    >
                      {message.role === "ai" && (
                        <motion.div
                          className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                          animate={{
                            boxShadow: [
                              "0 0 20px rgba(59, 130, 246, 0.3)",
                              "0 0 30px rgba(147, 51, 234, 0.5)",
                              "0 0 20px rgba(59, 130, 246, 0.3)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <BarChart3 size={20} className="text-white" />
                        </motion.div>
                      )}

                      <div
                        className={`flex flex-col space-y-2 ${message.role === "user" ? "items-end" : "items-start"} max-w-2xl`}
                      >
                        <div
                          className={`${
                            message.role === "user"
                              ? "bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-2xl rounded-tr-none shadow-lg shadow-blue-500/25"
                              : "bg-[#0f0f0f] border border-white/10 text-white rounded-2xl rounded-tl-none shadow-xl"
                          } p-4`}
                        >
                          <p className="text-sm leading-relaxed">
                            {message.content}
                          </p>
                        </div>

                        {message.hasVisualization && message.data && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-full"
                          >
                            <div className="relative">
                              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-lg" />
                              <div className="relative bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 shadow-2xl">
                                <h3 className="text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                                  Data Visualization
                                </h3>
                                <ResponsiveContainer width="100%" height={300}>
                                  <AreaChart data={message.data}>
                                    <defs>
                                      <linearGradient
                                        id="colorValue"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                      >
                                        <stop
                                          offset="5%"
                                          stopColor="#3b82f6"
                                          stopOpacity={0.8}
                                        />
                                        <stop
                                          offset="95%"
                                          stopColor="#9333ea"
                                          stopOpacity={0.1}
                                        />
                                      </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                      strokeDasharray="3 3"
                                      stroke="#ffffff15"
                                    />
                                    <XAxis dataKey="name" stroke="#ffffff50" />
                                    <YAxis stroke="#ffffff50" />
                                    <Tooltip
                                      contentStyle={{
                                        backgroundColor: "#0f0f0f",
                                        border:
                                          "1px solid rgba(255, 255, 255, 0.1)",
                                        borderRadius: "8px",
                                      }}
                                    />
                                    <Area
                                      type="monotone"
                                      dataKey="value"
                                      stroke="#3b82f6"
                                      strokeWidth={2}
                                      fillOpacity={1}
                                      fill="url(#colorValue)"
                                    />
                                  </AreaChart>
                                </ResponsiveContainer>
                                <div className="grid grid-cols-3 gap-4 mt-6">
                                  {(() => {
                                    const stats = calculateStats(message.data);
                                    return (
                                      <>
                                        <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                                          <p className="text-xs text-white/50 mb-1">
                                            Total
                                          </p>
                                          <p className="text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                            {stats.total.toLocaleString()}
                                          </p>
                                        </div>
                                        <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                                          <p className="text-xs text-white/50 mb-1">
                                            Average
                                          </p>
                                          <p className="text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                            {stats.average.toLocaleString()}
                                          </p>
                                        </div>
                                        <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                                          <p className="text-xs text-white/50 mb-1">
                                            Peak
                                          </p>
                                          <p className="text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                            {stats.peak.toLocaleString()}
                                          </p>
                                        </div>
                                      </>
                                    );
                                  })()}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {message.hasKnowledgeGraph && message.graphData && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-full"
                          >
                            <div className="relative">
                              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-lg" />
                              <div className="relative bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 shadow-2xl">
                                <h3 className="text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                                  Knowledge Graph Visualization
                                </h3>
                                <div className="w-full h-[500px] bg-black/30 rounded-xl overflow-hidden border border-white/5">
                                  <ForceGraph2D
                                    graphData={message.graphData}
                                    nodeLabel="label"
                                    nodeAutoColorBy="id"
                                    nodeCanvasObject={(
                                      node: any,
                                      ctx: CanvasRenderingContext2D,
                                      globalScale: number,
                                    ) => {
                                      // Check if node has valid coordinates
                                      if (
                                        typeof node.x !== "number" ||
                                        typeof node.y !== "number" ||
                                        !isFinite(node.x) ||
                                        !isFinite(node.y)
                                      ) {
                                        return;
                                      }

                                      const label = node.label || node.id;
                                      const fontSize = 12 / globalScale;
                                      ctx.font = `${fontSize}px Sans-Serif`;

                                      // Highlight important nodes (higher val)
                                      const isImportant =
                                        node.val && node.val > 20;
                                      const nodeSize = node.val
                                        ? node.val / 2.5
                                        : 5;

                                      // Draw node circle with gradient effect
                                      const gradient = ctx.createRadialGradient(
                                        node.x,
                                        node.y,
                                        0,
                                        node.x,
                                        node.y,
                                        nodeSize,
                                      );
                                      if (isImportant) {
                                        gradient.addColorStop(0, "#8b5cf6");
                                        gradient.addColorStop(1, "#3b82f6");
                                      } else {
                                        gradient.addColorStop(0, "#6366f1");
                                        gradient.addColorStop(1, "#3b82f6");
                                      }

                                      ctx.beginPath();
                                      ctx.arc(
                                        node.x,
                                        node.y,
                                        nodeSize,
                                        0,
                                        2 * Math.PI,
                                      );
                                      ctx.fillStyle = gradient;
                                      ctx.fill();

                                      // Add glow effect for important nodes
                                      if (isImportant) {
                                        ctx.shadowColor = "#8b5cf6";
                                        ctx.shadowBlur = 15;
                                        ctx.fill();
                                        ctx.shadowBlur = 0;
                                      }

                                      // Draw border
                                      ctx.strokeStyle = isImportant
                                        ? "#a78bfa"
                                        : "#60a5fa";
                                      ctx.lineWidth = isImportant
                                        ? 2 / globalScale
                                        : 1.5 / globalScale;
                                      ctx.stroke();

                                      // Draw label
                                      ctx.textAlign = "center";
                                      ctx.textBaseline = "middle";
                                      ctx.fillStyle = "#ffffff";
                                      ctx.fillText(
                                        label,
                                        node.x,
                                        node.y + nodeSize + fontSize + 2,
                                      );
                                    }}
                                    linkColor={() => "rgba(96, 165, 250, 0.3)"}
                                    linkWidth={2}
                                    linkDirectionalParticles={2}
                                    linkDirectionalParticleWidth={2}
                                    linkDirectionalParticleColor={() =>
                                      "rgba(167, 139, 250, 0.6)"
                                    }
                                    backgroundColor="#000000"
                                    enableNodeDrag={true}
                                    enableZoomInteraction={true}
                                    enablePanInteraction={true}
                                    cooldownTime={3000}
                                    d3VelocityDecay={0.3}
                                  />
                                </div>
                                <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                                  <p className="text-sm text-white/70">
                                    <span className="text-blue-400">
                                      💡 Tip:
                                    </span>{" "}
                                    Drag nodes to explore relationships, scroll
                                    to zoom, and hover to see details.
                                    {message.graphData.nodes.some(
                                      (n: GraphNode) => n.val && n.val > 20,
                                    ) && (
                                      <span className="text-purple-400">
                                        {" "}
                                        Larger, glowing nodes indicate key
                                        concepts.
                                      </span>
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {message.role === "user" && (
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                          <User size={20} className="text-white" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Fixed Input Box at Bottom */}
            <div className="border-t border-white/10 p-4 bg-[#0a0a0a]">
              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-2xl blur-lg" />
                  <div className="relative bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl">
                    <div className="flex items-end space-x-2 p-4">
                      <Textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Share your data or ask me to create a visualization..."
                        className="flex-1 bg-transparent border-none text-white placeholder:text-white/40 resize-none min-h-[60px] max-h-[200px] focus-visible:ring-0 focus-visible:ring-offset-0"
                        rows={1}
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement;
                          target.style.height = "auto";
                          target.style.height = target.scrollHeight + "px";
                        }}
                      />
                      <div className="flex items-center space-x-2">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleFileUpload}
                            className="bg-white/5 hover:bg-white/10 border border-white/10"
                          >
                            <Paperclip size={20} className="text-white/70" />
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            size="icon"
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                          >
                            <Send size={20} />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.json,.xlsx,.xls,.pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
