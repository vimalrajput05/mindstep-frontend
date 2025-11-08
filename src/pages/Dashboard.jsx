// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Crown, Lock, LogOut, Target, CheckCircle, Star, Gift, ShieldCheck,
  BookOpen, Users, Briefcase, TrendingUp, Sun, Moon, Activity, DownloadCloud, X
} from "lucide-react";

/**
 * Dashboard.jsx
 * - Single-file interactive dashboard (demo / drop-in)
 * - Dark mode, role-aware (admin), premium-lock overlays
 * - Framer Motion animations + responsive Tailwind layout
 *
 * Usage:
 * - Keep in routes: <Route path="/dashboard" element={<Dashboard />} />
 * - Fake login example:
 *    localStorage.setItem('user', JSON.stringify({ name: 'Rahul', email: 'r@ex.com', plan: 'free', role: 'user', loggedAt: Date.now() }))
 *
 * Replace mock data / handlers with real API calls later.
 */

export default function Dashboard() {
  const navigate = useNavigate();

  // Load user from localStorage (fake auth)
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  });

  // Dark mode state (persist in localStorage)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Local UI states
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [busy, setBusy] = useState(false);

  // Sync dark mode to root class & localStorage
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
  }, [darkMode]);

  // If not logged, redirect to auth page
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Helpers
  const displayUser = user ?? { name: "Guest", email: "", plan: "free", role: "user" };
  const isAdmin = displayUser.role === "admin" || displayUser.plan === "admin";
  const isPremium = displayUser.plan === "premium" || isAdmin;

  // ---------- MOCKED DATA ----------
  const stats = {
    progressPercent: 45,
    testsTaken: 2,
    testsTotal: 3,
    skillsVerified: 4,
    skillsTotal: 10,
    aiSuggestion: "Data Analytics",
  };

  const psych = {
    openness: 72,
    conscientiousness: 63,
    extraversion: 38,
    agreeableness: 55,
    neuroticism: 28,
    label: "Analytical Thinker",
  };

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

  const learningTracker = [
    { week: "W1", hours: 4 },
    { week: "W2", hours: 6 },
    { week: "W3", hours: 8 },
    { week: "W4", hours: 10 },
  ];

  const roadmap = [
    { id: 1, title: "Basics — Python, SQL", eta: "1-2 months", difficulty: "Easy" },
    { id: 2, title: "Entry — Data Analyst", eta: "3-6 months", difficulty: "Medium" },
    { id: 3, title: "Mid — Machine Learning", eta: "1-2 years", difficulty: "Hard" },
    { id: 4, title: "Senior — Lead / Research", eta: "3-5 years", difficulty: "Very Hard" },
  ];

  const jobs = [
    { title: "Data Analyst - TCS", location: "Bengaluru", salary: "3-6 LPA" },
    { title: "Intern - Data Science", location: "Remote", salary: "Stipend" },
    { title: "Junior ML Engineer - Startup", location: "Hyderabad", salary: "6-10 LPA" },
  ];

  // ---------- UI COMPONENTS ----------
  const ProgressBar = ({ value = 0, h = 8 }) => (
    <div className={`w-full bg-gray-200 dark:bg-gray-800 rounded-full h-${h} overflow-hidden`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
      />
    </div>
  );

  const StatCard = ({ label, value, hint, icon: Icon, colorClass = "from-indigo-500 to-purple-500" }) => (
    <motion.div whileHover={{ y: -6 }} className={`p-4 rounded-2xl bg-white dark:bg-gray-800/60 border dark:border-gray-700 shadow-sm`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-300">{label}</div>
          <div className="text-xl font-bold mt-1">{value}</div>
          {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
        </div>
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </motion.div>
  );

  // ---------- ACTIONS ----------
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/auth");
  };

  // Fake upgrade flow (demo)
  const upgradeToPremium = async () => {
    if (!user) return;
    setBusy(true);
    // simulate payment delay
    await new Promise((r) => setTimeout(r, 900));
    const upgraded = { ...user, plan: "premium", upgradedAt: Date.now() };
    localStorage.setItem("user", JSON.stringify(upgraded));
    setUser(upgraded);
    setBusy(false);
    setShowUpgradeModal(false);
  };

  // "Admin reveal" utility: if admin wants to view as a student, we can simulate.
  const [viewAs, setViewAs] = useState("self"); // self | student
  useEffect(() => {
    // keep viewAs in session only
  }, [viewAs]);

  // ---------- ANIMATIONS ----------
  const fadeIn = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

  // ---------- RENDER ----------
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-950 text-gray-100" : "bg-slate-50 text-gray-900"}`}>
      {/* NAV */}
      <header className={`sticky top-0 z-50 backdrop-blur-md ${darkMode ? "bg-gray-900/70 border-b border-gray-800" : "bg-white/80 border-b border-gray-200"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold">MindStep</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">AI Career Guidance</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* quick identity & plan */}
            <div className="hidden sm:flex sm:flex-col text-right mr-3">
              <div className="text-sm font-medium">{displayUser.name || displayUser.email || "Guest"}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{displayUser.email || "—"}</div>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:scale-105 transition"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className={`px-3 py-1 rounded-lg text-sm font-semibold ${isPremium ? "bg-yellow-400 text-gray-900" : "bg-indigo-50 text-indigo-700"}`}>
              {isAdmin ? "Admin" : isPremium ? "Premium" : "Free"}
            </div>

            <button
              onClick={logout}
              className="ml-2 px-3 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold flex items-center gap-2 hover:scale-105 transition"
            >
              <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.06 } } }} className="space-y-8">

          {/* HERO / WELCOME */}
          <motion.section variants={fadeIn} className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900/60 border-gray-800" : "bg-white border-gray-200"} border shadow-lg`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Welcome back, <span className="text-indigo-500">{displayUser.name || "Learner"}</span> 👋</h1>
                <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">Track progress, run tests, and follow a personalized career roadmap.</p>
                <div className="mt-4 max-w-xl">
                  <ProgressBar value={stats.progressPercent} h={3} />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => alert("Take next test (demo)")}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition"
                >
                  <Target className="w-4 h-4 inline mr-2" /> Take Next Test
                </button>

                {!isPremium && (
                  <button
                    onClick={() => setShowUpgradeModal(true)}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-bold shadow-lg hover:scale-105 transition"
                  >
                    <Crown className="w-4 h-4 inline mr-2" /> Upgrade
                  </button>
                )}
              </div>
            </div>
          </motion.section>

          {/* TOP STATS */}
          <motion.section variants={fadeIn} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Progress" value={`${stats.progressPercent}%`} hint="Overall completion" icon={TrendingUp} colorClass="from-indigo-500 to-purple-500" />
            <StatCard label="Tests Taken" value={`${stats.testsTaken}/${stats.testsTotal}`} hint="Skill tests" icon={CheckCircle} colorClass="from-green-500 to-emerald-500" />
            <StatCard label="Skills Verified" value={`${stats.skillsVerified}/${stats.skillsTotal}`} hint="Verified skills" icon={Star} colorClass="from-blue-500 to-cyan-500" />
            <StatCard label="AI Suggestion" value={stats.aiSuggestion} hint="Top recommendation" icon={Sparkles} colorClass="from-purple-500 to-pink-500" />
          </motion.section>

          {/* THREE-COLUMN: Tests / Psych / Marksheet */}
          <motion.section variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Skill Tests */}
            <motion.article variants={fadeIn} whileHover={{ y: -6 }} className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900/60 border-gray-800" : "bg-white border-gray-200"} border shadow-lg`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Skill Tests</div>
                    <div className="text-lg font-bold">3 Categories • Verification</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">Auto scoring</div>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-semibold">A. Technical</div>
                  <div className="text-gray-500 dark:text-gray-400">Programming, Tools (MCQ verify)</div>
                </div>
                <div>
                  <div className="font-semibold">B. Soft Skills</div>
                  <div className="text-gray-500 dark:text-gray-400">Communication & scenarios</div>
                </div>
                <div>
                  <div className="font-semibold">C. Aptitude</div>
                  <div className="text-gray-500 dark:text-gray-400">Reasoning & quantitative</div>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
  <button
    onClick={() => navigate("/skilltest")}
    className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
  >
    Start Test
  </button>
  <button
    onClick={() => navigate("/skilltest")}
    className="px-4 py-2 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 transition"
  >
    View
  </button>
</div>

            </motion.article>

            {/* Psychometric */}
            <motion.article variants={fadeIn} whileHover={{ y: -6 }} className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900/60 border-gray-800" : "bg-white border-gray-200"} border shadow-lg`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Psychometric</div>
                    <div className="text-lg font-bold">{psych.label}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">20 Q • Quick</div>
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
                      <ProgressBar value={v} h={2} />
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate("/psychometric")} className="px-4 ml-70 mt-5 py-2 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 transition">
  Start
</button>

            </motion.article>

            {/* Marksheet OCR */}
            <motion.article variants={fadeIn} whileHover={{ y: -6 }} className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900/60 border-gray-800" : "bg-white border-gray-200"} border shadow-lg`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Marksheet OCR</div>
                    <div className="text-lg font-bold">Academic Strength</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">Tesseract pipeline</div>
              </div>

              <div className="space-y-2 text-sm">
                {marksheet.subjects.map((s) => (
                  <div key={s.name} className="flex justify-between">
                    <div>{s.name}</div>
                    <div className="font-semibold text-indigo-600">{s.marks}%</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-xs bg-gray-50 dark:bg-gray-900/40 p-3 rounded-lg">
                <div>Top subjects: <strong>{marksheet.topSubjects.join(", ")}</strong></div>
                <div className="mt-1">Recommended fields: {marksheet.recommendedFields.join(", ")}</div>
              </div>
            </motion.article>
          </motion.section>

          {/* PREMIUM: Roadmap & Learning (locked for non-premium) */}
          <motion.section variants={fadeIn} className="grid lg:grid-cols-2 gap-6">
            <motion.div className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900/60 border-gray-800" : "bg-white border-gray-200"} border shadow-lg relative`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Interactive Career Roadmap</h3>
                <div className="text-xs text-gray-500">Click nodes to expand</div>
              </div>

              <div className="space-y-3">
                {roadmap.map((node, idx) => (
                  <motion.div key={node.id} whileHover={{ scale: 1.02 }} className={`flex items-center gap-3 p-3 rounded-xl ${darkMode ? "bg-gray-900/50" : "bg-gray-50"}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${idx % 2 === 0 ? "bg-indigo-600 text-white" : "bg-yellow-400 text-gray-900"} font-bold`}>
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{node.title}</div>
                      <div className="text-xs text-gray-500">{node.eta} • {node.difficulty}</div>
                    </div>
                    <button onClick={() => alert("Open node detail (demo)")} className="px-3 py-1 rounded-lg border text-sm">Open</button>
                  </motion.div>
                ))}
              </div>

              {/* LOCK overlay for non-premium & non-admin */}
              <AnimatePresence>
                {!isPremium && !isAdmin && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.95 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center z-20">
                    <div className="text-center text-white p-6">
                      <Lock className="mx-auto mb-3 w-10 h-10" />
                      <div className="text-xl font-bold mb-1">Premium Feature</div>
                      <div className="text-sm mb-4">Interactive roadmap is available for Premium users only.</div>
                      <div className="flex gap-3 justify-center">
                        <button onClick={() => setShowUpgradeModal(true)} className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg font-semibold">Upgrade</button>
                        <button onClick={() => alert("Demo preview (read-only)")} className="px-4 py-2 border rounded-lg">Preview</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900/60 border-gray-800" : "bg-white border-gray-200"} border shadow-lg`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Weekly Learning Tracker</h3>
                <div className="text-xs text-gray-500">Last 4 weeks</div>
              </div>

              <div className="flex items-end gap-3 h-40 mb-4">
                {learningTracker.map((w, i) => {
                  const max = 12;
                  const heightPct = (w.hours / max) * 100;
                  return (
                    <div key={w.week} className="flex-1 flex flex-col items-center">
                      <motion.div initial={{ height: 0 }} animate={{ height: `${heightPct}%` }} transition={{ duration: 0.8, delay: i * 0.08 }} className="w-full rounded-t-xl bg-gradient-to-t from-indigo-500 to-purple-500" />
                      <div className="text-xs mt-2">{w.week}</div>
                      <div className="text-xs text-gray-500">{w.hours}h</div>
                    </div>
                  );
                })}
              </div>

              <div>
                <h4 className="font-semibold mb-2">AI Mentor (Demo)</h4>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/40 mb-3">
                  <div className="text-sm text-gray-600">AI Mentor: "Try asking 'What should I learn next for Data Science?'"</div>
                </div>
                <div className="flex gap-2">
                  <input placeholder="Ask a question (demo)" className="flex-1 px-3 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900/60" />
                  <button onClick={() => alert("AI reply (demo)")} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Send</button>
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* JOBS & PEER COMPARISON */}
          <motion.section variants={fadeIn} className="grid md:grid-cols-3 gap-6">
            <motion.div className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900/60 border-gray-800" : "bg-white border-gray-200"} border shadow-lg md:col-span-2`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Job Recommendations</h3>
                <div className="text-xs text-gray-500">Tailored for you</div>
              </div>

              <div className="space-y-3">
                {jobs.map((j, idx) => (
                  <motion.div key={idx} whileHover={{ scale: 1.02 }} className={`p-3 rounded-lg ${darkMode ? "bg-gray-900/50" : "bg-gray-50"} flex items-center justify-between`}>
                    <div>
                      <div className="font-semibold">{j.title}</div>
                      <div className="text-xs text-gray-500">{j.location} • {j.salary}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="px-3 py-1 bg-indigo-600 text-white rounded text-xs" onClick={() => alert("Apply (demo)")}>Apply</button>
                      <button className="px-3 py-1 border rounded text-xs" onClick={() => alert("Save job (demo)")}>Save</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div className={`p-6 rounded-2xl ${darkMode ? "bg-gray-900/60 border-gray-800" : "bg-white border-gray-200"} border shadow-lg`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Peer Insights</h3>
                <div className="text-xs text-gray-500">Top 10%</div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/40">
                  <div className="text-xs text-gray-500">Verified skills (top)</div>
                  <div className="text-2xl font-bold">12+</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/40">
                  <div className="text-xs text-gray-500">Avg placement</div>
                  <div className="text-2xl font-bold">TCS, Accenture, Infosys</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/40">
                  <div className="text-xs text-gray-500">Improve by</div>
                  <div className="text-2xl font-bold">Projects + Verified skills</div>
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* FOOTER */}
          <motion.footer variants={fadeIn} className="text-center py-6 text-sm text-gray-500">
            © {new Date().getFullYear()} MindStep — Demo UI. Replace mocks with real data & payment integration.
          </motion.footer>
        </motion.div>
      </main>

      {/* UPGRADE MODAL */}
      <AnimatePresence>
        {showUpgradeModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowUpgradeModal(false)} />
            <motion.div initial={{ y: 40, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 40, opacity: 0 }} className="relative z-10 w-full max-w-xl p-6 rounded-2xl bg-white dark:bg-gray-900/80 border dark:border-gray-800 shadow-2xl">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-300">Upgrade to Premium</div>
                  <h3 className="text-2xl font-bold">Get lifetime access — ₹99</h3>
                  <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">Unlock interactive roadmap, PDF reports, unlimited verifications & more.</p>

                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Unlimited skill verification</li>
                    <li className="flex items-center gap-2"><DownloadCloud className="w-4 h-4 text-indigo-500" /> Downloadable PDF report</li>
                    <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-yellow-500" /> AI mentor access</li>
                  </ul>
                </div>

                <button onClick={() => setShowUpgradeModal(false)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button onClick={upgradeToPremium} disabled={busy} className={`px-5 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-bold shadow-lg ${busy ? "opacity-60" : "hover:scale-105"}`}>
                  {busy ? "Processing..." : "Pay ₹99 & Upgrade"}
                </button>
                <button onClick={() => alert("Learn payment (demo)")} className="px-4 py-3 rounded-xl border">How payment works</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------- Notes --------------
- Replace alerts with proper modals / API calls.
- Use real payment integration (Razorpay / Stripe) in upgradeToPremium.
- Connect to backend for real user/session storage and secure routes.
- This single-file is intentionally self-contained for quick copy-paste.
------------------------------------- */
