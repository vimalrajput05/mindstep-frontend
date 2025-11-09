import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sun, Moon, Save, Edit2, User, School, GraduationCap } from "lucide-react";

const AVATAR_OPTIONS = [
  { id: "boy1", gender: "male", emoji: "👦", label: "Boy 1" },
  { id: "boy2", gender: "male", emoji: "🧑", label: "Boy 2" },
  { id: "boy3", gender: "male", emoji: "👨", label: "Boy 3" },
  { id: "boy4", gender: "male", emoji: "👨‍🎓", label: "Boy 4" },
  { id: "girl1", gender: "female", emoji: "👧", label: "Girl 1" },
  { id: "girl2", gender: "female", emoji: "👩", label: "Girl 2" },
  { id: "girl3", gender: "female", emoji: "🧕", label: "Girl 3" },
  { id: "girl4", gender: "female", emoji: "👩‍🎓", label: "Girl 4" },
];

const SCHOOL_CLASSES = ["8th", "9th", "10th", "11th", "12th"];
const STREAMS = ["PCM", "PCB", "PCMB", "Commerce", "Arts"];
const COLLEGE_YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

export default function Profile() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem("userProfile");
    return saved ? JSON.parse(saved) : {
      name: user?.name || "",
      gender: "",
      avatar: "boy1",
      educationLevel: "",
      schoolClass: "",
      schoolStream: "",
      schoolName: "",
      collegeName: "",
      collegeCourse: "",
      collegeBranch: "",
      collegeYear: "",
    };
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const handleChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profileData));
    setIsEditing(false);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const handleCancel = () => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      setProfileData(JSON.parse(saved));
    }
    setIsEditing(false);
  };

  const selectedAvatar = AVATAR_OPTIONS.find(a => a.id === profileData.avatar) || AVATAR_OPTIONS[0];
  const isProfileComplete = profileData.name && profileData.gender && profileData.educationLevel;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-950" : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md ${darkMode ? "bg-gray-900/80 border-b border-gray-800" : "bg-white/80 border-b border-gray-200"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.button
            onClick={() => navigate("/dashboard")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} transition`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className={`w-5 h-5  ${darkMode ? "text-white" : "text-black"}`} />
            {/* <span className={`font-medium ${darkMode ? "text-white" : "text-black"}`}>Back to Dashboard</span> */}
          </motion.button>

          <div className="flex items-center gap-2">
            <User className={`w-6 h-6 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`} />
            <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              My Profile
            </h1>
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <AnimatePresence>
          {showSaveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 rounded-xl bg-green-500 text-white font-medium text-center shadow-lg"
            >
              ✓ Profile updated successfully!
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-8 rounded-3xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white shadow-xl"}`}
        >
          {/* Avatar Section */}
          <div className="text-center mb-8">
            <motion.div
              className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center text-6xl mb-4 ${
                profileData.gender === "male"
                  ? "bg-gradient-to-br from-blue-500 to-cyan-500 shadow-blue-500/50"
                  : profileData.gender === "female"
                  ? "bg-gradient-to-br from-pink-500 to-rose-500 shadow-pink-500/50"
                  : "bg-gradient-to-br from-gray-500 to-gray-600 shadow-gray-500/50"
              } shadow-2xl`}
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {selectedAvatar.emoji}
            </motion.div>

            {isProfileComplete ? (
              <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {profileData.name}
              </h2>
            ) : (
              <h2 className={`text-xl font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Complete your profile to get started
              </h2>
            )}

            {/* Edit Button */}
            {!isEditing && (
              <motion.button
                onClick={() => setIsEditing(true)}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit2 className="w-4 h-4 inline mr-2" />
                Edit Profile
              </motion.button>
            )}
          </div>

          {/* Profile Form */}
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Basic Info */}
                <div className={`p-6 rounded-2xl ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-50 border border-gray-200"}`}>
                  <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Basic Information
                  </h3>

                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          darkMode
                            ? "bg-gray-900 border-gray-700 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        } focus:ring-2 focus:ring-indigo-500 outline-none transition`}
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Gender *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {["male", "female"].map((gender) => (
                          <motion.button
                            key={gender}
                            onClick={() => handleChange("gender", gender)}
                            className={`p-3 rounded-lg font-medium border transition ${
                              profileData.gender === gender
                                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-600"
                                : darkMode
                                ? "bg-gray-900 border-gray-700 text-gray-300"
                                : "bg-white border-gray-300 text-gray-700"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {gender === "male" ? "👨 Male" : "👩 Female"}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Avatar Selection */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Choose Avatar
                      </label>
                      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                        {AVATAR_OPTIONS.filter(a => !profileData.gender || a.gender === profileData.gender).map((avatar) => (
                          <motion.button
                            key={avatar.id}
                            onClick={() => handleChange("avatar", avatar.id)}
                            className={`p-3 rounded-xl text-3xl border-2 transition ${
                              profileData.avatar === avatar.id
                                ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20"
                                : darkMode
                                ? "border-gray-700 hover:border-gray-600"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {avatar.emoji}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Education Level */}
                <div className={`p-6 rounded-2xl ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-50 border border-gray-200"}`}>
                  <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Education Details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Current Education Level *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: "school", icon: School, label: "School" },
                          { value: "college", icon: GraduationCap, label: "College" },
                        ].map((level) => {
                          const Icon = level.icon;
                          return (
                            <motion.button
                              key={level.value}
                              onClick={() => handleChange("educationLevel", level.value)}
                              className={`p-4 rounded-lg font-medium border transition ${
                                profileData.educationLevel === level.value
                                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-600"
                                  : darkMode
                                  ? "bg-gray-900 border-gray-700 text-gray-300"
                                  : "bg-white border-gray-300 text-gray-700"
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Icon className="w-6 h-6 mx-auto mb-2" />
                              {level.label}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* School Details */}
                    {profileData.educationLevel === "school" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                            School Name
                          </label>
                          <input
                            type="text"
                            value={profileData.schoolName}
                            onChange={(e) => handleChange("schoolName", e.target.value)}
                            placeholder="Enter school name"
                            className={`w-full px-4 py-3 rounded-lg border ${
                              darkMode
                                ? "bg-gray-900 border-gray-700 text-white"
                                : "bg-white border-gray-300 text-gray-900"
                            } focus:ring-2 focus:ring-indigo-500 outline-none transition`}
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                            Class *
                          </label>
                          <select
                            value={profileData.schoolClass}
                            onChange={(e) => handleChange("schoolClass", e.target.value)}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              darkMode
                                ? "bg-gray-900 border-gray-700 text-white"
                                : "bg-white border-gray-300 text-gray-900"
                            } focus:ring-2 focus:ring-indigo-500 outline-none transition`}
                          >
                            <option value="">Select Class</option>
                            {SCHOOL_CLASSES.map((cls) => (
                              <option key={cls} value={cls}>{cls}</option>
                            ))}
                          </select>
                        </div>

                        {(profileData.schoolClass === "11th" || profileData.schoolClass === "12th") && (
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                              Stream *
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {STREAMS.map((stream) => (
                                <motion.button
                                  key={stream}
                                  onClick={() => handleChange("schoolStream", stream)}
                                  className={`p-2 rounded-lg text-sm font-medium border transition ${
                                    profileData.schoolStream === stream
                                      ? "bg-indigo-600 text-white border-indigo-600"
                                      : darkMode
                                      ? "bg-gray-900 border-gray-700 text-gray-300"
                                      : "bg-white border-gray-300 text-gray-700"
                                  }`}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {stream}
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* College Details */}
                    {profileData.educationLevel === "college" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                            College Name *
                          </label>
                          <input
                            type="text"
                            value={profileData.collegeName}
                            onChange={(e) => handleChange("collegeName", e.target.value)}
                            placeholder="Enter college name"
                            className={`w-full px-4 py-3 rounded-lg border ${
                              darkMode
                                ? "bg-gray-900 border-gray-700 text-white"
                                : "bg-white border-gray-300 text-gray-900"
                            } focus:ring-2 focus:ring-indigo-500 outline-none transition`}
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                            Course *
                          </label>
                          <input
                            type="text"
                            value={profileData.collegeCourse}
                            onChange={(e) => handleChange("collegeCourse", e.target.value)}
                            placeholder="e.g., B.Tech, BCA, B.Sc"
                            className={`w-full px-4 py-3 rounded-lg border ${
                              darkMode
                                ? "bg-gray-900 border-gray-700 text-white"
                                : "bg-white border-gray-300 text-gray-900"
                            } focus:ring-2 focus:ring-indigo-500 outline-none transition`}
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                            Branch/Specialization *
                          </label>
                          <input
                            type="text"
                            value={profileData.collegeBranch}
                            onChange={(e) => handleChange("collegeBranch", e.target.value)}
                            placeholder="e.g., Computer Science, Mechanical"
                            className={`w-full px-4 py-3 rounded-lg border ${
                              darkMode
                                ? "bg-gray-900 border-gray-700 text-white"
                                : "bg-white border-gray-300 text-gray-900"
                            } focus:ring-2 focus:ring-indigo-500 outline-none transition`}
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                            Year *
                          </label>
                          <select
                            value={profileData.collegeYear}
                            onChange={(e) => handleChange("collegeYear", e.target.value)}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              darkMode
                                ? "bg-gray-900 border-gray-700 text-white"
                                : "bg-white border-gray-300 text-gray-900"
                            } focus:ring-2 focus:ring-indigo-500 outline-none transition`}
                          >
                            <option value="">Select Year</option>
                            {COLLEGE_YEARS.map((year) => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                          </select>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end">
                  <motion.button
                    onClick={handleCancel}
                    className={`px-6 py-3 rounded-xl font-medium ${
                      darkMode
                        ? "bg-gray-800 text-gray-300 hover:bg-gray-750"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={handleSave}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Save className="w-4 h-4 inline mr-2" />
                    Save Profile
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="viewing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Profile Display */}
                {isProfileComplete ? (
                  <div className={`p-6 rounded-2xl ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-50 border border-gray-200"}`}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mb-1`}>Gender</div>
                        <div className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {profileData.gender === "male" ? "👨 Male" : "👩 Female"}
                        </div>
                      </div>

                      <div>
                        <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mb-1`}>Education Level</div>
                        <div className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {profileData.educationLevel === "school" ? "🏫 School" : "🎓 College"}
                        </div>
                      </div>

                      {profileData.educationLevel === "school" && (
                        <>
                          {profileData.schoolName && (
                            <div>
                              <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mb-1`}>School</div>
                              <div className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                                {profileData.schoolName}
                              </div>
                            </div>
                          )}
                          <div>
                            <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mb-1`}>Class</div>
                            <div className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                              {profileData.schoolClass}
                              {profileData.schoolStream && ` (${profileData.schoolStream})`}
                            </div>
                          </div>
                        </>
                      )}

                      {profileData.educationLevel === "college" && (
                        <>
                          <div>
                            <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mb-1`}>College</div>
                            <div className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                              {profileData.collegeName}
                            </div>
                          </div>
                          <div>
                            <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mb-1`}>Course</div>
                            <div className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                              {profileData.collegeCourse}
                            </div>
                          </div>
                          <div>
                            <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mb-1`}>Branch</div>
                            <div className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                              {profileData.collegeBranch}
                            </div>
                          </div>
                          <div>
                            <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mb-1`}>Year</div>
                            <div className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                              {profileData.collegeYear}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className={`p-6 rounded-2xl text-center ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-50 border border-gray-200"}`}>
                    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                      Click "Edit Profile" to add your information
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}