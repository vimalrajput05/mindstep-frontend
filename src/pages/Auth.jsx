import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Mail, Lock, User, ArrowRight, Sun, Moon } from "lucide-react";

/**
 * Auth page - combined Login / Signup
 * - fake auth that stores user in localStorage: { email, plan: 'free' }
 * - redirects to /dashboard on success
 * - darkMode reads/writes localStorage.darkMode (consistent with Home)
 */

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkMode(saved);
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("darkMode", next);
  };

  // If already logged in, redirect to dashboard
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const container = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // simple validation
    if (!email || !password || (!isLogin && !name)) {
      alert("Please fill required fields");
      return;
    }

    // Fake auth: save user to localStorage
    const user = {
      email,
      name: isLogin ? (JSON.parse(localStorage.getItem("user"))?.name ?? "User") : name,
      plan: "free", // default
      loggedAt: Date.now(),
    };
    localStorage.setItem("user", JSON.stringify(user));

    // redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-12 transition-colors duration-300 ${
      darkMode ? "bg-gray-900 text-gray-100" : "bg-slate-50 text-gray-900"
    }`}>
      {/* top-left home link */}
      <div className="absolute top-6 left-6">
        <Link to="/">
          <div className="flex items-center gap-2">
            <Brain className={`w-7 h-7 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`} />
            <span className="font-semibold">MindStep</span>
          </div>
        </Link>
      </div>

      {/* dark mode toggle */}
      <div className="absolute top-6 right-6">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg ${darkMode ? "bg-gray-800 text-yellow-300" : "bg-white shadow-sm"}`}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <motion.div
        className={`w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-md border ${
          darkMode ? "bg-gray-800/60 border-gray-700" : "bg-white/90 border-gray-200"
        }`}
        initial="hidden"
        animate="show"
        variants={container}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <Brain className={`w-8 h-8 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`} />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            MindStep
          </h2>
        </div>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
            >
              <h3 className={`text-xl font-semibold mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Welcome back
              </h3>
              <p className={`text-sm mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Sign in to continue to your personalized dashboard
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className={`relative`}>
                  <Mail className="absolute left-3 top-3 text-gray-400" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-400 outline-none ${
                      darkMode ? "bg-gray-900 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-400 outline-none ${
                      darkMode ? "bg-gray-900 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow"
                >
                  Login <ArrowRight className="inline-block ml-2 w-4 h-4" />
                </motion.button>
              </form>

              <p className={`mt-5 text-center text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                New here?{" "}
                <button onClick={() => { setIsLogin(false); setPassword(""); }} className="text-indigo-500 hover:underline">
                  Create an account
                </button>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
            >
              <h3 className={`text-xl font-semibold mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Create your account
              </h3>
              <p className={`text-sm mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Start with a free plan — upgrade later anytime
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Full name"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-400 outline-none ${
                      darkMode ? "bg-gray-900 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                <div className={`relative`}>
                  <Mail className="absolute left-3 top-3 text-gray-400" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-400 outline-none ${
                      darkMode ? "bg-gray-900 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-400 outline-none ${
                      darkMode ? "bg-gray-900 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow"
                >
                  Sign up <ArrowRight className="inline-block ml-2 w-4 h-4" />
                </motion.button>
              </form>

              <p className={`mt-5 text-center text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Already have an account?{" "}
                <button onClick={() => { setIsLogin(true); setPassword(""); }} className="text-indigo-500 hover:underline">
                  Login
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* small footer links */}
        <div className="mt-6 text-center">
          <Link to="/" className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} hover:underline`}>
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
