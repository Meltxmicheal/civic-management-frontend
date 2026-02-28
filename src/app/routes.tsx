import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Terms from "./pages/Terms";
import RoleSelection from "./pages/RoleSelection";
import CitizenLogin from "./pages/citizen/CitizenLogin";
import CitizenSignup from "./pages/citizen/CitizenSignup";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import ReportIssue from "./pages/citizen/ReportIssue";
import ComplaintStatus from "./pages/citizen/ComplaintStatus";
import CitizenProfile from "./pages/citizen/CitizenProfile";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BlockCitizen from "./pages/admin/BlockCitizen";
import AuthorityLogin from "./pages/authority/AuthorityLogin";
import AuthorityDashboard from "./pages/authority/AuthorityDashboard";
import AdminManagement from "./pages/authority/AdminManagement";
import AuthoritySettings from "./pages/authority/AuthoritySettings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Terms },
      { path: "role-selection", Component: RoleSelection },
      
      // Citizen routes
      { path: "citizen/login", Component: CitizenLogin },
      { path: "citizen/signup", Component: CitizenSignup },
      { path: "citizen/dashboard", Component: CitizenDashboard },
      { path: "citizen/report-issue", Component: ReportIssue },
      { path: "citizen/complaint/:id", Component: ComplaintStatus },
      { path: "citizen/profile", Component: CitizenProfile },
      
      // Admin routes
      { path: "admin/login", Component: AdminLogin },
      { path: "admin/dashboard", Component: AdminDashboard },
      { path: "admin/block-citizen", Component: BlockCitizen },
      
      // Authority routes
      { path: "authority/login", Component: AuthorityLogin },
      { path: "authority/dashboard", Component: AuthorityDashboard },
      { path: "authority/admin-management", Component: AdminManagement },
      { path: "authority/settings", Component: AuthoritySettings },
    ],
  },
]);
