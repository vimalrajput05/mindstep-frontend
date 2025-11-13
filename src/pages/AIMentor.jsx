import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sun, Moon, Send, Bot, User as UserIcon, Sparkles, Brain, TrendingUp, BookOpen, Lightbulb } from "lucide-react";

const QUICK_PROMPTS = [
  { id: 1, text: "What skills should I learn for Data Science?", icon: Brain },
  { id: 2, text: "How to prepare for coding interviews?", icon: TrendingUp },
  { id: 3, text: "Best resources to learn React?", icon: BookOpen },
  { id: 4, text: "Career roadmap for AI/ML Engineer", icon: Sparkles },
];

const AI_RESPONSES = {
  "data science": "For Data Science, I recommend: 1️⃣ **Python** (NumPy, Pandas, Matplotlib), 2️⃣ **Statistics & Math**, 3️⃣ **Machine Learning** (Scikit-learn), 4️⃣ **SQL** for databases, 5️⃣ **Data Visualization** (Tableau/Power BI). Start with Python basics, then move to data manipulation. Build 2-3 projects to showcase your skills!",
  
  "coding interviews": "For coding interviews: 1️⃣ Master **DSA** (Arrays, LinkedList, Trees, Graphs), 2️⃣ Practice on **LeetCode/HackerRank** (solve 100+ problems), 3️⃣ Learn **Time/Space Complexity**, 4️⃣ Study **System Design** basics, 5️⃣ Mock interviews with friends. Focus on problem-solving patterns!",
  
  "react": "To learn React: 1️⃣ First learn **JavaScript ES6+** (Arrow functions, Promises), 2️⃣ React **Components & Props**, 3️⃣ **State Management** (useState, useEffect), 4️⃣ **React Router** for navigation, 5️⃣ Build projects (Todo App, Weather App). Free resources: React.dev docs, freeCodeCamp, Scrimba.",
  
  "ai ml engineer": "AI/ML Engineer roadmap: **Year 1:** Python + Math + Statistics + Basic ML. **Year 2:** Deep Learning (TensorFlow/PyTorch) + NLP/Computer Vision + Projects. **Year 3:** Advanced topics + Research papers + Real-world deployment. Key skills: Python, Mathematics, ML algorithms, Neural Networks, Cloud (AWS/GCP).",
  
  "career": "Your career path depends on: 1️⃣ **Your interests** (what excites you?), 2️⃣ **Your skills** (what are you good at?), 3️⃣ **Market demand** (job availability), 4️⃣ **Salary expectations**. Complete our skill tests and psychometric assessment for personalized recommendations!",
  
  "default": "Great question! 🤔 I can help you with: ✅ Career guidance, ✅ Learning resources, ✅ Skill development, ✅ Interview prep, ✅ Project ideas. Try asking about specific topics like 'web development', 'data science', or 'career advice'!"
};

export default function AIMentor() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      text: "👋 Hi! I'm your AI Career Mentor. I can help you with career guidance, learning resources, skill development, and more. How can I assist you today?",
      timestamp: new Date()
    }
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getAIResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(AI_RESPONSES)) {
      if (key !== "default" && lowerMsg.includes(key)) {
        return response;
      }
    }
    
    return AI_RESPONSES.default;
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      text: text.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1500));

    const aiResponse = {
      id: Date.now() + 1,
      type: "ai",
      text: getAIResponse(text),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
  };

  const handleQuickPrompt = (promptText) => {
    sendMessage(promptText);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-950" : "bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50"}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md ${darkMode ? "bg-gray-900/80 border-b border-gray-800" : "bg-white/80 border-b border-gray-200"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.button
            onClick={() => window.location.href = "/dashboard"}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} transition`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className={`w-5 h-5  ${darkMode ? "text-white" : "text-black"}`} />
            {/* <span className="font-medium">Back to Dashboard</span> */}
          </motion.button>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                AI Mentor
              </h1>
              <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Premium Feature
              </div>
            </div>
          </div>

          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-lg ${darkMode ? "bg-gray-800 text-yellow-400" : "bg-gray-100 text-gray-700"} transition`}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Quick Prompts Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-6 rounded-3xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-xl"} sticky top-24`}
            >
              <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Quick Prompts
              </h3>
              <div className="space-y-3">
                {QUICK_PROMPTS.map((prompt) => {
                  const Icon = prompt.icon;
                  return (
                    <motion.button
                      key={prompt.id}
                      onClick={() => handleQuickPrompt(prompt.text)}
                      className={`w-full p-3 rounded-xl text-left text-sm transition ${
                        darkMode
                          ? "bg-gray-800 hover:bg-gray-750 border border-gray-700"
                          : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className={`w-4 h-4 mb-2 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
                      <div className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {prompt.text}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className={`mt-6 p-4 rounded-xl ${darkMode ? "bg-purple-900/20 border border-purple-800/30" : "bg-purple-50 border border-purple-200"}`}>
                <div className={`text-xs font-medium ${darkMode ? "text-purple-300" : "text-purple-700"}`}>
                  💡 Tip
                </div>
                <div className={`text-xs mt-1 ${darkMode ? "text-purple-400" : "text-purple-600"}`}>
                  Ask specific questions for better guidance!
                </div>
              </div>
            </motion.div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-3xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-xl"} flex flex-col h-[calc(100vh-12rem)]`}
            >
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message, idx) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex gap-3 max-w-[85%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                        {/* Avatar */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === "ai"
                            ? "bg-gradient-to-br from-purple-600 to-pink-600"
                            : "bg-gradient-to-br from-indigo-600 to-blue-600"
                        }`}>
                          {message.type === "ai" ? (
                            <Bot className="w-5 h-5 text-white" />
                          ) : (
                            <UserIcon className="w-5 h-5 text-white" />
                          )}
                        </div>

                        {/* Message Bubble */}
                        <div>
                          <div className={`px-4 py-3 rounded-2xl ${
                            message.type === "ai"
                              ? darkMode
                                ? "bg-gray-800 border border-gray-700"
                                : "bg-gray-100 border border-gray-200"
                              : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                          }`}>
                            <div className={`text-sm whitespace-pre-wrap ${
                              message.type === "ai" 
                                ? darkMode ? "text-gray-200" : "text-gray-800"
                                : "text-white"
                            }`}>
                              {message.text}
                            </div>
                          </div>
                          <div className={`text-xs mt-1 ${message.type === "user" ? "text-right" : "text-left"} ${
                            darkMode ? "text-gray-500" : "text-gray-500"
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className={`px-4 py-3 rounded-2xl ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 rounded-full bg-purple-500"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 rounded-full bg-purple-500"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 rounded-full bg-purple-500"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className={`p-6 border-t ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage(input)}
                    placeholder="Ask me anything about your career..."
                    className={`flex-1 px-4 py-3 rounded-xl border ${
                      darkMode
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                    } focus:ring-2 focus:ring-purple-500 outline-none transition`}
                  />
                  <motion.button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || isTyping}
                    className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 ${
                      input.trim() && !isTyping
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                    }`}
                    whileHover={input.trim() && !isTyping ? { scale: 1.05 } : {}}
                    whileTap={input.trim() && !isTyping ? { scale: 0.95 } : {}}
                  >
                    <Send className="w-5 h-5" />
                    <span className="hidden sm:inline">Send</span>
                  </motion.button>
                </div>

                <div className={`mt-3 text-xs ${darkMode ? "text-gray-500" : "text-gray-500"} text-center`}>
                  💎 Premium feature • Powered by AI • Available 24/7
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}