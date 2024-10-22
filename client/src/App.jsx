import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
// import { NotificationsProvider } from "@mantine/notifications";

import { AuthProvider } from "./context/AuthContext.jsx";
import RequireAuth from "./components/RequireAuth/RequireAuth.jsx";

import ArchiveUsersPage from "./pages/ArchivingPages/ArchiveUsersPage.jsx";
import ArchiveNotificationsPage from "./pages/ArchivingPages/ArchiveNotificationsPage.jsx";
import ArchiveAnnouncementsPage from "./pages/ArchivingPages/ArchiveAnnouncementsPage.jsx";

import CreateUserPage from "./pages/UserManagementPages/CreateUserPage.jsx";
import DeleteUserPage from "./pages/UserManagementPages/DeleteUserPage.jsx";
import ResetUserPasswordPage from "./pages/UserManagementPages/ResetUserPasswordPage.jsx";

import CreateCustomRolePage from "./pages/RoleManagementPages/CreateCustomRolePage.jsx";
import EditUserRolePage from "./pages/RoleManagementPages/EditUserRolePage.jsx";
import ManageRoleAccessPage from "./pages/RoleManagementPages/ManageRoleAccessPage.jsx";

import SystemAdminDashboard from "./pages/DashboardPage/SystemAdminDashboard.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import TopDrawer from "./pages/TopDrawer/TopDrawer.jsx";
import { Notifications } from '@mantine/notifications';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Notifications />
      <AuthProvider>
      <Router>
        <TopDrawer />
        <Routes>
          <Route path="/" element={
            <RequireAuth>
              <SystemAdminDashboard />
            </RequireAuth>} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route
            path="/UserManagement/CreateUser"
            element={<CreateUserPage />}
          />
          <Route
            path="/UserManagement/DeleteUser"
            element={<DeleteUserPage />}
          />
          <Route
            path="/UserManagement/ResetUserPassword"
            element={<ResetUserPasswordPage />}
          />
          <Route
            path="/RoleManagement/CreateCustomRole"
            element={<CreateCustomRolePage />}
          />
          <Route
            path="/RoleManagement/EditUserRole"
            element={<EditUserRolePage />}
          />
          <Route
            path="/RoleManagement/ManageRoleAccess"
            element={<ManageRoleAccessPage />}
          />
          <Route path="/archive/users" element={<ArchiveUsersPage />} />
          <Route
            path="/archive/notifications"
            element={<ArchiveNotificationsPage />}
          />
          <Route
            path="/archive/announcements"
            element={<ArchiveAnnouncementsPage />}
          />
        </Routes>
      </Router>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
