import React, { useState } from 'react';
import AdminNavbar from '../../AdminNavbar/AdminNavbar';
import Dashboard from '../../Dashboard/Dashboard';

const DashboardPage = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  // Callback function to receive the minimized state
  const handleMinimizeChange = (minimizedState) => {
    setIsMinimized(minimizedState);
  };

  return (
    <div className="flex h-screen">
      {/* Navbar */}
      <AdminNavbar onMinimizeChange={handleMinimizeChange} />

      {/* Dashboard Content */}
      <div
        className={`transition-all duration-300 ease-in-out flex-1 ${isMinimized ? 'lg:ml-20' : 'lg:ml-64'}`}
      >
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
