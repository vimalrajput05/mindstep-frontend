import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, X } from "lucide-react";

// Sample questions with category and tip
const demoQuestions = [
  { id: 1, category: "Problem Solving", question: "I enjoy solving complex problems in my free time.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], tip: "Think about how often you tackle puzzles or challenges." },
  { id: 2, category: "Teamwork", question: "I prefer working in a team rather than alone.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], tip: "Consider group projects or activities." },
  { id: 3, category: "Planning", question: "I often plan things in advance rather than improvise.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], tip: "Reflect on daily or work planning." },
  { id: 4, category: "Adaptability", question: "I adapt quickly to new environments or changes.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], tip: "Think about changes in school, work, or hobbies." },
];

export default function PsychometricTest() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(demoQuestions.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
  }, [darkMode]);

  const selectAnswer = (idx) => {
    const updated = [...answers];
    updated[current] = idx;
    setAnswers(updated);
  };

  const nextQuestion = () => {
    if (current < demoQuestions.length - 1) setCurrent(current + 1);
    else setShowResult(true);
  };

  const prevQuestion = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const resetTest = () => {
    setAnswers(Array(demoQuestions.length).fill(null));
    setCurrent(0);
    setShowResult(false);
  };

  const calculateResult = () => {
    const score = answers.reduce((sum, a) => sum + (a ?? 0), 0);
    if (score <= 5) return "Reserved / Analytical";
    if (score <= 10) return "Balanced / Team Player";
    return "Extrovert / Adaptive";
  };

  const fadeIn = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-950 text-gray-100" : "bg-slate-50 text-gray-900"}`}>
      {/* NAV */}
      <header className={`sticky top-0 z-50 backdrop-blur-md ${darkMode ? "bg-gray-900/70 border-b border-gray-800" : "bg-white/80 border-b border-gray-200"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <h1 className="text-lg font-bold">Psychometric Test</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => navigate("/dashboard")} className="px-3 py-2 bg-indigo-600 text-white rounded-lg">Back</button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={current}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900/60 border-gray-800" : "bg-white border-gray-200"} border shadow-lg`}
            >
              {/* Progress */}
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 mb-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((current + 1) / demoQuestions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Question Card */}
                <div className="flex-1">
                  <div className="text-xs text-gray-400 mb-1">{demoQuestions[current].category}</div>
                  <div className="text-lg md:text-xl font-semibold mb-2">{demoQuestions[current].question}</div>
                  <div className="text-sm text-gray-500 mb-4">{demoQuestions[current].tip}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {demoQuestions[current].options.map((opt, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => selectAnswer(idx)}
                        className={`px-4 py-2 rounded-lg border text-left transition ${
                          answers[current] === idx
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : darkMode
                            ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                            : "bg-white border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-6 flex justify-between flex-wrap gap-3">
                <button onClick={prevQuestion} disabled={current === 0} className="px-4 py-2 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  Previous
                </button>
                <button onClick={nextQuestion} className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
                  {current === demoQuestions.length - 1 ? "Submit" : "Next"}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900/60 border-gray-800" : "bg-white border-gray-200"} border shadow-lg text-center`}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Your Psychometric Result</h2>
              <div className="text-lg md:text-xl mb-6">{calculateResult()}</div>

              <div className="space-y-3 mb-6">
                {demoQuestions.map((q, idx) => (
                  <div key={q.id} className="flex justify-between text-sm md:text-base">
                    <div>{q.category}</div>
                    <div className="font-semibold text-indigo-500">{answers[idx] !== null ? q.options[answers[idx]] : "—"}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <button onClick={resetTest} className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
                  Retake Test
                </button>
                <button onClick={() => navigate("/dashboard")} className="px-4 py-2 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  Back to Dashboard
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
