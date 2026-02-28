import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  FileText,
  Clock,
  CheckCircle,
  Menu,
  X,
  User,
  LogOut,
  Plus,
  MapPin,
  ThumbsUp,
  MessageCircle,
  AlertCircle,
} from "lucide-react";
import { GlassCard } from "../../components/GlassCard";
import { GradientButton } from "../../components/GradientButton";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function CitizenDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeRange, setTimeRange] = useState<6 | 12>(6);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    solved: 0,
  });

  // Animate counters
  useEffect(() => {
    const targetStats = { total: 24, pending: 8, solved: 16 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setStats({
        total: Math.floor((targetStats.total * step) / steps),
        pending: Math.floor((targetStats.pending * step) / steps),
        solved: Math.floor((targetStats.solved * step) / steps),
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const monthlyData6 = [
    { month: "Sep", reports: 3 },
    { month: "Oct", reports: 5 },
    { month: "Nov", reports: 4 },
    { month: "Dec", reports: 6 },
    { month: "Jan", reports: 4 },
    { month: "Feb", reports: 2 },
  ];

  const monthlyData12 = [
    { month: "Mar", reports: 2 },
    { month: "Apr", reports: 3 },
    { month: "May", reports: 4 },
    { month: "Jun", reports: 2 },
    { month: "Jul", reports: 5 },
    { month: "Aug", reports: 3 },
    { month: "Sep", reports: 3 },
    { month: "Oct", reports: 5 },
    { month: "Nov", reports: 4 },
    { month: "Dec", reports: 6 },
    { month: "Jan", reports: 4 },
    { month: "Feb", reports: 2 },
  ];

  const locationReports = [
    {
      id: 1,
      title: "Pothole on Main Street",
      category: "Roads",
      votes: 45,
      priority: "High",
      image: "https://images.unsplash.com/photo-1625726411847-8cbb60cc71e6?w=400&h=300&fit=crop",
      comments: 12,
      liked: false,
    },
    {
      id: 2,
      title: "Broken Street Light",
      category: "Electricity",
      votes: 28,
      priority: "Medium",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
      comments: 8,
      liked: true,
    },
    {
      id: 3,
      title: "Garbage Accumulation",
      category: "Sanitation",
      votes: 67,
      priority: "High",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
      comments: 15,
      liked: false,
    },
  ];

  const statCards = [
    {
      title: "Total Reports",
      value: stats.total,
      icon: FileText,
      gradient: "from-pink-500 to-purple-600",
      delay: 0,
    },
    {
      title: "Pending Reports",
      value: stats.pending,
      icon: Clock,
      gradient: "from-yellow-500 to-orange-600",
      delay: 0.1,
    },
    {
      title: "Solved Reports",
      value: stats.solved,
      icon: CheckCircle,
      gradient: "from-green-500 to-emerald-600",
      delay: 0.2,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Mobile/Desktop Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="fixed top-0 left-0 h-full w-72 bg-white/70 backdrop-blur-[20px] shadow-2xl z-50 border-r border-white/50 lg:translate-x-0"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Citizen Portal
            </h2>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          <nav className="space-y-2">
            <button className="flex items-center gap-3 w-full p-3 rounded-[12px] bg-gradient-to-r from-pink-500 to-purple-600 text-white transition-all duration-300">
              <FileText className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => navigate("/citizen/report-issue")}
              className="flex items-center gap-3 w-full p-3 rounded-[12px] hover:bg-white/60 transition-all duration-300"
            >
              <Plus className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700">Report Issue</span>
            </button>
            <button
              onClick={() => navigate("/citizen/profile")}
              className="flex items-center gap-3 w-full p-3 rounded-[12px] hover:bg-white/60 transition-all duration-300"
            >
              <User className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700">Profile & Rewards</span>
            </button>
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <button
              onClick={() => navigate("/role-selection")}
              className="flex items-center gap-3 w-full p-3 rounded-[12px] hover:bg-red-50 text-red-600 transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="lg:ml-72 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-gray-600">Welcome back, Citizen!</p>
            </div>
          </div>
          <GradientButton onClick={() => navigate("/citizen/report-issue")}>
            <Plus className="w-5 h-5 mr-2 inline" />
            Report Issue
          </GradientButton>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <GlassCard key={index} hover delay={stat.delay} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 mb-2">{stat.title}</p>
                    <motion.p
                      className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                    >
                      {stat.value}
                    </motion.p>
                  </div>
                  <div className={`w-16 h-16 rounded-[14px] bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Monthly Report Graph */}
        <GlassCard className="p-6 mb-8" delay={0.3}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Monthly Report Submission Trend
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeRange(6)}
                className={`px-4 py-2 rounded-[10px] font-semibold transition-all duration-300 ${
                  timeRange === 6
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                    : "bg-white/50 text-gray-700"
                }`}
              >
                6 Months
              </button>
              <button
                onClick={() => setTimeRange(12)}
                className={`px-4 py-2 rounded-[10px] font-semibold transition-all duration-300 ${
                  timeRange === 12
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                    : "bg-white/50 text-gray-700"
                }`}
              >
                12 Months
              </button>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeRange === 6 ? monthlyData6 : monthlyData12}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  borderRadius: "12px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                }}
              />
              <Line
                type="monotone"
                dataKey="reports"
                stroke="url(#lineGradient)"
                strokeWidth={3}
                dot={{ fill: "#9333ea", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Reports in Your Location */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            <MapPin className="inline w-6 h-6 mr-2" />
            Reports in Your Location
          </h2>
          <p className="text-gray-600 mb-6">Based on your current location</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locationReports.map((report, index) => (
              <GlassCard key={report.id} hover delay={0.4 + index * 0.1} className="overflow-hidden">
                <img src={report.image} alt={report.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm rounded-full">
                      {report.category}
                    </span>
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        report.priority === "High"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {report.priority}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">{report.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-gray-600 hover:text-purple-600 transition-colors duration-300">
                        <ThumbsUp className={`w-5 h-5 ${report.liked ? "fill-purple-600 text-purple-600" : ""}`} />
                        <span className="text-sm font-semibold">{report.votes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-600 hover:text-purple-600 transition-colors duration-300">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm font-semibold">{report.comments}</span>
                      </button>
                    </div>
                    <button
                      onClick={() => navigate(`/citizen/complaint/${report.id}`)}
                      className="text-purple-600 hover:text-purple-700 text-sm font-semibold"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
