// src/pages/Demo.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sun,
  Moon,
  CheckCircle,
  XCircle,
  Bolt,
  BookOpen,
  Code,
  Database,
  Briefcase,
  UserCheck,
  Tag,
  X,
} from "lucide-react";

const QUESTIONS = [
  { id: "q1", text: "I enjoy solving algorithmic puzzles and coding small projects.", weight: "technical" },
  { id: "q2", text: "I prefer organizing data and drawing insights from numbers.", weight: "analytical" },
  { id: "q3", text: "I feel energized when working in teams and communicating ideas.", weight: "communication" },
  { id: "q4", text: "I like designing user-friendly interfaces and thinking about UX.", weight: "design" },
  { id: "q5", text: "I enjoy building backend systems, databases, and APIs.", weight: "infrastructure" },
];

const CAREER_MAP = [
  { id: "data_scientist", title: "Data Scientist", desc: "Works with data, models and analytics to solve problems.", required: ["python", "statistics", "sql", "ml", "visualization"], icon: BookOpen },
  { id: "frontend_dev", title: "Frontend Developer", desc: "Creates user interfaces, focuses on UX and interactive apps.", required: ["javascript", "react", "html", "css", "design"], icon: Code },
  { id: "backend_dev", title: "Backend Developer", desc: "Builds servers, APIs and database systems.", required: ["node", "sql", "apis", "database", "security"], icon: Database },
  { id: "product_manager", title: "Product Manager", desc: "Defines product strategy and coordinates teams.", required: ["communication", "strategy", "analytics", "ux", "team"], icon: Briefcase },
  { id: "devops_engineer", title: "DevOps / Infra", desc: "Automates deployments, ensures reliability and scale.", required: ["ci/cd", "containers", "cloud", "monitoring", "scripting"], icon: Bolt },
];

const DEFAULT_SKILLS = ["javascript", "react", "python", "sql", "html", "css", "node", "ml", "design", "cloud"];

function normalizeSkill(s) {
  return s.trim().toLowerCase().replace(/\s+/g, "_");
}

export default function Demo() {
  const navigate = useNavigate();
  const confettiRef = useRef(null);

  // Dark mode
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // Test states
  const [answers, setAnswers] = useState({});
  const [selectedSkills, setSelectedSkills] = useState(new Set(["javascript", "react"]));
  const [manualSkill, setManualSkill] = useState("");
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = QUESTIONS.length;
  const progressPct = Math.round((answeredCount / totalQuestions) * 100);

  const toggleSkill = (s) => {
    const n = normalizeSkill(s);
    setSelectedSkills((prev) => {
      const next = new Set(prev);
      next.has(n) ? next.delete(n) : next.add(n);
      return next;
    });
  };

  const addManualSkill = () => {
    const v = normalizeSkill(manualSkill);
    if (!v) return;
    setSelectedSkills((prev) => new Set(prev).add(v));
    setManualSkill("");
  };

  const removeSkill = (s) => {
    setSelectedSkills((prev) => {
      const next = new Set(prev);
      next.delete(s);
      return next;
    });
  };

  const score = useMemo(() => {
    const categoryTotals = {};
    const categoryCounts = {};
    QUESTIONS.forEach((q) => {
      const val = answers[q.id] ?? 0;
      categoryTotals[q.weight] = (categoryTotals[q.weight] || 0) + val;
      categoryCounts[q.weight] = (categoryCounts[q.weight] || 0) + 1;
    });
    const catScores = {};
    Object.keys(categoryTotals).forEach((k) => {
      catScores[k] = Math.round((categoryTotals[k] / (categoryCounts[k] * 5)) * 100 || 0);
    });
    const sum = Object.values(answers).reduce((a, b) => a + b, 0);
    const overall = Math.round((sum / (totalQuestions * 5)) * 100 || 0);
    return { catScores, overall };
  }, [answers]);

  const careerMatches = useMemo(() => {
    const skills = Array.from(selectedSkills);
    return CAREER_MAP.map((c) => {
      const overlap = c.required.filter((r) => skills.includes(r)).length;
      const score = Math.round((overlap / c.required.length) * 100);
      return { ...c, matchPercent: score, overlap };
    }).sort((a, b) => b.matchPercent - a.matchPercent);
  }, [selectedSkills]);

  const topCareer = careerMatches[0];
  const finalGood = submitted && (topCareer?.matchPercent >= 60 || score.overall >= 60);

  const handleSubmit = () => {
    if (answeredCount < 2) {
      alert("Please answer at least 2 questions!");
      return;
    }
    setSubmitted(true);
    setStarted(false);
    setTimeout(() => document.getElementById("demo-results")?.scrollIntoView({ behavior: "smooth" }), 300);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setStarted(false);
    setSelectedSkills(new Set(["javascript", "react"]));
  };

  const [winConfetti, setWinConfetti] = useState(false);
  useEffect(() => {
    if (submitted && finalGood) {
      setWinConfetti(true);
      setTimeout(() => setWinConfetti(false), 6000);
    }
  }, [submitted, finalGood]);

  const radioOptions = [
    { label: "Strongly Disagree", value: 1 },
    { label: "Disagree", value: 2 },
    { label: "Neutral", value: 3 },
    { label: "Agree", value: 4 },
    { label: "Strongly Agree", value: 5 },
  ];

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100`}>
      {winConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      {/* Topbar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between py-3">
          <button onClick={() => navigate("/")} title="Back to Home" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="text-lg font-bold">Skill Match Test</div>

          <button onClick={() => setDarkMode((s) => !s)} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          <section className="lg:col-span-7 space-y-6">
            {/* Test section */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow">
              {!started && !submitted && (
                <div className="space-y-4 text-center">
                  <h2 className="text-2xl font-bold">Quick Skill Assessment</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Take a small quiz and add your skills to see your best-fit career path.</p>
                  <div className="flex justify-center gap-4 flex-wrap">
                    <button onClick={() => setStarted(true)} className="px-5 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:scale-105 transition">Start Test</button>
                    <button onClick={() => setSubmitted(true)} className="px-5 py-3 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">Quick Demo</button>
                  </div>
                </div>
              )}

              {started && !submitted && (
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <div>{answeredCount}/{totalQuestions} answered</div>
                    <div>{progressPct}%</div>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600" style={{ width: `${progressPct}%` }} />
                  </div>

                  {QUESTIONS.map((q) => (
                    <div key={q.id} className="p-4 rounded-lg border dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40">
                      <div className="font-medium">{q.text}</div>
                      <div className="mt-3 grid grid-cols-5 gap-2">
                        {radioOptions.map((opt) => {
                          const checked = (answers[q.id] ?? 0) === opt.value;
                          return (
                            <button
                              key={opt.value}
                              onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.value }))}
                              className={`py-2 rounded-lg text-xs font-medium border ${checked ? "bg-indigo-600 text-white border-indigo-600" : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"}`}
                            >
                              {opt.label.split(" ")[0]}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-3">
                    <button onClick={handleSubmit} className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md">Submit</button>
                    <button onClick={handleReset} className="px-4 py-3 border rounded-lg">Reset</button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Skill Section */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow">
              <h3 className="text-lg font-bold">Your Skills</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {DEFAULT_SKILLS.map((s) => {
                  const active = selectedSkills.has(normalizeSkill(s));
                  return (
                    <button
                      key={s}
                      onClick={() => toggleSkill(s)}
                      className={`px-3 py-1 rounded-full border flex items-center gap-2 text-sm ${active ? "bg-indigo-600 text-white border-indigo-600" : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"}`}
                    >
                      <Tag className="w-4 h-4" /> {s}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex gap-3">
                <input
                  value={manualSkill}
                  onChange={(e) => setManualSkill(e.target.value)}
                  placeholder="Add a skill"
                  className="flex-1 px-4 py-2 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800"
                />
                <button onClick={addManualSkill} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Add</button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {Array.from(selectedSkills).map((s) => (
                  <span key={s} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border rounded-full flex items-center gap-2 text-sm">
                    {s} <button onClick={() => removeSkill(s)}><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Result Section */}
          <aside className="lg:col-span-5">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow sticky top-24">
              <h3 className="text-lg font-bold mb-3">Career Matches</h3>
              {careerMatches.slice(0, 3).map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.id} className="p-3 mb-3 rounded-lg border dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div className="font-semibold">{c.title}</div>
                        <div className="text-sm">{c.matchPercent}%</div>
                      </div>
                      <div className="text-xs text-gray-500">{c.desc}</div>
                    </div>
                  </div>
                );
              })}

              {submitted && (
                <div id="demo-results" className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="font-semibold text-green-700 dark:text-green-300">🎉 {finalGood ? "Great Match!" : "Needs improvement"}</div>
                  <div className="text-sm mt-2">Suggested: {topCareer?.title}</div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => navigate("/")} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Back to Home</button>
                    <button onClick={handleReset} className="px-4 py-2 border rounded-lg">Try Again</button>
                  </div>
                </div>
              )}
            </motion.div>
          </aside>
        </div>
      </main>

      <footer className="text-center py-6 text-xs text-gray-500 dark:text-gray-400">
        © 2025 Skill Analyzer — Dark Mode Supported
      </footer>
    </div>
  );
}
