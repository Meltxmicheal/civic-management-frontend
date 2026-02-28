import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  FileText,
  Clock,
  CheckCircle,
  Menu,
  X,
  LogOut,
  ThumbsUp,
  XCircle,
  Upload,
  Send,
  UserX,
} from "lucide-react";
import { GlassCard } from "../../components/GlassCard";
import { GradientButton } from "../../components/GradientButton";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ total: 0, pending: 0, solved: 0 });

  useEffect(() => {
    const targetStats = { total: 156, pending: 42, solved: 114 };
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

  const monthlyData = [
    { month: "Sep", reports: 18 },
    { month: "Oct", reports: 25 },
    { month: "Nov", reports: 22 },
    { month: "Dec", reports: 30 },
    { month: "Jan", reports: 28 },
    { month: "Feb", reports: 33 },
  ];

  const reports = [
    {
      id: 1,
      title: "Pothole on Main Street",
      category: "Roads",
      votes: 45,
      priority: "High",
      status: "pending",
      image: "https://images.unsplash.com/photo-1625726411847-8cbb60cc71e6?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Broken Street Light",
      category: "Electricity",
      votes: 28,
      priority: "Medium",
      status: "in-progress",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Garbage Accumulation",
      category: "Sanitation",
      votes: 67,
      priority: "High",
      status: "pending",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
    },
  ];

  const statCards = [
    {
      title: "Total Reports",
      value: stats.total,
      icon: FileText,
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      gradient: "from-yellow-500 to-orange-600",
    },
    {
      title: "Solved",
      value: stats.solved,
      icon: CheckCircle,
      gradient: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="fixed top-0 left-0 h-full w-72 bg-white/70 backdrop-blur-[20px] shadow-2xl z-50 border-r border-white/50 lg:translate-x-0"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Admin Portal
            </h2>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          <nav className="space-y-2">
            <button className="flex items-center gap-3 w-full p-3 rounded-[12px] bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <FileText className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => navigate("/admin/block-citizen")}
              className="flex items-center gap-3 w-full p-3 rounded-[12px] hover:bg-white/60 transition-all duration-300"
            >
              <UserX className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700">Block Citizen</span>
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">District: Connaught Place</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <GlassCard key={index} hover delay={index * 0.1} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 mb-2">{stat.title}</p>
                    <p className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-16 h-16 rounded-[14px] bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Monthly Trend */}
        <GlassCard className="p-6 mb-8" delay={0.3}>
          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-6">
            District Monthly Report Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <defs>
                <linearGradient id="adminLineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
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
                stroke="url(#adminLineGradient)"
                strokeWidth={3}
                dot={{ fill: "#9333ea", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Reports List */}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-4">
          Complaint Management
        </h2>

        <div className="space-y-4">
          {reports.map((report, index) => (
            <GlassCard key={report.id} delay={0.4 + index * 0.1} className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <img
                  src={report.image}
                  alt={report.title}
                  className="w-full lg:w-48 h-48 object-cover rounded-[14px]"
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{report.title}</h3>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm rounded-full">
                          {report.category}
                        </span>
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${
                            report.priority === "High"
                              ? "bg-red-100 text-red-600 shadow-lg shadow-red-500/30"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {report.priority}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <ThumbsUp className="w-5 h-5" />
                      <span className="font-semibold">{report.votes}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-[10px] bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Mark Real
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-[10px] bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Mark Fake
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-[10px] bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Start Resolution
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-[10px] bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Before/After
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-[10px] bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Submit to Authority
                    </motion.button>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
