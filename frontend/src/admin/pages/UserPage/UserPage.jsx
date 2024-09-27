import React, { useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar';
import Users from '../../components/Users/Users';

const UserPage = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  // Callback function to receive the minimized state
  const handleMinimizeChange = (minimizedState) => {
    setIsMinimized(minimizedState);
  };

  return (
    <div className="flex h-screen">
      {/* Navbar */}
      <AdminNavbar onMinimizeChange={handleMinimizeChange} />

      {/* User Content */}
      <div
        className={`transition-all duration-300 ease-in-out flex-1 ${isMinimized ? 'lg:ml-20' : 'lg:ml-64'}`}
      >
        <Users />
      </div>
    </div>
  );
};

export default UserPage;
