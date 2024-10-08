import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Dashboard from './pages/DashboardPage/Dashboard';

import ArchiveUsersPage from './pages/ArchivingPages/ArchiveUsersPage';
import ArchiveNotificationsPage from './pages/ArchivingPages/ArchiveNotificationsPage';
import ArchiveAnnouncementsPage from './pages/ArchivingPages/ArchiveAnnouncementsPage';

import CreateUserPage from './pages/UserManagementPages/CreateUserPage';
import DeleteUserPage from './pages/UserManagementPages/DeleteUserPage';
import ResetUserPasswordPage from './pages/UserManagementPages/ResetUserPasswordPage';

import CreateCustomRolePage from './pages/RoleManagementPages/CreateCustomRolePage';
import EditUserRolePage from './pages/RoleManagementPages/EditUserRolePage';
import ManageRoleAccessPage from './pages/RoleManagementPages/ManageRoleAccessPage';

import SwipeDownMenu from './components/SwipeDownMenu';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <SwipeDownMenu />
        <Routes>
          <Route path="/" element={<Dashboard />} />
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
    </ChakraProvider>
  );
}

export default App;
