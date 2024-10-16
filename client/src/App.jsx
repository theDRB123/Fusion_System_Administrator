import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

import ArchiveUsersPage from './pages/ArchivingPages/ArchiveUsersPage.jsx';
import ArchiveNotificationsPage from './pages/ArchivingPages/ArchiveNotificationsPage.jsx';
import ArchiveAnnouncementsPage from './pages/ArchivingPages/ArchiveAnnouncementsPage.jsx';

import CreateUserPage from './pages/UserManagementPages/CreateUserPage.jsx';
import DeleteUserPage from './pages/UserManagementPages/DeleteUserPage.jsx';
import ResetUserPasswordPage from './pages/UserManagementPages/ResetUserPasswordPage.jsx';

import CreateCustomRolePage from './pages/RoleManagementPages/CreateCustomRolePage.jsx';
import EditUserRolePage from './pages/RoleManagementPages/EditUserRolePage.jsx';
import ManageRoleAccessPage from './pages/RoleManagementPages/ManageRoleAccessPage.jsx';

import SystemAdminDashboard from './pages/DashboardPage/SystemAdminDashboard.jsx';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <Routes>
          <Route path="/" element={<SystemAdminDashboard />} />
          <Route path="/UserManagement/CreateUser" element={<CreateUserPage />} />
          <Route path="/UserManagement/DeleteUser" element={<DeleteUserPage />} />
          <Route path="/UserManagement/ResetUserPassword" element={<ResetUserPasswordPage />} />
          <Route path="/RoleManagement/CreateCustomRole" element={<CreateCustomRolePage />} />
          <Route path="/RoleManagement/EditUserRole" element={<EditUserRolePage />} />
          <Route path="/RoleManagement/ManageRoleAccess" element={<ManageRoleAccessPage />} />
          <Route path="/archive/users" element={<ArchiveUsersPage />} />
          <Route path="/archive/notifications" element={<ArchiveNotificationsPage />} />
          <Route path="/archive/announcements" element={<ArchiveAnnouncementsPage />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
