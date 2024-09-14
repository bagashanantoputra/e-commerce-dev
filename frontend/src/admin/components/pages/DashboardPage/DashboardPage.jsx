import React from 'react';
import Dashboard from '../../Dashboard/Dashboard';
import AdminNavbar from '../../AdminNavbar/AdminNavbar';

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="lg:w-64">
        <AdminNavbar />
      </div>
      {/* Main content */}
      <main className="flex-1 p-4 bg-gray-100">
        <Dashboard />
      </main>
    </div>
  );
};

export default DashboardPage;
