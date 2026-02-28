import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Upload, MapPin, Calendar, Clock, ArrowLeft, AlertTriangle, CheckCircle2, Loader } from "lucide-react";
import { GlassCard } from "../../components/GlassCard";
import { GradientButton } from "../../components/GradientButton";

export default function ReportIssue() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"select" | "camera" | "upload" | "processing" | "duplicate" | "success">("select");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    location: "",
    latitude: "",
    longitude: "",
  });
  const [severity, setSeverity] = useState(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setMode("processing");
        
        // Simulate AI processing
        setTimeout(() => {
          setSeverity(Math.floor(Math.random() * 40) + 60); // 60-100
          
          // Simulate duplicate check (20% chance)
          if (Math.random() > 0.8) {
            setMode("duplicate");
          } else {
            setMode("upload");
            // Auto-detect location
            setFormData({
              ...formData,
              latitude: "28.6139",
              longitude: "77.2090",
              location: "Connaught Place, New Delhi",
            });
          }
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // Simulated camera capture
    setImagePreview("https://images.unsplash.com/photo-1625726411847-8cbb60cc71e6?w=800&h=600&fit=crop");
    setMode("processing");
    
    setTimeout(() => {
      setSeverity(75);
      setMode("upload");
      setFormData({
        ...formData,
        latitude: "28.6139",
        longitude: "77.2090",
        location: "Connaught Place, New Delhi",
      });
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMode("success");
    setTimeout(() => {
      navigate("/citizen/dashboard");
    }, 2000);
  };

  // Success screen
  if (mode === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center"
        >
          <GlassCard className="p-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center"
            >
              <CheckCircle2 className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
              Report Submitted!
            </h2>
            <p className="text-gray-600">Your report has been submitted successfully</p>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  // AI Processing screen
  if (mode === "processing") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <GlassCard className="p-12 text-center">
          <Loader className="w-16 h-16 mx-auto mb-6 text-purple-600 animate-spin" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
            AI Processing...
          </h2>
          <p className="text-gray-600">Analyzing image and detecting issues</p>
        </GlassCard>
      </div>
    );
  }

  // Duplicate detection screen
  if (mode === "duplicate") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl"
        >
          <GlassCard className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Duplicate Detected</h2>
                <p className="text-gray-600">A similar issue has already been reported</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Your Report</p>
                <img src={imagePreview || ""} alt="Your report" className="w-full h-48 object-cover rounded-[14px]" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Existing Report</p>
                <img
                  src="https://images.unsplash.com/photo-1625726411847-8cbb60cc71e6?w=400&h=300&fit=crop"
                  alt="Existing report"
                  className="w-full h-48 object-cover rounded-[14px]"
                />
                <div className="mt-2 text-sm">
                  <p className="text-gray-700">Reported 3 days ago</p>
                  <p className="text-gray-700">45 votes • Status: Under Review</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <GradientButton onClick={() => setMode("select")} className="flex-1">
                Report New Issue
              </GradientButton>
              <button
                onClick={() => navigate("/citizen/dashboard")}
                className="flex-1 px-6 py-3 rounded-[14px] bg-white/50 border border-gray-200 font-semibold hover:bg-white/70 transition-all duration-300"
              >
                Merge & Vote
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  // Upload/Camera form
  if (mode === "upload" || mode === "camera") {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setMode("select")}
            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <GlassCard className="p-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
              Report Issue Details
            </h1>

            {/* Image preview with watermark */}
            {imagePreview && (
              <div className="relative mb-6 rounded-[18px] overflow-hidden">
                <img src={imagePreview} alt="Preview" className="w-full h-80 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4 text-white text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{new Date().toLocaleTimeString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>New Delhi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Lat: {formData.latitude}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Severity Score */}
            <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-[14px] border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">AI Severity Score</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  {severity}%
                </span>
              </div>
              <div className="h-2 bg-white rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${severity}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-600"
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {severity >= 80 ? "High Priority" : severity >= 60 ? "Medium Priority" : "Low Priority"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Category */}
              <div>
                <label className="block text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <option value="">Select Category</option>
                  <option value="roads">Roads</option>
                  <option value="electricity">Electricity</option>
                  <option value="sanitation">Sanitation</option>
                  <option value="water">Water Supply</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the issue in detail..."
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Location detected automatically"
                    className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    readOnly
                  />
                </div>
              </div>

              <GradientButton type="submit" className="w-full">
                Submit Report
              </GradientButton>
            </form>
          </GlassCard>
        </div>
      </div>
    );
  }

  // Initial selection screen
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <button
          onClick={() => navigate("/citizen/dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
            Report an Issue
          </h1>
          <p className="text-gray-600">Choose how you want to submit your report</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Camera Capture */}
          <motion.div whileHover={{ scale: 1.02, y: -4 }}>
            <GlassCard className="p-8 cursor-pointer" hover onClick={handleCameraCapture}>
              <div className="w-20 h-20 mx-auto mb-6 rounded-[16px] bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                <Camera className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-3 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Camera Capture
              </h2>
              <p className="text-gray-600 text-center">
                Take a photo with automatic watermark including date, time, and GPS location
              </p>
            </GlassCard>
          </motion.div>

          {/* Upload from Gallery */}
          <motion.div whileHover={{ scale: 1.02, y: -4 }}>
            <label className="cursor-pointer">
              <GlassCard className="p-8" hover>
                <div className="w-20 h-20 mx-auto mb-6 rounded-[16px] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-3 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Upload from Gallery
                </h2>
                <p className="text-gray-600 text-center">
                  Choose an existing photo from your device with AI classification
                </p>
              </GlassCard>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </motion.div>
        </div>

        {/* Offline mode notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-[14px] text-center"
        >
          <p className="text-blue-700 text-sm">
            📱 No internet? Reports are saved locally and will be submitted when you're back online
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
