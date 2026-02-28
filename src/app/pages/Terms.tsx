import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export default function Terms() {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    navigate("/role-selection");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-3xl bg-white/60 backdrop-blur-[20px] rounded-[20px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
          Terms & Conditions
        </h1>
        <p className="text-gray-600 mb-6">SMART CIVIC GOVERNANCE Platform</p>

        <div className="h-[400px] overflow-y-auto pr-4 mb-6 scrollbar-custom">
          <div className="space-y-4 text-gray-700">
            <section>
              <h3 className="font-semibold mb-2">1. Acceptance of Terms</h3>
              <p>
                By accessing and using the SMART CIVIC GOVERNANCE platform, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">2. Use of Platform</h3>
              <p>
                This platform is designed to facilitate civic engagement and community-based district management. Users agree to use the platform responsibly and in accordance with all applicable laws and regulations.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">3. User Responsibilities</h3>
              <p>
                Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. False reporting or misuse of the platform may result in account suspension.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">4. Privacy & Data Collection</h3>
              <p>
                We collect location data, images, and other information necessary to process civic reports. This data is used to improve community services and may be shared with relevant authorities for issue resolution.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">5. AI-Powered Classification</h3>
              <p>
                The platform uses AI to classify and prioritize reports. While we strive for accuracy, users acknowledge that automated systems may occasionally produce errors.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">6. Gamification & Rewards</h3>
              <p>
                Points, badges, and trust scores are awarded based on platform engagement. These are for motivational purposes only and hold no monetary value.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">7. Content Ownership</h3>
              <p>
                By submitting reports and images, you grant the platform a license to use, modify, and display the content for the purposes of civic management and improvement.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">8. Limitation of Liability</h3>
              <p>
                The platform is provided "as is" without warranties. We are not liable for any damages arising from the use or inability to use the platform.
              </p>
            </section>
          </div>
        </div>

        <div className="flex items-start gap-3 mb-6">
          <button
            onClick={() => setAccepted(!accepted)}
            className="mt-1 shrink-0"
          >
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                accepted
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 border-transparent"
                  : "border-gray-300 bg-white"
              }`}
            >
              {accepted && <CheckCircle2 className="w-4 h-4 text-white" />}
            </div>
          </button>
          <label className="text-sm text-gray-700 cursor-pointer" onClick={() => setAccepted(!accepted)}>
            I have read and agree to the Terms & Conditions and Privacy Policy of the SMART CIVIC GOVERNANCE platform.
          </label>
        </div>

        <motion.button
          whileHover={{ scale: accepted ? 1.02 : 1 }}
          whileTap={{ scale: accepted ? 0.98 : 1 }}
          onClick={handleAccept}
          disabled={!accepted}
          className={`w-full py-4 rounded-[16px] font-semibold text-white transition-all duration-300 ${
            accepted
              ? "bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Accept & Continue
        </motion.button>
      </motion.div>

      <style>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ec4899, #9333ea);
          border-radius: 10px;
        }
      `}</style>
    </motion.div>
  );
}
