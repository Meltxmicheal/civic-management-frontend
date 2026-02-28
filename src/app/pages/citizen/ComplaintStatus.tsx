import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle, Circle, AlertCircle, XCircle } from "lucide-react";
import { GlassCard } from "../../components/GlassCard";

export default function ComplaintStatus() {
  const navigate = useNavigate();
  const { id } = useParams();

  const statuses = [
    { step: "Submitted", completed: true, current: false },
    { step: "Under Review", completed: true, current: false },
    { step: "Assigned to Admin", completed: true, current: false },
    { step: "In Progress", completed: false, current: true },
    { step: "Submitted to Authority", completed: false, current: false },
    { step: "Verified", completed: false, current: false },
    { step: "Closed", completed: false, current: false },
  ];

  const complaint = {
    id: id || "1",
    title: "Pothole on Main Street",
    category: "Roads",
    description: "Large pothole causing traffic issues and vehicle damage",
    image: "https://images.unsplash.com/photo-1625726411847-8cbb60cc71e6?w=800&h=600&fit=crop",
    submittedDate: "2026-02-20",
    location: "Connaught Place, New Delhi",
    priority: "High",
    votes: 45,
    status: "in-progress",
    isFake: false,
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/citizen/dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <GlassCard className="p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                {complaint.title}
              </h1>
              <p className="text-gray-600">Report ID: #{complaint.id}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-sm font-semibold">
                {complaint.category}
              </span>
              <span className="px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
                {complaint.priority} Priority
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <img
              src={complaint.image}
              alt={complaint.title}
              className="w-full h-80 object-cover rounded-[18px]"
            />
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{complaint.description}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                <p className="text-gray-600">{complaint.location}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Submitted On</h3>
                <p className="text-gray-600">{new Date(complaint.submittedDate).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Community Support</h3>
                <p className="text-gray-600">{complaint.votes} votes</p>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Timeline */}
        <GlassCard className="p-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-8">
            Report Status Timeline
          </h2>

          <div className="space-y-6">
            {statuses.map((status, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="relative">
                  {status.completed ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg"
                    >
                      <CheckCircle className="w-6 h-6 text-white" />
                    </motion.div>
                  ) : status.current ? (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-10 h-10 rounded-full bg-white border-4 border-purple-600 shadow-lg shadow-purple-500/50"
                    >
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-500 to-purple-600 animate-pulse" />
                    </motion.div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <Circle className="w-6 h-6 text-gray-400" />
                    </div>
                  )}

                  {index < statuses.length - 1 && (
                    <div
                      className={`absolute left-1/2 top-10 w-0.5 h-12 -translate-x-1/2 ${
                        status.completed
                          ? "bg-gradient-to-b from-purple-600 to-pink-500"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>

                <div className="flex-1">
                  <h3
                    className={`font-semibold ${
                      status.completed || status.current ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {status.step}
                  </h3>
                  {status.current && (
                    <p className="text-sm text-purple-600">Currently in progress...</p>
                  )}
                  {status.completed && (
                    <p className="text-sm text-gray-600">Completed</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {complaint.isFake && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-red-50 border-2 border-red-200 rounded-[18px] flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-red-900 mb-1">Report Rejected</h3>
                <p className="text-red-700">
                  This report has been marked as fake. No issue was found at the reported location.
                </p>
              </div>
            </motion.div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
