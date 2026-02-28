import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Upload,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  UserCog,
} from "lucide-react";
import { GlassCard } from "../../components/GlassCard";
import { GradientButton } from "../../components/GradientButton";

export default function AdminManagement() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<number | null>(null);
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@admin.gov",
      phone: "9876543210",
      district: "Connaught Place",
      status: "active",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@admin.gov",
      phone: "9876543211",
      district: "Karol Bagh",
      status: "active",
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit@admin.gov",
      phone: "9876543212",
      district: "Dwarka",
      status: "inactive",
    },
  ]);

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    phone: "",
    district: "",
  });

  const districts = [
    "Connaught Place",
    "Karol Bagh",
    "Dwarka",
    "Rohini",
    "Saket",
    "Vasant Kunj",
    "Lajpat Nagar",
    "Nehru Place",
    "Janakpuri",
    "Mayur Vihar",
    "Pitampura",
    "Punjabi Bagh",
  ];

  const handleAddAdmin = () => {
    const id = Math.max(...admins.map((a) => a.id)) + 1;
    setAdmins([
      ...admins,
      {
        id,
        ...newAdmin,
        status: "active",
      },
    ]);
    setNewAdmin({ name: "", email: "", phone: "", district: "" });
    setShowAddModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this admin?")) {
      setAdmins(admins.filter((admin) => admin.id !== id));
    }
  };

  const toggleStatus = (id: number) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === id
          ? { ...admin, status: admin.status === "active" ? "inactive" : "active" }
          : admin
      )
    );
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/authority/dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent mb-2">
            Admin Management
          </h1>
          <p className="text-gray-600">Manage district admins and their assignments</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <GradientButton onClick={() => setShowAddModal(true)}>
            <Plus className="w-5 h-5 mr-2 inline" />
            Add Admin Manually
          </GradientButton>
          <button className="px-6 py-3 rounded-[14px] bg-white/60 backdrop-blur-[20px] border border-gray-200 font-semibold hover:bg-white/80 transition-all duration-300 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload CSV
          </button>
        </div>

        {/* Admins Table */}
        <GlassCard className="p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Name</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Email</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Phone</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">District</th>
                <th className="text-center py-4 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-center py-4 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, index) => (
                <motion.tr
                  key={admin.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-100 hover:bg-white/50 transition-colors duration-300"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                        {admin.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-900">{admin.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{admin.email}</td>
                  <td className="py-4 px-4 text-gray-600">{admin.phone}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full text-sm">
                      {admin.district}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => toggleStatus(admin.id)}
                      className="inline-flex items-center gap-2"
                    >
                      {admin.status === "active" ? (
                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-semibold flex items-center gap-1">
                          <XCircle className="w-4 h-4" />
                          Inactive
                        </span>
                      )}
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowEditModal(admin.id)}
                        className="p-2 rounded-[10px] bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-300"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(admin.id)}
                        className="p-2 rounded-[10px] bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>

      {/* Add Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/90 backdrop-blur-[20px] rounded-[20px] p-8 max-w-md w-full shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <UserCog className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
                Add New Admin
              </h2>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={newAdmin.name}
                onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                placeholder="Full Name"
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <input
                type="email"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <input
                type="tel"
                value={newAdmin.phone}
                onChange={(e) => setNewAdmin({ ...newAdmin, phone: e.target.value })}
                placeholder="Phone Number"
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <select
                value={newAdmin.district}
                onChange={(e) => setNewAdmin({ ...newAdmin, district: e.target.value })}
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                <option value="">Select District</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 mt-6">
              <GradientButton onClick={handleAddAdmin} className="flex-1">
                Add Admin
              </GradientButton>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 rounded-[14px] bg-white/50 border border-gray-200 font-semibold hover:bg-white/70 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
