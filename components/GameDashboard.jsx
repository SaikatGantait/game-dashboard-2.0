import React, { useState, useEffect, useRef } from "react";
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area
} from "recharts";
import { 
  Sun, Moon, User, Trophy, BarChart3, ChevronRight, 
  Zap, Clock, Award, Skull, Settings, Bell, Search, 
  Download, Share2, Sword, Shield, HeartPulse, Crosshair,
  Users, MessageSquare, Plus, MoreHorizontal, Sparkles, Cpu, Gamepad2
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// Neon color scheme
const COLORS = {
  primary: '#00f0ff',
  secondary: '#ff00f0',
  accent: '#f0ff00',
  dark: '#0a0a1a',
  light: '#e0e0ff',
  success: '#00ff88',
  danger: '#ff0055'
};

// Updated game data with futuristic themes
const games = [
  { 
    id: 1, 
    name: "Clash Of Clans", 
    link: "#", 
    icon: "🚀", 
    color: "linear-gradient(135deg, #00f0ff, #0080ff)", 
    players: "1.2M", 
    tags: ["Racing", "VR"] 
  },
  { 
    id: 2, 
    name: "Valorant", 
    link: "#", 
    icon: "⚡", 
    color: "linear-gradient(135deg, #ff00f0, #8000ff)", 
    players: "2.8M", 
    tags: ["FPS", "Cyberpunk"] 
  },
  { 
    id: 3, 
    name: "Fortnite", 
    link: "#", 
    icon: "🧠", 
    color: "linear-gradient(135deg, #f0ff00, #ff8000)", 
    players: "1.9M", 
    tags: ["Puzzle", "AI"] 
  },
  { 
    
    id: 4, 
    name: "Dota 2", 
    link: "https://www.dota2.com/home", 
    icon: "👾", 
    color: "linear-gradient(135deg, #00ff88, #00a0ff)", 
    players: "3.5M", 
    tags: ["Battle Royale", "XR"] 
  },
  { 
    id: 5, 
    name: "Fifa 25", 
    link: "#", 
    icon: "🗡️", 
    color: "linear-gradient(135deg, #ff0055, #ff00a0)", 
    players: "2.1M", 
    tags: ["Action", "RPG"] 
  },
  { 
    id: 6, 
    name: "Pubg", 
    link: "#", 
    icon: "💾", 
    color: "linear-gradient(135deg, #8000ff, #00a0ff)", 
    players: "1.7M", 
    tags: ["Stealth", "Co-op"] 
  },
];

const friends = [
  { id: 1, name: "NeonGhost", status: "online", game: "Quantum Conflict", avatar: "https://i.pravatar.cc/150?img=5", level: 87 },
  { id: 2, name: "CyberViper", status: "online", game: "Neural Grid", avatar: "https://i.pravatar.cc/150?img=11", level: 92 },
  { id: 3, name: "QuantumByte", status: "offline", lastSeen: "2h ago", avatar: "https://i.pravatar.cc/150?img=8", level: 45 },
  { id: 4, name: "DataWraith", status: "ingame", game: "Hologram Arena", avatar: "https://i.pravatar.cc/150?img=15", level: 76 },
];

const GameDashboard = () => {
  const [matches, setMatches] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationCount, setNotificationCount] = useState(5);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hologramActive, setHologramActive] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Handle game click
  const handleGameClick = (game) => {
    setSelectedGame(game);
    setNotificationCount(prev => prev + 1);
    // In a real app, you would launch the game or navigate to its page
    console.log(`Launching ${game.name}`);
    alert(`Launching ${game.name}...`);
  };

  // Simulated data
  useEffect(() => {
    const demoMatches = [
      { id: 1, gameName: "Clash of Clans", date: "2023-11-15", kills: 24, deaths: 3, score: 8500, result: "win", mvp: "Yes", time: "12:45", map: "Neo-Tokyo", accuracy: 88, headshots: 8 },
      { id: 2, gameName: "Fifa 25", date: "2023-11-14", kills: 18, deaths: 7, score: 6200, result: "loss", mvp: "No", time: "10:30", map: "Data Fortress", accuracy: 75, headshots: 5 },
      { id: 3, gameName: "Dota 2", date: "2023-11-12", kills: 32, deaths: 4, score: 12100, result: "win", mvp: "Yes", time: "15:20", map: "Cyber Dojo", accuracy: 92, headshots: 14 },
      { id: 4, gameName: "Valorant", date: "2023-11-10", kills: 12, deaths: 9, score: 4800, result: "loss", mvp: "No", time: "08:15", map: "Shogun's Realm", accuracy: 70, headshots: 3 },
      { id: 5, gameName: "Pubg", date: "2023-11-08", kills: 28, deaths: 2, score: 14200, result: "win", mvp: "Yes", time: "18:05", map: "Mainframe Core", accuracy: 95, headshots: 12 },
    ];
    
    const savedMatches = JSON.parse(localStorage.getItem("matches")) || demoMatches;
    setMatches(savedMatches);
    
    // Activate hologram effect after load
    setTimeout(() => setHologramActive(true), 1000);
  }, []);

  // Performance data
  const performanceData = [
    { day: "MON", kills: 18, deaths: 4, score: 7200 },
    { day: "TUE", kills: 22, deaths: 3, score: 9500 },
    { day: "WED", kills: 16, deaths: 7, score: 6800 },
    { day: "THU", kills: 35, deaths: 2, score: 15100 },
    { day: "FRI", kills: 19, deaths: 5, score: 8800 },
    { day: "SAT", kills: 42, deaths: 3, score: 18200 },
    { day: "SUN", kills: 31, deaths: 4, score: 14200 },
  ];

  const radarData = [
    { subject: "Accuracy", A: 92, fullMark: 100 },
    { subject: "Headshots", A: 85, fullMark: 100 },
    { subject: "K/D Ratio", A: 4.2, fullMark: 5 },
    { subject: "Score/min", A: 420, fullMark: 500 },
    { subject: "Wins", A: 78, fullMark: 100 },
    { subject: "MVPs", A: 35, fullMark: 50 },
  ];

  const totalStats = matches.reduce(
    (acc, match) => {
      acc.kills += match.kills;
      acc.deaths += match.deaths;
      acc.score += match.score;
      acc.wins += match.result === "win" ? 1 : 0;
      acc.losses += match.result === "loss" ? 1 : 0;
      acc.mvp += match.mvp === "Yes" ? 1 : 0;
      acc.timePlayed += parseInt(match.time) || 0;
      return acc;
    },
    { kills: 0, deaths: 0, score: 0, wins: 0, losses: 0, mvp: 0, timePlayed: 0 }
  );

  const kdRatio = totalStats.deaths > 0 ? (totalStats.kills / totalStats.deaths).toFixed(2) : totalStats.kills;
  const winRate = totalStats.wins + totalStats.losses > 0 
    ? ((totalStats.wins / (totalStats.wins + totalStats.losses)) * 100).toFixed(0) 
    : 0;

  const filteredMatches = matches.filter(match => 
    match.gameName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const mapPerformance = [
    { name: "Neo-Tokyo", wins: 12, losses: 3, avgScore: 9200 },
    { name: "Data Fortress", wins: 8, losses: 5, avgScore: 7800 },
    { name: "Cyber Dojo", wins: 15, losses: 2, avgScore: 12500 },
    { name: "Mainframe", wins: 10, losses: 4, avgScore: 9800 },
  ];

  // Futuristic glowing button component
  const GlowButton = ({ children, onClick, color = COLORS.primary }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative overflow-hidden px-6 py-3 rounded-lg font-bold tracking-wider"
      style={{
        background: `linear-gradient(135deg, ${color}30, ${darkMode ? '#0a0a1a' : '#ffffff'}30)`,
        color: color,
        border: `1px solid ${color}50`,
        boxShadow: `0 0 15px ${color}30`
      }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      <motion.span
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, ${color}20, transparent)`,
          opacity: 0
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );

  return (
    <div 
      className={`min-h-screen font-sans overflow-x-hidden ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
      style={{ backgroundColor: darkMode ? COLORS.dark : '#f0f0ff' }}
      ref={containerRef}
    >
      {/* Holographic grid background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-20"
          style={{ 
            backgroundImage: `
              linear-gradient(${COLORS.primary}20 1px, transparent 1px),
              linear-gradient(90deg, ${COLORS.primary}20 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Animated particles */}
      <motion.div 
        className="fixed inset-0 overflow-hidden pointer-events-none"
        style={{ y }}
      >
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: Math.random() * 8 + 2,
              height: Math.random() * 8 + 2,
              opacity: Math.random() * 0.5 + 0.1,
              background: `radial-gradient(${COLORS.primary}, transparent)`
            }}
            animate={{
              x: [null, Math.random() * 100],
              y: [null, Math.random() * 100],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header with controls */}
        <header className={`flex justify-between items-center mb-8 sticky top-0 z-20 pt-6 pb-2 backdrop-blur-md ${darkMode ? 'bg-black/70' : 'bg-white/70'}`}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <motion.div 
              whileHover={{ rotate: 15 }}
              className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                boxShadow: `0 0 20px ${COLORS.primary}80`
              }}
            >
              <Gamepad2 className="h-6 w-6 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold tracking-tighter">
              <span 
                className="bg-clip-text text-transparent"
                style={{
                  background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
                  textShadow: `0 0 10px ${COLORS.primary}80`
                }}
              >
                NEXUS DASH
              </span>
            </h1>
          </motion.div>

          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <button 
                className={`p-2 rounded-lg transition flex items-center gap-1 ${darkMode ? 'bg-black/30 hover:bg-black/50' : 'bg-white/30 hover:bg-white/50'}`}
                style={{ border: `1px solid ${COLORS.primary}30` }}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5" style={{ color: COLORS.primary }} />
                {notificationCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    style={{ 
                      background: COLORS.danger,
                      boxShadow: `0 0 8px ${COLORS.danger}`
                    }}
                  >
                    {notificationCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute right-0 mt-2 w-72 rounded-lg shadow-xl overflow-hidden ${darkMode ? 'bg-black/90' : 'bg-white/90'}`}
                    style={{ border: `1px solid ${COLORS.primary}30`, backdropFilter: 'blur(10px)' }}
                  >
                    <div 
                      className={`p-3 border-b flex justify-between items-center ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
                      style={{ borderColor: `${COLORS.primary}20` }}
                    >
                      <span className="font-medium">ALERTS</span>
                      <button 
                        className="text-xs"
                        style={{ color: COLORS.primary }}
                        onClick={() => setNotificationCount(0)}
                      >
                        CLEAR ALL
                      </button>
                    </div>
                    <div className={`divide-y ${darkMode ? 'divide-gray-800' : 'divide-gray-200'}`}>
                      {[...Array(notificationCount)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`p-3 cursor-pointer ${darkMode ? 'hover:bg-black/50' : 'hover:bg-white/50'}`}
                          style={{ borderColor: `${COLORS.primary}20` }}
                        >
                          <div className="flex items-start gap-2">
                            <div 
                              className="p-1.5 rounded-lg flex-shrink-0"
                              style={{ background: `${COLORS.primary}20` }}
                            >
                              <Zap className="h-4 w-4" style={{ color: COLORS.primary }} />
                            </div>
                            <div>
                              <p className="text-sm font-medium">SYSTEM ALERT</p>
                              <p className="text-xs" style={{ color: COLORS.primary }}>
                                {selectedGame 
                                  ? `Now playing: ${selectedGame.name}`
                                  : `Achievement unlocked: Level ${Math.floor(Math.random() * 50) + 50}`
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition ${darkMode ? 'bg-black/30 hover:bg-black/50' : 'bg-white/30 hover:bg-white/50'}`}
              style={{ border: `1px solid ${COLORS.primary}30` }}
            >
              {darkMode ? (
                <Sun className="h-5 w-5" style={{ color: COLORS.accent }} />
              ) : (
                <Moon className="h-5 w-5" style={{ color: COLORS.primary }} />
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              className={`p-2 rounded-lg transition ${darkMode ? 'bg-black/30 hover:bg-black/50' : 'bg-white/30 hover:bg-white/50'}`}
              style={{ border: `1px solid ${COLORS.primary}30` }}
            >
              <Settings className="h-5 w-5" style={{ color: COLORS.primary }} />
            </motion.button>
          </div>
        </header>

        {/* User profile bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`flex items-center justify-between mb-8 p-5 rounded-xl ${darkMode ? 'bg-black/50' : 'bg-white/70'}`}
          style={{ 
            border: `1px solid ${COLORS.primary}30`,
            backdropFilter: 'blur(10px)',
            boxShadow: `0 0 30px ${COLORS.primary}20`
          }}
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/150?img=32"
                alt="Avatar"
                className="w-16 h-16 rounded-full"
                style={{ 
                  border: `3px solid ${COLORS.primary}`,
                  boxShadow: `0 0 20px ${COLORS.primary}80`
                }}
              />
              <div 
                className="absolute -bottom-1 -right-1 rounded-full p-1 flex items-center justify-center"
                style={{ 
                  background: COLORS.primary,
                  boxShadow: `0 0 10px ${COLORS.primary}`
                }}
              >
                <Zap className="h-4 w-4 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">CYBER_NINJA</h2>
              <p className="text-sm flex items-center gap-1" style={{ color: COLORS.primary }}>
                <Award className="h-4 w-4" /> {totalStats.mvp} MVPs • LEVEL 99
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{totalStats.wins}</p>
              <p className="text-xs uppercase tracking-wider" style={{ color: COLORS.primary }}>WINS</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{totalStats.losses}</p>
              <p className="text-xs uppercase tracking-wider" style={{ color: COLORS.primary }}>LOSSES</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{winRate}%</p>
              <p className="text-xs uppercase tracking-wider" style={{ color: COLORS.primary }}>WIN RATE</p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div 
          className="flex mb-6"
          style={{ borderBottom: `1px solid ${COLORS.primary}20` }}
        >
          {["overview", "games", "matches", "performance", "social"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium text-sm uppercase tracking-wider relative ${
                activeTab === tab 
                  ? `font-bold`
                  : `${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"}`
              }`}
              style={activeTab === tab ? { color: COLORS.primary } : {}}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: COLORS.primary }}
                  layoutId="underline"
                />
              )}
            </button>
          ))}
        </div>

        {/* Search bar for matches */}
        {activeTab === "matches" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="SEARCH MATCHES..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                  darkMode 
                    ? "bg-black/30 text-white focus:ring-blue-500 placeholder-gray-500" 
                    : "bg-white/70 text-gray-900 focus:ring-blue-500 placeholder-gray-400"
                }`}
                style={{ border: `1px solid ${COLORS.primary}30` }}
              />
              <Search 
                className={`absolute left-3 top-3.5 h-4 w-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`} 
              />
            </div>
          </motion.div>
        )}

        {/* Main content area */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Combat Stats */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className={`p-6 rounded-xl ${darkMode ? 'bg-black/50' : 'bg-white/70'}`}
                  style={{ 
                    border: `1px solid ${COLORS.primary}30`,
                    backdropFilter: 'blur(10px)',
                    boxShadow: `0 0 20px ${COLORS.primary}10`
                  }}
                >
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: COLORS.primary }}>
                    <Sword className="h-5 w-5" /> COMBAT STATS
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span style={{ color: COLORS.primary }}>ELIMINATIONS</span>
                        <span className="font-bold">{totalStats.kills}</span>
                      </div>
                      <div className="w-full h-2 rounded-full" style={{ background: `${darkMode ? '#000000' : '#ffffff'}20` }}>
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.success})`,
                            width: `${Math.min(100, totalStats.kills / 200)}%`
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span style={{ color: COLORS.primary }}>FATALITIES</span>
                        <span className="font-bold">{totalStats.deaths}</span>
                      </div>
                      <div className="w-full h-2 rounded-full" style={{ background: `${darkMode ? '#000000' : '#ffffff'}20` }}>
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            background: `linear-gradient(90deg, ${COLORS.danger}, ${COLORS.secondary})`,
                            width: `${Math.min(100, totalStats.deaths / 50)}%`
                          }}
                        />
                      </div>
                    </div>
                    <div className="pt-2" style={{ borderTop: `1px solid ${COLORS.primary}20` }}>
                      <div className="flex justify-between">
                        <span className="text-sm" style={{ color: COLORS.primary }}>K/D RATIO</span>
                        <span className="font-bold">{kdRatio}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Performance */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className={`p-6 rounded-xl ${darkMode ? 'bg-black/50' : 'bg-white/70'}`}
                  style={{ 
                    border: `1px solid ${COLORS.primary}30`,
                    backdropFilter: 'blur(10px)',
                    boxShadow: `0 0 20px ${COLORS.primary}10`
                  }}
                >
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: COLORS.primary }}>
                    <BarChart3 className="h-5 w-5" /> WEEKLY PERFORMANCE
                  </h3>
                  <div className="h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={performanceData}>
                        <XAxis 
                          dataKey="day" 
                          tick={{ fill: darkMode ? COLORS.primary : COLORS.dark }} 
                        />
                        <YAxis 
                          tick={{ fill: darkMode ? COLORS.primary : COLORS.dark }} 
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: darkMode ? '#000000' : '#ffffff',
                            borderColor: COLORS.primary,
                            borderRadius: '0.25rem',
                            color: darkMode ? '#ffffff' : '#000000'
                          }}
                        />
                        <Area 
                          dataKey="score" 
                          stroke={COLORS.primary} 
                          fill={COLORS.primary} 
                          fillOpacity={0.2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Skills Radar */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className={`p-6 rounded-xl ${darkMode ? 'bg-black/50' : 'bg-white/70'}`}
                  style={{ 
                    border: `1px solid ${COLORS.primary}30`,
                    backdropFilter: 'blur(10px)',
                    boxShadow: `0 0 20px ${COLORS.primary}10`
                  }}
                >
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: COLORS.primary }}>
                    <Crosshair className="h-5 w-5" /> SKILLS RADAR
                  </h3>
                  <div className="h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid 
                          stroke={darkMode ? `${COLORS.primary}30` : `${COLORS.dark}30`} 
                        />
                        <PolarAngleAxis 
                          dataKey="subject" 
                          tick={{ fill: darkMode ? COLORS.primary : COLORS.dark }} 
                        />
                        <PolarRadiusAxis 
                          angle={30} 
                          domain={[0, 100]} 
                          tick={{ fill: darkMode ? COLORS.primary : COLORS.dark }} 
                        />
                        <Radar 
                          name="Skills" 
                          dataKey="A" 
                          stroke={COLORS.primary} 
                          fill={COLORS.primary} 
                          fillOpacity={0.4} 
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>

              {/* Recent Activity */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`p-6 rounded-xl ${darkMode ? 'bg-black/50' : 'bg-white/70'}`}
                style={{ 
                  border: `1px solid ${COLORS.primary}30`,
                  backdropFilter: 'blur(10px)',
                  boxShadow: `0 0 20px ${COLORS.primary}10`
                }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: COLORS.primary }}>
                    <Clock className="h-5 w-5" /> RECENT ACTIVITY
                  </h3>
                  <button className="text-sm" style={{ color: COLORS.primary }}>
                    VIEW ALL
                  </button>
                </div>
                <div className="space-y-3">
                  {matches.slice(0, 5).map((match, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className={`flex items-center justify-between p-3 rounded-lg transition cursor-pointer ${darkMode ? 'hover:bg-black/30' : 'hover:bg-white/30'}`}
                      style={{ border: `1px solid ${COLORS.primary}20` }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          match.result === "win" 
                            ? "bg-green-500" 
                            : "bg-red-500"
                        }`} 
                        style={{ boxShadow: `0 0 8px ${match.result === "win" ? COLORS.success : COLORS.danger}` }} 
                        />
                        <div>
                          <p className="font-medium">{match.gameName}</p>
                          <p className="text-xs" style={{ color: COLORS.primary }}>
                            {match.date} • {match.time} • {match.map}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-mono">
                            <span style={{ color: COLORS.success }}>{match.kills}</span> / 
                            <span style={{ color: COLORS.danger }}> {match.deaths}</span>
                          </p>
                          <p className="text-xs" style={{ color: COLORS.primary }}>SCORE: {match.score}</p>
                        </div>
                        <ChevronRight style={{ color: COLORS.primary }} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "games" && (
            <motion.div
              key="games"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {games.map((game) => (
                  <motion.div
                    key={game.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-5 rounded-xl overflow-hidden relative cursor-pointer"
                    style={{ 
                      background: game.color,
                      border: `1px solid ${COLORS.primary}50`,
                      boxShadow: `0 0 30px ${COLORS.primary}20`
                    }}
                    onClick={() => handleGameClick(game)}
                  >
                    <div className="absolute -right-5 -top-5 text-8xl opacity-10">
                      {game.icon}
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold">{game.name}</h3>
                          <p className="text-sm mt-1 opacity-90">{game.players} ACTIVE PLAYERS</p>
                        </div>
                        <span className="text-3xl">{game.icon}</span>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-1">
                        {game.tags.map((tag, i) => (
                          <span 
                            key={i} 
                            className="px-2 py-1 rounded text-xs font-medium"
                            style={{ 
                              background: `${darkMode ? '#000000' : '#ffffff'}30`,
                              color: darkMode ? '#ffffff' : '#000000'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 flex justify-between items-center">
                        <div className="flex items-center gap-1 text-xs" style={{ color: darkMode ? '#ffffff' : '#000000' }}>
                          <HeartPulse className="h-3 w-3" /> 96% POSITIVE
                        </div>
                        <GlowButton 
                          color={COLORS.primary}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleGameClick(game);
                          }}
                        >
                          <Zap className="h-4 w-4" /> PLAY
                        </GlowButton>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "matches" && (
            <motion.div
              key="matches"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredMatches.length > 0 ? (
                filteredMatches.map((match, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-xl ${darkMode ? 'bg-black/50' : 'bg-white/70'}`}
                    style={{ 
                      border: `1px solid ${match.result === "win" ? COLORS.success : COLORS.danger}30`,
                      backdropFilter: 'blur(10px)',
                      boxShadow: `0 0 20px ${match.result === "win" ? COLORS.success : COLORS.danger}10`
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{match.gameName}</h3>
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-bold"
                            style={{ 
                              background: `${match.result === "win" ? COLORS.success : COLORS.danger}20`,
                              color: match.result === "win" ? COLORS.success : COLORS.danger,
                              boxShadow: `0 0 10px ${match.result === "win" ? COLORS.success : COLORS.danger}30`
                            }}
                          >
                            {match.result.toUpperCase()}
                          </span>
                          {match.mvp === "Yes" && (
                            <span 
                              className="px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1"
                              style={{ 
                                background: `${COLORS.accent}20`,
                                color: COLORS.accent,
                                boxShadow: `0 0 10px ${COLORS.accent}30`
                              }}
                            >
                              <Award className="h-3 w-3" /> MVP
                            </span>
                          )}
                        </div>
                        <p className="text-xs" style={{ color: COLORS.primary }}>
                          {match.date} • {match.time} • {match.map}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-mono">
                          <span style={{ color: COLORS.success }}>{match.kills}</span> / 
                          <span style={{ color: COLORS.danger }}> {match.deaths}</span>
                        </p>
                        <p className="text-xs" style={{ color: COLORS.primary }}>SCORE: {match.score}</p>
                      </div>
                    </div>
                    <div 
                      className="mt-3 pt-3 flex justify-between text-xs"
                      style={{ 
                        borderTop: `1px solid ${COLORS.primary}20`,
                        color: COLORS.primary
                      }}
                    >
                      <span>K/D: {(match.kills / (match.deaths || 1)).toFixed(2)}</span>
                      <span>ACCURACY: {match.accuracy}%</span>
                      <span>HEADSHOTS: {match.headshots}</span>
                    </div>
                    <div className="mt-3 flex justify-end gap-2">
                      <button 
                        className="p-1.5 rounded transition"
                        style={{ 
                          background: `${darkMode ? '#000000' : '#ffffff'}20`,
                          border: `1px solid ${COLORS.primary}30`
                        }}
                      >
                        <Share2 className="h-4 w-4" style={{ color: COLORS.primary }} />
                      </button>
                      <button 
                        className="p-1.5 rounded transition"
                        style={{ 
                          background: `${darkMode ? '#000000' : '#ffffff'}20`,
                          border: `1px solid ${COLORS.primary}30`
                        }}
                      >
                        <Download className="h-4 w-4" style={{ color: COLORS.primary }} />
                      </button>
                      <button 
                        className="p-1.5 rounded transition"
                        style={{ 
                          background: `${darkMode ? '#000000' : '#ffffff'}20`,
                          border: `1px solid ${COLORS.primary}30`
                        }}
                      >
                        <MoreHorizontal className="h-4 w-4" style={{ color: COLORS.primary }} />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div 
                  className="text-center py-12 rounded-xl"
                  style={{ 
                    background: `${darkMode ? '#000000' : '#ffffff'}20`,
                    border: `1px dashed ${COLORS.primary}30`,
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <p style={{ color: COLORS.primary }}>NO MATCHES FOUND</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "performance" && (
            <motion.div
              key="performance"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className={`p-6 rounded-xl ${darkMode ? 'bg-black/50' : 'bg-white/70'}`}
                  style={{ 
                    border: `1px solid ${COLORS.primary}30`,
                    backdropFilter: 'blur(10px)',
                    boxShadow: `0 0 20px ${COLORS.primary}10`
                  }}
                >
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: COLORS.primary }}>
                    <BarChart3 className="h-5 w-5" /> WEEKLY PERFORMANCE
                  </h3>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData}>
                        <XAxis 
                          dataKey="day" 
                          tick={{ fill: darkMode ? COLORS.primary : COLORS.dark }} 
                        />
                        <YAxis 
                          tick={{ fill: darkMode ? COLORS.primary : COLORS.dark }} 
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: darkMode ? '#000000' : '#ffffff',
                            borderColor: COLORS.primary,
                            borderRadius: '0.25rem',
                            color: darkMode ? '#ffffff' : '#000000'
                          }}
                        />
                        <Bar 
                          dataKey="kills" 
                          fill={COLORS.primary} 
                          radius={[4, 4, 0, 0]} 
                        />
                        <Bar 
                          dataKey="deaths" 
                          fill={COLORS.danger} 
                          radius={[4, 4, 0, 0]} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -5 }}
                  className={`p-6 rounded-xl ${darkMode ? 'bg-black/50' : 'bg-white/70'}`}
                  style={{ 
                    border: `1px solid ${COLORS.primary}30`,
                    backdropFilter: 'blur(10px)',
                    boxShadow: `0 0 20px ${COLORS.primary}10`
                  }}
                >
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: COLORS.primary }}>
                    <BarChart3 className="h-5 w-5" /> MAP PERFORMANCE
                  </h3>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mapPerformance}>
                        <XAxis 
                          dataKey="name" 
                          tick={{ fill: darkMode ? COLORS.primary : COLORS.dark }} 
                        />
                        <YAxis 
                          tick={{ fill: darkMode ? COLORS.primary : COLORS.dark }} 
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: darkMode ? '#000000' : '#ffffff',
                            borderColor: COLORS.primary,
                            borderRadius: '0.25rem',
                            color: darkMode ? '#ffffff' : '#000000'
                          }}
                        />
                        <Bar 
                          dataKey="wins" 
                          fill={COLORS.success} 
                          radius={[4, 4, 0, 0]} 
                        />
                        <Bar 
                          dataKey="losses" 
                          fill={COLORS.danger} 
                          radius={[4, 4, 0, 0]} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                whileHover={{ y: -5 }}
                className={`p-6 rounded-xl ${darkMode ? 'bg-black/50' : 'bg-white/70'}`}
                style={{ 
                  border: `1px solid ${COLORS.primary}30`,
                  backdropFilter: 'blur(10px)',
                  boxShadow: `0 0 20px ${COLORS.primary}10`
                }}
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: COLORS.primary }}>
                  <Trophy className="h-5 w-5" /> SKILLS ANALYSIS
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid 
                        stroke={darkMode ? `${COLORS.primary}30` : `${COLORS.dark}30`} 
                      />
                      <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ fill: darkMode ? COLORS.primary : COLORS.dark }} 
                      />
                      <PolarRadiusAxis 
                        angle={30} 
                        domain={[0, 100]} 
                        tick={{ fill: darkMode ? COLORS.primary : COLORS.dark }} 
                      />
                      <Radar 
                        name="Skills" 
                        dataKey="A" 
                        stroke={COLORS.primary} 
                        fill={COLORS.primary} 
                        fillOpacity={0.4} 
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "social" && (
            <motion.div
              key="social"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <motion.div
                whileHover={{ y: -5 }}
                className={`p-6 rounded-xl ${darkMode ? 'bg-black/50' : 'bg-white/70'}`}
                style={{ 
                  border: `1px solid ${COLORS.primary}30`,
                  backdropFilter: 'blur(10px)',
                  boxShadow: `0 0 20px ${COLORS.primary}10`
                }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: COLORS.primary }}>
                    <Users className="h-5 w-5" /> FRIENDS ACTIVITY
                  </h3>
                  <GlowButton color={COLORS.primary}>
                    <Plus className="h-4 w-4" /> ADD FRIEND
                  </GlowButton>
                </div>
                <div className="space-y-3">
                  {friends.map((friend, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className={`flex items-center justify-between p-3 rounded-lg transition cursor-pointer ${darkMode ? 'hover:bg-black/30' : 'hover:bg-white/30'}`}
                      style={{ border: `1px solid ${COLORS.primary}20` }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={friend.avatar}
                            alt={friend.name}
                            className="w-10 h-10 rounded-full"
                            style={{ 
                              border: `2px solid ${COLORS.primary}`,
                              boxShadow: `0 0 10px ${COLORS.primary}80`
                            }}
                          />
                          <div 
                            className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 ${
                              darkMode ? 'border-black' : 'border-white'
                            }`}
                            style={{ 
                              background: friend.status === 'online' 
                                ? COLORS.success 
                                : friend.status === 'ingame' 
                                  ? COLORS.accent 
                                  : COLORS.danger,
                              boxShadow: `0 0 5px ${
                                friend.status === 'online' 
                                  ? COLORS.success 
                                  : friend.status === 'ingame' 
                                    ? COLORS.accent 
                                    : COLORS.danger
                              }`
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{friend.name}</p>
                          {friend.status === "online" && (
                            <p className="text-xs flex items-center gap-1" style={{ color: COLORS.success }}>
                              PLAYING {friend.game}
                            </p>
                          )}
                          {friend.status === "offline" && (
                            <p className="text-xs" style={{ color: COLORS.primary }}>LAST SEEN {friend.lastSeen}</p>
                          )}
                          {friend.status === "ingame" && (
                            <p className="text-xs flex items-center gap-1" style={{ color: COLORS.accent }}>
                              IN GAME: {friend.game}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {friend.status !== "offline" && (
                          <button 
                            className="p-1.5 rounded-full transition"
                            style={{ 
                              background: `${darkMode ? '#000000' : '#ffffff'}20`,
                              border: `1px solid ${COLORS.primary}30`
                            }}
                          >
                            <MessageSquare className="h-4 w-4" style={{ color: COLORS.primary }} />
                          </button>
                        )}
                        <ChevronRight style={{ color: COLORS.primary }} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className={`p-6 rounded-xl ${darkMode ? 'bg-black/50' : 'bg-white/70'}`}
                style={{ 
                  border: `1px solid ${COLORS.primary}30`,
                  backdropFilter: 'blur(10px)',
                  boxShadow: `0 0 20px ${COLORS.primary}10`
                }}
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: COLORS.primary }}>
                  <MessageSquare className="h-5 w-5" /> RECENT CHATS
                </h3>
                <div 
                  className="text-center py-12 rounded-lg"
                  style={{ 
                    background: `${darkMode ? '#000000' : '#ffffff'}20`,
                    border: `1px dashed ${COLORS.primary}30`
                  }}
                >
                  <p style={{ color: COLORS.primary }}>NO RECENT MESSAGES</p>
                  <div className="mt-4">
                    <GlowButton color={COLORS.primary}>
                      START NEW CHAT
                    </GlowButton>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Holographic effect overlay */}
      
      {hologramActive && (
        <>
          <div 
            className="fixed inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(0deg, transparent 0%, ${COLORS.primary}10 50%, transparent 100%)`,
              opacity: 0.3,
              animation: 'scan 8s linear infinite',
              zIndex: 5
            }}
          />
          <style jsx global>{`
            @keyframes scan {
              0% { transform: translateY(-100%); }
              100% { transform: translateY(100%); }
            }
          `}</style>
        </>
      )}
    </div>
  );
};

export default GameDashboard;