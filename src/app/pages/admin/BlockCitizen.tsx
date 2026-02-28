import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, UserX, UserCheck, Search } from "lucide-react";
import { GlassCard } from "../../components/GlassCard";

export default function BlockCitizen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [citizens, setCitizens] = useState([
    {
      id: 1,
      name: "John Citizen",
      email: "john@example.com",
      totalReports: 24,
      fakeReports: 2,
      blocked: false,
      blockReason: "",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
      totalReports: 15,
      fakeReports: 8,
      blocked: true,
      blockReason: "Multiple fake reports",
    },
    {
      id: 3,
      name: "Mike Smith",
      email: "mike@example.com",
      totalReports: 32,
      fakeReports: 0,
      blocked: false,
      blockReason: "",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      totalReports: 18,
      fakeReports: 12,
      blocked: true,
      blockReason: "Spam and fake reports",
    },
  ]);

  const toggleBlock = (id: number) => {
    setCitizens(
      citizens.map((citizen) => {
        if (citizen.id === id) {
          if (!citizen.blocked) {
            const reason = prompt("Enter block reason:");
            if (reason) {
              return { ...citizen, blocked: true, blockReason: reason };
            }
            return citizen;
          } else {
            return { ...citizen, blocked: false, blockReason: "" };
          }
        }
        return citizen;
      })
    );
  };

  const filteredCitizens = citizens.filter(
    (citizen) =>
      citizen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      citizen.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-2">
            Citizen Management
          </h1>
          <p className="text-gray-600">Block or unblock citizens based on report quality</p>
        </div>

        {/* Search */}
        <GlassCard className="p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
            />
          </div>
        </GlassCard>

        {/* Citizens Table */}
        <GlassCard className="p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Citizen Name</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Email</th>
                <th className="text-center py-4 px-4 font-semibold text-gray-700">Total Reports</th>
                <th className="text-center py-4 px-4 font-semibold text-gray-700">Fake Reports</th>
                <th className="text-center py-4 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-center py-4 px-4 font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCitizens.map((citizen, index) => (
                <motion.tr
                  key={citizen.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-100 hover:bg-white/50 transition-colors duration-300"
                >
                  <td className="py-4 px-4">
                    <div className="font-semibold text-gray-900">{citizen.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-600">{citizen.email}</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="font-semibold text-gray-900">{citizen.totalReports}</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        citizen.fakeReports > 5
                          ? "bg-red-100 text-red-600"
                          : citizen.fakeReports > 0
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {citizen.fakeReports}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {citizen.blocked ? (
                      <div className="flex flex-col items-center">
                        <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
                          Blocked
                        </span>
                        {citizen.blockReason && (
                          <span className="text-xs text-gray-500 mt-1">{citizen.blockReason}</span>
                        )}
                      </div>
                    ) : (
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleBlock(citizen.id)}
                      className={`px-4 py-2 rounded-[10px] font-semibold text-white shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto ${
                        citizen.blocked
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-green-500/30"
                          : "bg-gradient-to-r from-red-500 to-red-600 hover:shadow-red-500/30"
                      }`}
                    >
                      {citizen.blocked ? (
                        <>
                          <UserCheck className="w-4 h-4" />
                          Unblock
                        </>
                      ) : (
                        <>
                          <UserX className="w-4 h-4" />
                          Block
                        </>
                      )}
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {filteredCitizens.length === 0 && (
            <div className="text-center py-12 text-gray-500">No citizens found</div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
