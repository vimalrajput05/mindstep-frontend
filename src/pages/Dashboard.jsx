import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, Sparkles, Star, Gift, Lock, ShieldCheck, Crown, BarChart3, User, Globe,
  Zap, Activity, DownloadCloud, MessageSquare, Briefcase, CheckCircle, XCircle
} from "lucide-react";

/**
 * Advanced Dashboard (single-file)
 * - Dark mode sync with localStorage.darkMode
 * - Reads user from localStorage.user (fake auth)
 * - Upgrade toggles user.plan -> 'premium'
 * - Lots of UI sections populated with the feature list you provided
 * - Animations via framer-motion
 */

export default function Dashboard() {
  const navigate = useNavigate();
  // load user (fake auth)
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  });

  // dark mode
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
  }, [darkMode]);

  // redirect to auth if not logged in
  useEffect(() => {
    if (!user) navigate("/auth");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // fake upgrade
  const upgradeToPremium = () => {
    if (!user) return;
    const upgraded = { ...user, plan: "premium", upgradedAt: Date.now() };
    localStorage.setItem("user", JSON.stringify(upgraded));
    setUser(upgraded);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/auth");
  };

  // --- Mocked data derived from the detailed spec the user gave ---
  const freeFeatureBullets = [
    "Landing Hero with CTA",
    "Feature highlights (OCR, AI analysis, peer comparison)",
    "Basic Dashboard & Progress",
    "Skill tests - 3 categories",
    "Psychometric test (20 q)",
    "Marksheet upload + OCR (Tesseract flow)",
    "Skill checklist (50+)",
  ];

  const premiumFeatureBullets = [
    "Unlimited Skill Verification",
    "Detailed AI analysis & PDF report",
    "Interactive Career Roadmap (visualizer)",
    "Learning tracker with analytics",
    "AI Mentor (RAG-powered)",
    "Peer comparison analytics",
    "Job & internship recommendations",
  ];

  // Example "Free dashboard" stats (mock)
  const stats = {
    progressPercent: 45,
    testsTaken: 2,
    testsTotal: 3,
    skillsVerified: 4,
    skillsTotal: 10,
    aiSuggestion: "Data Analytics",
  };

  // Psychometric (mock Big Five values 0-100)
  const psych = {
    openness: 72,
    conscientiousness: 63,
    extraversion: 38,
    agreeableness: 55,
    neuroticism: 28,
    label: "Analytical Thinker",
  };

  // Marksheet OCR sample (mock)
  const marksheet = {
    subjects: [
      { name: "Mathematics", marks: 92 },
      { name: "Physics", marks: 88 },
      { name: "Chemistry", marks: 80 },
      { name: "English", marks: 76 },
    ],
    topSubjects: ["Mathematics", "Physics"],
    recommendedFields: ["Engineering", "Data Science", "Research"],
  };

  // Learning tracker mock (weekly hours)
  const learningTracker = [
    { week: "W1", hours: 4 },
    { week: "W2", hours: 6 },
    { week: "W3", hours: 8 },
    { week: "W4", hours: 10 },
  ];

  // Career roadmap sample nodes
  const roadmap = [
    { id: 1, title: "Start: Basics (Python, SQL)", eta: "1-2 months", difficulty: "Easy" },
    { id: 2, title: "Entry: Data Analyst", eta: "3-6 months", difficulty: "Medium" },
    { id: 3, title: "Mid: ML Engineer basics (ML, Stats)", eta: "1-2 years", difficulty: "Hard" },
    { id: 4, title: "Senior: Lead / Research", eta: "3-5 years", difficulty: "Very Hard" },
  ];

  // Job recommendations mock
  const jobs = [
    { title: "Data Analyst - TCS", location: "Bengaluru", salary: "3-6 LPA" },
    { title: "Intern - Data Science", location: "Remote", salary: "Unpaid/ Stipend" },
    { title: "Junior ML Engineer - Startup", location: "Hyderabad", salary: "6-10 LPA" },
  ];

  // helper: progress bar
  const ProgressBar = ({ value = 0 }) => (
    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-3 bg-gradient-to-r from-indigo-500 to-purple-500"
      />
    </div>
  );

  // small animated stat box
  const StatBox = ({ label, value, suffix }) => (
    <motion.div whileHover={{ y: -6 }} className="p-4 rounded-2xl bg-white/90 dark:bg-gray-800/60 border dark:border-gray-700 shadow-sm">
      <div className="text-sm text-gray-500 dark:text-gray-300">{label}</div>
      <div className="text-2xl font-bold mt-1">{value}{suffix}</div>
    </motion.div>
  );

  // card variants
  const card = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  // ensure user defaults
  const displayUser = user ?? { name: "Guest", email: "", plan: "free" };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "bg-gray-950 text-gray-100" : "bg-slate-50 text-gray-900"}`}>

      {/* NAV */}
      <header className={`sticky top-0 z-40 backdrop-blur-md ${darkMode ? "bg-gray-900/70" : "bg-white/80"} border-b`}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-indigo-500" />
            <div>
              <div className="text-lg font-bold">MindStep</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">AI-powered career guidance</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm mr-2 hidden sm:block">
              <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Signed in as</span>
              <span className="font-medium">{displayUser.name || displayUser.email || "Guest"}</span>
            </div>

            <button
              onClick={() => { const next = !darkMode; setDarkMode(next); }}
              className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:scale-105 transition"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* upgrade / plan badge */}
            <div className={`px-3 py-2 rounded-lg text-sm font-semibold ${displayUser.plan === "premium" ? "bg-yellow-400 text-gray-900" : "bg-indigo-50 text-indigo-700"}`}>
              {displayUser.plan === "premium" ? "Premium" : "Free"}
            </div>

            <button onClick={logout} title="Logout" className="ml-2 px-3 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white flex items-center gap-2 hover:scale-105 transition">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* Top row: Free dashboard summary + stats */}
        <section className="grid lg:grid-cols-3 gap-6">
          {/* Summary card */}
          <motion.div variants={card} initial="hidden" animate="show" className="p-6 rounded-2xl bg-white/90 dark:bg-gray-800/60 border dark:border-gray-700 shadow-lg">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-300">Welcome back,</div>
                <div className="text-2xl font-bold">{displayUser.name || "Learner"}</div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Your Progress: <strong>{stats.progressPercent}%</strong> Complete</div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="text-xs text-gray-500 dark:text-gray-300">Plan</div>
                <div className={`px-3 py-1 rounded-full font-semibold ${displayUser.plan === "premium" ? "bg-yellow-400 text-gray-900" : "bg-indigo-50 text-indigo-700"}`}>
                  {displayUser.plan === "premium" ? "Premium" : "Free"}
                </div>
              </div>
            </div>

            {/* small dashboard box */}
            <div className="mt-4 grid grid-cols-1 gap-3">
              <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Tests Taken</div>
                  <div className="font-semibold">{stats.testsTaken}/{stats.testsTotal}</div>
                </div>
                <div className="mt-2">
                  <ProgressBar value={(stats.testsTaken / stats.testsTotal) * 100} />
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900/40 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-300">Skills Verified</div>
                  <div className="font-semibold">{stats.skillsVerified}/{stats.skillsTotal}</div>
                </div>
                <div className="mt-2">
                  <ProgressBar value={(stats.skillsVerified / stats.skillsTotal) * 100} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-300">AI Suggestion</div>
                <div className="font-semibold text-indigo-600 dark:text-indigo-300">{stats.aiSuggestion}</div>
              </div>

              <div className="mt-3 flex gap-3">
                <button onClick={() => alert("Take next test (demo)")} className="flex-1 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:scale-102 transition">Take Next Test</button>
                <button onClick={upgradeToPremium} className="flex-1 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold hover:scale-102 transition">Upgrade to Pro</button>
              </div>
            </div>
          </motion.div>

          {/* Stats boxes */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatBox label="Progress" value={`${stats.progressPercent}`} suffix="%" />
            <StatBox label="Tests" value={`${stats.testsTaken}/${stats.testsTotal}`} />
            <StatBox label="Verified Skills" value={`${stats.skillsVerified}`} />
            <StatBox label="AI Suggestion" value={stats.aiSuggestion} />
          </div>
        </section>

        {/* Middle row: Skill tests + Psychometric + Marksheet OCR */}
        <section className="grid lg:grid-cols-3 gap-6">
          {/* Skill Test summary */}
          <motion.div variants={card} initial="hidden" animate="show" className="p-6 rounded-2xl bg-white/90 dark:bg-gray-800/60 border dark:border-gray-700 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-300">Skill Tests (Enhanced)</div>
                <div className="text-lg font-bold">3 Categories • Verification</div>
              </div>
              <div className="text-xs text-gray-500">Scoring system inside</div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-semibold">A. Technical Skills</div>
              <div className="text-sm text-gray-600">Programming, Tools, Mini-quiz verification</div>

              <div className="text-sm font-semibold mt-3">B. Soft Skills</div>
              <div className="text-sm text-gray-600">Communication, Leadership — scenario based</div>

              <div className="text-sm font-semibold mt-3">C. Aptitude</div>
              <div className="text-sm text-gray-600">Logical reasoning, Quantitative ability</div>

              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900/40 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Scoring rules</div>
                <ul className="text-sm list-disc ml-5 space-y-1">
                  <li>Self-claimed (not verified) = 30% weight</li>
                  <li>Verified skill = 100% weight</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Psychometric */}
          <motion.div variants={card} initial="hidden" animate="show" className="p-6 rounded-2xl bg-white/90 dark:bg-gray-800/60 border dark:border-gray-700 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-300">Psychometric (Big Five)</div>
                <div className="text-lg font-bold">{psych.label}</div>
              </div>
              <div className="text-xs text-gray-500">20 questions (basic)</div>
            </div>

            <div className="space-y-2">
              {[
                ["Openness", psych.openness],
                ["Conscientiousness", psych.conscientiousness],
                ["Extraversion", psych.extraversion],
                ["Agreeableness", psych.agreeableness],
                ["Neuroticism", psych.neuroticism],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="flex justify-between text-sm">
                    <div className="font-medium">{k}</div>
                    <div className="text-xs text-gray-500">{v}%</div>
                  </div>
                  <div className="mt-1">
                    <ProgressBar value={v} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Marksheet / OCR */}
          <motion.div variants={card} initial="hidden" animate="show" className="p-6 rounded-2xl bg-white/90 dark:bg-gray-800/60 border dark:border-gray-700 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-300">Marksheet Upload + OCR</div>
                <div className="text-lg font-bold">Academic Strength</div>
              </div>
              <div className="text-xs text-gray-500">Tesseract pipeline (backend)</div>
            </div>

            <div className="space-y-3">
              {marksheet.subjects.map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <div className="text-sm">{s.name}</div>
                  <div className="text-sm font-semibold">{s.marks}%</div>
                </div>
              ))}

              <div className="mt-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/40">
                <div className="text-sm text-gray-600">Top subjects: {marksheet.topSubjects.join(", ")}</div>
                <div className="text-sm text-gray-600 mt-1">Recommended fields: {marksheet.recommendedFields.join(", ")}</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Upgrade comparison table */}
        <section className="p-6 rounded-2xl bg-white/90 dark:bg-gray-800/60 border dark:border-gray-700 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Upgrade to Premium — Features Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="py-2">Feature</th>
                  <th className="py-2 text-center">Free</th>
                  <th className="py-2 text-center">Premium (₹99)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Basic Tests", true, true],
                  ["AI Career Suggestions", "3 options", "Detailed recommendations"],
                  ["Skill Verification", "5 skills", "Unlimited"],
                  ["Career Roadmap", false, true],
                  ["PDF Report", false, true],
                  ["Learning Tracker", false, true],
                  ["AI Mentor Chat", false, true],
                  ["Peer Comparison", false, true],
                  ["Job Recommendations", false, true],
                ].map((row, i) => (
                  <tr key={i} className={`${i % 2 ? "bg-gray-50 dark:bg-gray-900/30" : ""}`}>
                    <td className="py-3">{row[0]}</td>
                    <td className="py-3 text-center">{String(row[1])}</td>
                    <td className="py-3 text-center">{String(row[2])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button onClick={() => alert("Start Free (demo)")} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold">Start Free</button>
            <button onClick={upgradeToPremium} className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 font-semibold">{displayUser.plan === "premium" ? "Already Premium" : "Upgrade Now - ₹99"}</button>
            <button onClick={() => alert("Payment flow (demo)")} className="px-4 py-2 rounded-lg border">How Payment Works</button>
          </div>
        </section>

        {/* Premium area - show/hide locked overlays */}
        <section className="grid lg:grid-cols-2 gap-6">
          {/* Premium Dashboard preview */}
          <motion.div variants={card} initial="hidden" animate="show" className="p-6 rounded-2xl bg-white/90 dark:bg-gray-800/60 border dark:border-gray-700 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-300">Premium Dashboard (Preview)</div>
                <div className="text-2xl font-bold">Career Match Score</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Top match</div>
                <div className="text-xl font-bold text-indigo-600">Data Science • 87%</div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/40">
                <div className="text-sm text-gray-600">Profile Analysis</div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div className="text-xs text-gray-500">Skills</div>
                  <div className="font-semibold">8/10 verified</div>

                  <div className="text-xs text-gray-500">Personality</div>
                  <div className="font-semibold">{psych.label}</div>

                  <div className="text-xs text-gray-500">Academic Strength</div>
                  <div className="font-semibold">Analytical</div>

                  <div className="text-xs text-gray-500">Actions</div>
                  <div className="flex gap-2">
                    <button onClick={() => alert("View Roadmap (demo)")} className="px-3 py-1 bg-indigo-600 text-white rounded">View Roadmap</button>
                    <button onClick={() => alert("Ask AI mentor (demo)")} className="px-3 py-1 border rounded">Ask Mentor</button>
                  </div>
                </div>
              </div>

              {/* Career Roadmap mini-visualizer */}
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-600">Interactive Career Path (mini)</div>
                  <div className="text-xs text-gray-500">Click nodes</div>
                </div>

                <div className="space-y-3">
                  {roadmap.map((node, idx) => (
                    <motion.div key={node.id} whileHover={{ scale: 1.02 }} className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${idx % 2 === 0 ? "bg-indigo-600 text-white" : "bg-yellow-400 text-gray-900"}`}>
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{node.title}</div>
                        <div className="text-xs text-gray-500">{node.eta} • {node.difficulty}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* locked overlay if not premium */}
            <AnimatePresence>
              {displayUser.plan !== "premium" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.95 }} exit={{ opacity: 0 }} className="absolute inset-0 z-30 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white space-y-3">
                    <Lock className="mx-auto w-10 h-10" />
                    <div className="text-lg font-semibold">Premium Content Locked</div>
                    <div className="text-sm">Upgrade to access interactive roadmap, analytics & mentor chat</div>
                    <div className="mt-3 flex justify-center gap-3">
                      <button onClick={upgradeToPremium} className="px-4 py-2 rounded bg-yellow-400 text-gray-900 font-semibold">Upgrade Now</button>
                      <button onClick={() => alert("Learn more (demo)")} className="px-4 py-2 rounded border">Learn more</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Learning tracker / AI Mentor / Jobs */}
          <motion.div variants={card} initial="hidden" animate="show" className="p-6 rounded-2xl bg-white/90 dark:bg-gray-800/60 border dark:border-gray-700 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-300">Learning Tracker</div>
                <div className="text-lg font-bold">Weekly Time Spent</div>
              </div>
              <div className="text-sm text-gray-500">Last 4 weeks</div>
            </div>

            {/* small bar chart */}
            <div className="flex items-end gap-3 h-36 mb-4">
              {learningTracker.map((w, i) => {
                const max = 12;
                const heightPct = (w.hours / max) * 100;
                return (
                  <div key={w.week} className="flex-1 flex flex-col items-center">
                    <motion.div initial={{ height: 0 }} animate={{ height: `${heightPct}%` }} transition={{ duration: 0.8 }} className="w-full rounded-t bg-gradient-to-br from-indigo-500 to-purple-500" />
                    <div className="text-xs mt-2">{w.week}</div>
                    <div className="text-xs text-gray-500">{w.hours}h</div>
                  </div>
                );
              })}
            </div>

            {/* AI Mentor placeholder */}
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/40 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">AI Mentor (Demo)</div>
                <div className="text-xs text-gray-500">RAG-powered in full product</div>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg h-28 overflow-auto">
                <div className="text-sm text-gray-600">AI Mentor: "Hi! Ask me what to learn next for Data Science."</div>
              </div>
              <div className="mt-3 flex gap-2">
                <input placeholder="Ask a question (demo)" className="flex-1 px-3 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900/60" />
                <button onClick={() => alert("AI reply (demo)")} className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Send</button>
              </div>
            </div>

            {/* Jobs */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">Job Recommendations</div>
                <div className="text-xs text-gray-500">Daily curated</div>
              </div>

              <div className="space-y-2">
                {jobs.map((j, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white/70 dark:bg-gray-900/50 border dark:border-gray-700 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{j.title}</div>
                      <div className="text-xs text-gray-500">{j.location} • {j.salary}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button onClick={() => alert("One-click apply (demo)")} className="px-3 py-1 rounded bg-indigo-600 text-white text-sm">Apply</button>
                      <button onClick={() => alert("Save job (demo)")} className="px-3 py-1 rounded border text-sm">Save</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </section>

        {/* Peer comparison (mock) */}
        <section className="p-6 rounded-2xl bg-white/90 dark:bg-gray-800/60 border dark:border-gray-700 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-gray-500">Peer Comparison Analytics</div>
              <div className="text-lg font-bold">Top 10% Insights</div>
            </div>
            <div className="text-sm text-gray-500">Anonymized</div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/40">
              <div className="text-xs text-gray-500">Top students: verified skills</div>
              <div className="text-2xl font-bold mt-2">12+</div>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/40">
              <div className="text-xs text-gray-500">Avg placement companies</div>
              <div className="text-2xl font-bold mt-2">TCS, Accenture, Infosys</div>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/40">
              <div className="text-xs text-gray-500">Improve by following</div>
              <div className="text-2xl font-bold mt-2">Projects + Verified skills</div>
            </div>
          </div>
        </section>

        <footer className="text-center py-6 text-sm opacity-80">
          © {new Date().getFullYear()} MindStep — Demo UI. Payment & AI features are mock/demo only.
        </footer>

      </main>
    </div>
  );
}

/* -------------------------
   Small helper icons (inline to avoid extra imports)
   You can replace these with lucide-react icons if you prefer.
   ------------------------- */
function SunIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m8.66-10h-2M5.34 12H3m15.07 7.07l-1.41-1.41M7.05 7.05 5.64 5.64M18.36 5.64l-1.41 1.41M6.34 18.36l-1.41-1.41M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

/* Small components used above (redeclared for standalone file) */
function ProgressBar({ value = 0 }) {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
      <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.9 }} className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
    </div>
  );
}
function StatBox({ label, value, suffix }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="p-4 rounded-2xl bg-white/90 dark:bg-gray-800/60 border dark:border-gray-700 shadow-sm">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-xl font-bold mt-1">{value}{suffix ? suffix : ""}</div>
    </motion.div>
  );
}
