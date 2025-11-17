// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   ArrowLeft,
//   Moon,
//   Sun,
//   Users,
//   Award,
//   TrendingUp,
//   BarChart3,
//   Star,
//   Brain,
//   ChartLine,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";

// export default function PeerInsights() {
//   const [darkMode, setDarkMode] = useState(false);

//   const scoreTrend = [
//     { month: "Jan", score: 62 },
//     { month: "Feb", score: 70 },
//     { month: "Mar", score: 74 },
//     { month: "Apr", score: 80 },
//     { month: "May", score: 83 },
//   ];

//   const skillComparison = [
//     { skill: "Technical", you: 78, peers: 65 },
//     { skill: "Aptitude", you: 72, peers: 60 },
//     { skill: "Soft Skills", you: 69, peers: 70 },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className={`min-h-screen p-6 ${
//         darkMode ? "bg-black text-white" : "bg-gray-100 text-gray-900"
//       }`}
//     >
//       {/* Top Bar */}
//       <div className="flex items-center justify-between mb-6">
//         <Link
//           to="/dashboard"
//           className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-white dark:bg-gray-900 hover:bg-gray-200"
//         >
//           <ArrowLeft className="w-5 h-5" /> Back
//         </Link>

//         <h1 className="text-2xl font-bold flex items-center gap-2">
//           <Users className="text-purple-500 w-6 h-6" /> Peer Insights
//         </h1>

//         {/* Dark mode toggle */}
//         <button
//           onClick={() => setDarkMode(!darkMode)}
//           className="p-3 rounded-xl bg-white dark:bg-gray-900 shadow"
//         >
//           {darkMode ? (
//             <Sun className="text-yellow-400" />
//           ) : (
//             <Moon className="text-gray-700" />
//           )}
//         </button>
//       </div>

//       {/* Stats Row */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         {/* Rank */}
//         <motion.div
//           whileHover={{ scale: 1.03 }}
//           className="p-5 rounded-2xl bg-white dark:bg-gray-900 shadow"
//         >
//           <div className="text-sm text-gray-500">Overall Ranking</div>
//           <div className="text-3xl font-bold flex items-center gap-2">
//             Top 10% <Award className="text-yellow-400 w-6 h-6" />
//           </div>
//         </motion.div>

//         {/* Company placements */}
//         <motion.div
//           whileHover={{ scale: 1.03 }}
//           className="p-5 rounded-2xl bg-white dark:bg-gray-900 shadow"
//         >
//           <div className="text-sm text-gray-500">Top Recruiters</div>
//           <div className="font-bold text-lg">
//             TCS, Accenture, Infosys, Wipro
//           </div>
//         </motion.div>

//         {/* Performance */}
//         <motion.div
//           whileHover={{ scale: 1.03 }}
//           className="p-5 rounded-2xl bg-white dark:bg-gray-900 shadow"
//         >
//           <div className="text-sm text-gray-500">You Outperformed</div>
//           <div className="text-3xl font-bold flex items-center gap-2">
//             85% <TrendingUp className="text-green-500 w-6 h-6" />
//           </div>
//         </motion.div>
//       </div>

//       {/* Line Chart */}
//       <motion.div
//         initial={{ scale: 0.97 }}
//         animate={{ scale: 1 }}
//         className="p-6 rounded-2xl bg-white dark:bg-gray-900 shadow mb-6"
//       >
//         <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
//           <ChartLine className="text-blue-500 w-5 h-5" /> Growth Trend
//         </h2>

//         <ResponsiveContainer width="100%" height={250}>
//           <LineChart data={scoreTrend}>
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Line type="monotone" dataKey="score" strokeWidth={3} />
//           </LineChart>
//         </ResponsiveContainer>
//       </motion.div>

//       {/* Bar Chart */}
//       <motion.div
//         initial={{ scale: 0.97 }}
//         animate={{ scale: 1 }}
//         className="p-6 rounded-2xl bg-white dark:bg-gray-900 shadow mb-6"
//       >
//         <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
//           <BarChart3 className="text-orange-500 w-5 h-5" /> Skill Comparison
//         </h2>

//         <ResponsiveContainer width="100%" height={260}>
//           <BarChart data={skillComparison}>
//             <XAxis dataKey="skill" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="you" />
//             <Bar dataKey="peers" />
//           </BarChart>
//         </ResponsiveContainer>
//       </motion.div>

//       {/* Recommendations */}
//       <motion.div
//         initial={{ scale: 0.97 }}
//         animate={{ scale: 1 }}
//         className="p-6 rounded-2xl bg-white dark:bg-gray-900 shadow"
//       >
//         <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//           <Brain className="text-purple-500 w-5 h-5" /> Personalized Suggestions
//         </h2>

//         <ul className="space-y-3">
//           <li className="flex items-start gap-3">
//             <Star className="text-yellow-400 w-5 h-5" />
//             Build 2 new technical projects to boost your ranking.
//           </li>
//           <li className="flex items-start gap-3">
//             <Star className="text-yellow-400 w-5 h-5" />
//             Practice 30 aptitude problems weekly for best results.
//           </li>
//           <li className="flex items-start gap-3">
//             <Star className="text-yellow-400 w-5 h-5" />
//             Give mock interviews to strengthen communication skills.
//           </li>
//         </ul>
//       </motion.div>
//     </motion.div>
//   );
// }










import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function FireDon() {
  const navigate = useNavigate();

  // Random position helper
  const randomPos = (max) => Math.random() * max;

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black"
    >
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 
                   bg-white/10 hover:bg-white/20 text-white 
                   rounded-xl border border-white/20 backdrop-blur-md 
                   transition-all duration-300"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      {/* Floating Danger Icons with random flicker */}
      {["⚠️", "☠️", "🔺", "🔥"].map((icon, i) => (
        <motion.div
          key={i}
          initial={{ y: 800, x: randomPos(1200), scale: 0.5 }}
          animate={{ 
            y: -200, 
            rotate: 360, 
            scale: [0.5, 1.2, 0.8] 
          }}
          transition={{
            duration: 5 + i * 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute text-4xl opacity-60"
        >
          {icon}
        </motion.div>
      ))}

      {/* Fast Bullet animations */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: -300 }}
          animate={{ x: 1600 }}
          transition={{
            duration: 0.6 + Math.random() * 0.6,
            repeat: Infinity,
            repeatDelay: Math.random() * 1,
          }}
          className="absolute h-[4px] w-[220px] bg-red-600 shadow-[0_0_20px_red] rounded-full"
          style={{
            top: `${150 + i * 60}px`,
            transform: `rotate(${Math.random() * 45 - 22}deg)`,
          }}
        />
      ))}

      {/* Sparks for fire effect */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: randomPos(1200), y: 600, opacity: 0.7 }}
          animate={{ 
            y: randomPos(-100), 
            x: randomPos(1200),
            opacity: [0.7, 0.2, 0.7], 
            scale: [0.5, 1, 0.5] 
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute text-yellow-400 text-2xl select-none"
        >
          ✨
        </motion.div>
      ))}

      {/* Burning Text */}
      <motion.h1
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center font-extrabold select-none"
        style={{
          fontSize: "90px",
          color: "#ffd700",
          textShadow: `
            0 0 10px #ffae00,
            0 0 25px #ff7b00,
            0 0 45px #ff5500,
            0 0 70px #ff2200,
            0 0 110px #ff0000
          `,
        }}
      >
        Kashish Don 😎
      </motion.h1>

      {/* Fire glow animation */}
      <motion.div
        animate={{
          filter: [
            "blur(4px) brightness(1)",
            "blur(8px) brightness(1.6)",
            "blur(4px) brightness(1)",
          ],
        }}
        transition={{ duration: 0.3, repeat: Infinity }}
        className="absolute bottom-1/4 text-red-600 text-8xl opacity-90 select-none"
      >
        🔥🔥🔥🔥 
      </motion.div>
    </div>
  );
}




