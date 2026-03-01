export const API_BASE = "https://civic-backend-production-0ed0.up.railway.app";
export function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
}