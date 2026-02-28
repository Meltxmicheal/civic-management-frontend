import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Building2,
  Users,
  AlertTriangle,
  TrendingUp,
  Menu,
  X,
  LogOut,
  Settings,
  UserCog,
  AlertCircle,
} from "lucide-react";
import { GlassCard } from "../../components/GlassCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function AuthorityDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    districts: 0,
    admins: 0,
    escalated: 0,
    approvalRate: 0,
  });

  useEffect(() => {
    const targetStats = { districts: 12, admins: 35, escalated: 8, approvalRate: 87 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setStats({
        districts: Math.floor((targetStats.districts * step) / steps),
        admins: Math.floor((targetStats.admins * step) / steps),
        escalated: Math.floor((targetStats.escalated * step) / steps),
        approvalRate: Math.floor((targetStats.approvalRate * step) / steps),
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const districtData = [
    { district: "CP", received: 156, pending: 42, resolved: 114 },
    { district: "Karol Bagh", received: 203, pending: 68, resolved: 135 },
    { district: "Dwarka", received: 178, pending: 55, resolved: 123 },
    { district: "Rohini", received: 145, pending: 38, resolved: 107 },
    { district: "Saket", received: 189, pending: 62, resolved: 127 },
    { district: "Vasant Kunj", received: 134, pending: 29, resolved: 105 },
  ];

  const highPriorityIssues = [
    {
      id: 1,
      title: "Major Road Damage - Karol Bagh",
      votes: 342,
      days: 5,
      critical: true,
    },
    {
      id: 2,
      title: "Water Supply Failure - Dwarka Sector 10",
      votes: 289,
      days: 4,
      critical: true,
    },
    {
      id: 3,
      title: "Electricity Outage - Rohini Sector 7",
      votes: 256,
      days: 3,
      critical: false,
    },
    {
      id: 4,
      title: "Sanitation Crisis - Saket",
      votes: 198,
      days: 6,
      critical: true,
    },
  ];

  const statCards = [
    {
      title: "Total Districts",
      value: stats.districts,
      icon: Building2,
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      title: "Active Admins",
      value: stats.admins,
      icon: Users,
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      title: "Escalated Issues",
      value: stats.escalated,
      icon: AlertTriangle,
      gradient: "from-red-500 to-orange-600",
    },
    {
      title: "Approval Rate",
      value: `${stats.approvalRate}%`,
      icon: TrendingUp,
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
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
              Authority Portal
            </h2>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          <nav className="space-y-2">
            <button className="flex items-center gap-3 w-full p-3 rounded-[12px] bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
              <Building2 className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => navigate("/authority/admin-management")}
              className="flex items-center gap-3 w-full p-3 rounded-[12px] hover:bg-white/60 transition-all duration-300"
            >
              <UserCog className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700">Admin Management</span>
            </button>
            <button
              onClick={() => navigate("/authority/settings")}
              className="flex items-center gap-3 w-full p-3 rounded-[12px] hover:bg-white/60 transition-all duration-300"
            >
              <Settings className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700">Settings</span>
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
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
              Authority Dashboard
            </h1>
            <p className="text-gray-600">Central Control Panel - All Districts</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <GlassCard key={index} hover delay={index * 0.1} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 mb-2">{stat.title}</p>
                    <p className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-14 h-14 rounded-[14px] bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* District-Based Bar Chart */}
        <GlassCard className="p-6 mb-8" delay={0.4}>
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent mb-6">
            District-Based Report Analysis
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={districtData}>
              <defs>
                <linearGradient id="receivedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="pendingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
                <linearGradient id="resolvedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="district" stroke="#6b7280" />
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
              <Legend />
              <Bar dataKey="received" fill="url(#receivedGradient)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="pending" fill="url(#pendingGradient)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="resolved" fill="url(#resolvedGradient)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* High Priority Issues */}
        <GlassCard className="p-6" delay={0.5}>
          <h2 className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-red-500" />
            High Priority Issues
          </h2>

          <div className="space-y-4">
            {highPriorityIssues.map((issue, index) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`p-4 rounded-[14px] border-2 ${
                  issue.critical
                    ? "bg-red-50 border-red-300 animate-pulse-border"
                    : "bg-orange-50 border-orange-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{issue.title}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">
                        <strong>{issue.votes}</strong> votes
                      </span>
                      <span className="text-gray-600">
                        Pending for <strong>{issue.days} days</strong>
                      </span>
                    </div>
                  </div>
                  {issue.critical && (
                    <div className="px-4 py-2 bg-red-600 text-white rounded-[10px] font-semibold text-sm animate-pulse">
                      CRITICAL
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <style>{`
        @keyframes pulse-border {
          0%, 100% { border-color: rgb(252 165 165); }
          50% { border-color: rgb(239 68 68); }
        }
        .animate-pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
