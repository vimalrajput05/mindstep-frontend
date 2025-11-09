import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import SkillTest from "./pages/SkillTest"; // ← Added
import PsychometricTest from "./pages/PsychometricTest";
import Demo from "./pages/Demo";
import Profile from "./pages/Profile";
import SkillManager from "./pages/SkillManager";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/skilltest" element={<SkillTest />} /> {/* ← Added */}
        <Route path="/psychometric" element={<PsychometricTest />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/skills" element={<SkillManager />} />


      </Routes>
    </Router>
  );
}
