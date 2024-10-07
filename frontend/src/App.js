import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import ArchiveUsersPage from './pages/ArchivingPages/ArchiveUsersPage';
import ArchiveNotificationsPage from './pages/ArchivingPages/ArchiveNotificationsPage';
import ArchiveAnnouncementsPage from './pages/ArchivingPages/ArchiveAnnouncementsPage';
import Dashboard from './pages/DashboardPage/Dashboard';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/archive/users" element={<ArchiveUsersPage />} />
          <Route path="/archive/notifications" element={<ArchiveNotificationsPage />} />
          <Route path="/archive/announcements" element={<ArchiveAnnouncementsPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
