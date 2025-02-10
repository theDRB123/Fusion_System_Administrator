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

// import CreateUserPage from "./pages/UserManagementPages/CreateUserPage.jsx";
import DeleteUserPage from "./pages/UserManagementPages/DeleteUserPage.jsx";
import ResetUserPasswordPage from "./pages/UserManagementPages/ResetUserPasswordPage.jsx";
import StudentCreationPage from "./pages/UserManagementPages/StudentCreationPage.jsx";
import FacultyCreationPage from "./pages/UserManagementPages/FacultyCreationPage.jsx";
import StaffCreationPage from "./pages/UserManagementPages/StaffCreationPage.jsx";

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
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/UserManagement/CreateStudent"
              element={
                <RequireAuth>
                  <StudentCreationPage />
                </RequireAuth>}
            />
            <Route
              path="/UserManagement/CreateFaculty"
              element={
                <RequireAuth>
                  <FacultyCreationPage />
                </RequireAuth>}
            />
            <Route
              path="/UserManagement/CreateStaff"
              element={
                <RequireAuth>
                  <StaffCreationPage />
                </RequireAuth>}
            />
            <Route
              path="/UserManagement/DeleteUser"
              element={
                <RequireAuth>
                  <DeleteUserPage />
                </RequireAuth>}
            />
            <Route
              path="/UserManagement/ResetUserPassword"
              element={
                <RequireAuth>
                  <ResetUserPasswordPage />
                </RequireAuth>}
            />
            <Route
              path="/RoleManagement/CreateCustomRole"
              element={
                <RequireAuth>
                  <CreateCustomRolePage />
                </RequireAuth>}
            />
            <Route
              path="/RoleManagement/EditUserRole"
              element={
                <RequireAuth>
                  <EditUserRolePage />
                </RequireAuth>}
            />
            <Route
              path="/RoleManagement/ManageRoleAccess"
              element={
                <RequireAuth>
                  <ManageRoleAccessPage />
                </RequireAuth>}
            />
            <Route path="/archive/users" element={
              <RequireAuth>
                <ArchiveUsersPage />
              </RequireAuth>} />
            <Route
              path="/archive/notifications"
              element={
                <RequireAuth>
                  <ArchiveNotificationsPage />
                </RequireAuth>}
            />
            <Route
              path="/archive/announcements"
              element={
                <RequireAuth>
                  <ArchiveAnnouncementsPage />
                </RequireAuth>}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
