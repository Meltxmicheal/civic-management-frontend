import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, User, Lock, Shield, Monitor, Save } from "lucide-react";
import { GlassCard } from "../../components/GlassCard";
import { GradientButton } from "../../components/GradientButton";

export default function AuthoritySettings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"profile" | "password" | "security">("profile");
  const [profile, setProfile] = useState({
    name: "Admin Authority",
    email: "authority@gov.in",
    phone: "9876543210",
    designation: "Chief Administrator",
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: true,
    emailNotifications: true,
    smsAlerts: false,
    loginAlerts: true,
  });

  const [sessions] = useState([
    {
      id: 1,
      device: "Chrome on Windows",
      location: "New Delhi, India",
      lastActive: "Active now",
      current: true,
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "New Delhi, India",
      lastActive: "2 hours ago",
      current: false,
    },
  ]);

  const handleProfileUpdate = () => {
    alert("Profile updated successfully!");
  };

  const handlePasswordUpdate = () => {
    if (passwordData.new !== passwordData.confirm) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
    setPasswordData({ current: "", new: "", confirm: "" });
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "password", label: "Password", icon: Lock },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate("/authority/dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className="text-gray-600">Manage your account and security preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <GlassCard className="p-4">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-3 w-full p-3 rounded-[12px] transition-all duration-300 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
                          : "hover:bg-white/60 text-gray-700"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-semibold">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </GlassCard>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Designation</label>
                    <input
                      type="text"
                      value={profile.designation}
                      onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                  </div>
                  <GradientButton onClick={handleProfileUpdate}>
                    <Save className="w-5 h-5 mr-2 inline" />
                    Save Changes
                  </GradientButton>
                </div>
              </GlassCard>
            )}

            {activeTab === "password" && (
              <GlassCard className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>
                <div className="space-y-5">
                  <div>
                    <label className="block text-gray-700 mb-2">Current Password</label>
                    <input
                      type="password"
                      value={passwordData.current}
                      onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      value={passwordData.new}
                      onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordData.confirm}
                      onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                  </div>
                  <GradientButton onClick={handlePasswordUpdate}>
                    Update Password
                  </GradientButton>
                </div>
              </GlassCard>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <GlassCard className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/50 rounded-[14px]">
                      <div>
                        <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-600">Add an extra layer of security</p>
                      </div>
                      <button
                        onClick={() =>
                          setSecuritySettings({ ...securitySettings, twoFactor: !securitySettings.twoFactor })
                        }
                        className={`w-14 h-8 rounded-full transition-all duration-300 ${
                          securitySettings.twoFactor
                            ? "bg-gradient-to-r from-purple-500 to-indigo-600"
                            : "bg-gray-300"
                        }`}
                      >
                        <motion.div
                          animate={{ x: securitySettings.twoFactor ? 24 : 0 }}
                          className="w-6 h-6 bg-white rounded-full shadow-lg mx-1 mt-1"
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/50 rounded-[14px]">
                      <div>
                        <h3 className="font-semibold text-gray-900">Email Notifications</h3>
                        <p className="text-sm text-gray-600">Receive updates via email</p>
                      </div>
                      <button
                        onClick={() =>
                          setSecuritySettings({
                            ...securitySettings,
                            emailNotifications: !securitySettings.emailNotifications,
                          })
                        }
                        className={`w-14 h-8 rounded-full transition-all duration-300 ${
                          securitySettings.emailNotifications
                            ? "bg-gradient-to-r from-purple-500 to-indigo-600"
                            : "bg-gray-300"
                        }`}
                      >
                        <motion.div
                          animate={{ x: securitySettings.emailNotifications ? 24 : 0 }}
                          className="w-6 h-6 bg-white rounded-full shadow-lg mx-1 mt-1"
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/50 rounded-[14px]">
                      <div>
                        <h3 className="font-semibold text-gray-900">SMS Alerts</h3>
                        <p className="text-sm text-gray-600">Get alerts via text message</p>
                      </div>
                      <button
                        onClick={() =>
                          setSecuritySettings({ ...securitySettings, smsAlerts: !securitySettings.smsAlerts })
                        }
                        className={`w-14 h-8 rounded-full transition-all duration-300 ${
                          securitySettings.smsAlerts
                            ? "bg-gradient-to-r from-purple-500 to-indigo-600"
                            : "bg-gray-300"
                        }`}
                      >
                        <motion.div
                          animate={{ x: securitySettings.smsAlerts ? 24 : 0 }}
                          className="w-6 h-6 bg-white rounded-full shadow-lg mx-1 mt-1"
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/50 rounded-[14px]">
                      <div>
                        <h3 className="font-semibold text-gray-900">Login Alerts</h3>
                        <p className="text-sm text-gray-600">Get notified of new logins</p>
                      </div>
                      <button
                        onClick={() =>
                          setSecuritySettings({ ...securitySettings, loginAlerts: !securitySettings.loginAlerts })
                        }
                        className={`w-14 h-8 rounded-full transition-all duration-300 ${
                          securitySettings.loginAlerts
                            ? "bg-gradient-to-r from-purple-500 to-indigo-600"
                            : "bg-gray-300"
                        }`}
                      >
                        <motion.div
                          animate={{ x: securitySettings.loginAlerts ? 24 : 0 }}
                          className="w-6 h-6 bg-white rounded-full shadow-lg mx-1 mt-1"
                        />
                      </button>
                    </div>
                  </div>
                </GlassCard>

                {/* Active Sessions */}
                <GlassCard className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Sessions</h2>
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between p-4 bg-white/50 rounded-[14px]"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                            <Monitor className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{session.device}</h3>
                            <p className="text-sm text-gray-600">
                              {session.location} • {session.lastActive}
                            </p>
                          </div>
                        </div>
                        {session.current ? (
                          <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
                            Current
                          </span>
                        ) : (
                          <button className="px-4 py-2 bg-red-100 text-red-600 rounded-[10px] text-sm font-semibold hover:bg-red-200 transition-colors duration-300">
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
