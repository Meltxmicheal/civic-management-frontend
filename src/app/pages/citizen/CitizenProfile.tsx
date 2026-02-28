import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Award,
  Trophy,
  Star,
  Download,
  TrendingUp,
  Target,
  Zap,
  Shield,
} from "lucide-react";
import { GlassCard } from "../../components/GlassCard";

export default function CitizenProfile() {
  const navigate = useNavigate();
  const [selectedBadge, setSelectedBadge] = useState<number | null>(null);

  const profile = {
    name: "John Citizen",
    email: "john@example.com",
    level: 7,
    points: 1450,
    trustScore: 92,
    nextLevelPoints: 1800,
  };

  const achievements = [
    {
      id: 1,
      title: "First Reporter",
      description: "Submitted your first report",
      icon: Star,
      unlocked: true,
      date: "2025-11-15",
    },
    {
      id: 2,
      title: "Community Hero",
      description: "Received 50+ votes on your reports",
      icon: Trophy,
      unlocked: true,
      date: "2026-01-10",
    },
    {
      id: 3,
      title: "Eagle Eye",
      description: "Reported 10 high-priority issues",
      icon: Target,
      unlocked: true,
      date: "2026-02-05",
    },
    {
      id: 4,
      title: "Quick Responder",
      description: "Submitted 5 reports in one week",
      icon: Zap,
      unlocked: true,
      date: "2025-12-20",
    },
    {
      id: 5,
      title: "Trusted Citizen",
      description: "Maintain 90+ trust score for 30 days",
      icon: Shield,
      unlocked: true,
      date: "2026-02-01",
    },
    {
      id: 6,
      title: "Change Maker",
      description: "Get 100+ votes total (Progress: 45/100)",
      icon: TrendingUp,
      unlocked: false,
      date: null,
    },
  ];

  const leaderboard = [
    { rank: 1, name: "Sarah Johnson", points: 2850, glow: true },
    { rank: 2, name: "Mike Davis", points: 2340, glow: true },
    { rank: 3, name: "Emma Wilson", points: 1950, glow: true },
    { rank: 4, name: "John Citizen", points: 1450, glow: false, isYou: true },
    { rank: 5, name: "Alex Brown", points: 1230, glow: false },
  ];

  const progressPercentage = ((profile.points - 1200) / (profile.nextLevelPoints - 1200)) * 100;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/citizen/dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <GlassCard className="p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 p-1"
                  >
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <span className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                        {profile.name.charAt(0)}
                      </span>
                    </div>
                  </motion.div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold">{profile.level}</span>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-gray-600 text-sm">{profile.email}</p>
              </div>

              {/* Points */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-semibold">Points</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                    {profile.points}
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-600"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {profile.nextLevelPoints - profile.points} points to Level {profile.level + 1}
                </p>
              </div>

              {/* Trust Score */}
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-[14px] border border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-900">Trust Score</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{profile.trustScore}%</span>
                </div>
              </div>
            </GlassCard>

            {/* Leaderboard */}
            <GlassCard className="p-6 mt-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
                Leaderboard
              </h3>
              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <motion.div
                    key={user.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: user.rank * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-[12px] ${
                      user.isYou
                        ? "bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-purple-300"
                        : user.glow
                        ? "bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200"
                        : "bg-white/50"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        user.rank === 1
                          ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white"
                          : user.rank === 2
                          ? "bg-gradient-to-br from-gray-300 to-gray-500 text-white"
                          : user.rank === 3
                          ? "bg-gradient-to-br from-orange-400 to-orange-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {user.rank}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">
                        {user.name}
                        {user.isYou && <span className="text-purple-600 ml-2">(You)</span>}
                      </p>
                      <p className="text-xs text-gray-600">{user.points} points</p>
                    </div>
                    {user.rank <= 3 && <Trophy className="w-5 h-5 text-yellow-500" />}
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Achievements */}
          <div className="lg:col-span-2">
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
                Achievements & Badges
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: achievement.unlocked ? 1.02 : 1, rotate: achievement.unlocked ? [0, -2, 2, 0] : 0 }}
                      onClick={() => achievement.unlocked && setSelectedBadge(achievement.id)}
                      className={`p-6 rounded-[18px] cursor-pointer transition-all duration-300 ${
                        achievement.unlocked
                          ? "bg-gradient-to-br from-white/80 to-white/60 border-2 border-purple-300 shadow-lg"
                          : "bg-gray-100/50 border border-gray-300 opacity-60"
                      }`}
                    >
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-[14px] flex items-center justify-center ${
                          achievement.unlocked
                            ? "bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg"
                            : "bg-gray-300"
                        }`}
                      >
                        <Icon className={`w-8 h-8 ${achievement.unlocked ? "text-white" : "text-gray-500"}`} />
                      </div>
                      <h3 className={`font-bold text-center mb-2 ${achievement.unlocked ? "text-gray-900" : "text-gray-500"}`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm text-center ${achievement.unlocked ? "text-gray-600" : "text-gray-400"}`}>
                        {achievement.description}
                      </p>
                      {achievement.unlocked && achievement.date && (
                        <p className="text-xs text-center text-purple-600 mt-2">
                          Unlocked: {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Badge Certificate Modal */}
      {selectedBadge && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedBadge(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[20px] p-8 max-w-md w-full shadow-2xl"
          >
            {(() => {
              const badge = achievements.find((a) => a.id === selectedBadge);
              if (!badge) return null;
              const Icon = badge.icon;
              return (
                <>
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-[18px] bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-xl">
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                      {badge.title}
                    </h2>
                    <p className="text-gray-600">{badge.description}</p>
                    {badge.date && (
                      <p className="text-sm text-gray-500 mt-2">
                        Achieved on {new Date(badge.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <button
                    className="w-full px-6 py-3 rounded-[14px] bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all duration-300"
                  >
                    <Download className="w-5 h-5" />
                    Download Certificate
                  </button>
                </>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
