import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Phone, Lock, ArrowLeft, AlertCircle } from "lucide-react";
import { GlassCard } from "../../components/GlassCard";
import { GradientButton } from "../../components/GradientButton";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"phone" | "otp" | "password">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate phone check
    if (phone.length === 10) {
      setStep("otp");
    } else {
      setError("Please enter a valid 10-digit phone number");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`admin-otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.every((digit) => digit !== "")) {
      setStep("password");
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, verify phone exists in Authority DB
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <button
          onClick={() => navigate("/role-selection")}
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Role Selection</span>
        </button>

        <GlassCard className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-2">
              Admin Login
            </h1>
            <p className="text-gray-600">Access District Management Portal</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-[12px] flex items-center gap-2"
            >
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-600 text-sm">{error}</span>
            </motion.div>
          )}

          {step === "phone" && (
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Mobile Number"
                  maxLength={10}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                />
              </div>
              <GradientButton type="submit" className="w-full">
                Send OTP
              </GradientButton>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <p className="text-gray-600 text-center mb-4">
                  Enter OTP sent to +91 {phone}
                </p>
                <div className="flex gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`admin-otp-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      maxLength={1}
                      className="w-full h-14 text-center text-2xl font-bold bg-white/50 border border-gray-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                    />
                  ))}
                </div>
              </div>
              <GradientButton type="submit" className="w-full">
                Verify OTP
              </GradientButton>
            </form>
          )}

          {step === "password" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                />
              </div>
              <GradientButton type="submit" className="w-full">
                Login
              </GradientButton>
            </form>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
