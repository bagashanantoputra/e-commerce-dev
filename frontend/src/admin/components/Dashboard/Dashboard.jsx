import React, { useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, ArcElement, PointElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, ArcElement, PointElement);

const itemsPerPage = 5;

const Pagination = ({ currentPage, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = [...Array(totalPages).keys()].map(num => num + 1);

  return (
    <div className="flex justify-center mt-2">
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-3 py-1 rounded-md text-sm ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

const Dashboard = () => {
  // Sample data for the bar chart
  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Total Sales',
        data: [3000, 4000, 3500, 5000, 4500, 6000, 7000],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.parsed.y}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  const pieData = {
    labels: ['Electronics', 'Clothing', 'Home & Kitchen', 'Sports', 'Books'],
    datasets: [
      {
        label: 'Product Purchases',
        data: [200, 150, 100, 80, 120],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const totalOrders = pieData.datasets[0].data.reduce((acc, value) => acc + value, 0);

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value} orders`;
          },
        },
      },
    },
  };

  const lineData = {
    labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    datasets: [
      {
        label: 'Active Users',
        data: [50, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y} users`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Day',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Active Users',
        },
        beginAtZero: true,
      },
    },
  };

  // Sample data for recent new users and orders
  const allUsers = [
    { id: 1, name: 'Alice', email: 'alice@example.com', date: '2024-09-15' },
    { id: 2, name: 'Bob', email: 'bob@example.com', date: '2024-09-16' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', date: '2024-09-17' },
    { id: 4, name: 'David', email: 'david@example.com', date: '2024-09-18' },
    { id: 5, name: 'Eve', email: 'eve@example.com', date: '2024-09-19' },
    { id: 6, name: 'Frank', email: 'frank@example.com', date: '2024-09-20' },
  ];

  const allOrders = [
    { id: 1, product: 'Laptop', amount: 1200, date: '2024-09-15' },
    { id: 2, product: 'Shirt', amount: 30, date: '2024-09-16' },
    { id: 3, product: 'Blender', amount: 60, date: '2024-09-17' },
    { id: 4, product: 'Phone', amount: 800, date: '2024-09-18' },
    { id: 5, product: 'Table', amount: 150, date: '2024-09-19' },
    { id: 6, product: 'Book', amount: 20, date: '2024-09-20' },
  ];

  const [currentUserPage, setCurrentUserPage] = useState(1);
  const [currentOrderPage, setCurrentOrderPage] = useState(1);

  const paginatedUsers = allUsers.slice((currentUserPage - 1) * itemsPerPage, currentUserPage * itemsPerPage);
  const paginatedOrders = allOrders.slice((currentOrderPage - 1) * itemsPerPage, currentOrderPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="min-h-full p-4 md:p-8">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0 text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center">
            <span className="mr-4 text-lg text-gray-600">Welcome, Admin</span>
          </div>
        </header>

        {/* Overview Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Total Users</h3>
            <p className="text-2xl font-bold text-blue-500">1500</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Total Products</h3>
            <p className="text-2xl font-bold text-blue-500">120</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Total Orders</h3>
            <p className="text-2xl font-bold text-blue-500">450</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Total Sales</h3>
            <p className="text-2xl font-bold text-blue-500">$50,000</p>
          </div>
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Sales Overview</h3>
            <div className="h-64">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Product Purchases</h3>
            <div className="h-64">
              <Doughnut data={pieData} options={pieOptions} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Active Users</h3>
            <div className="h-64">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </section>

        {/* Recent New Users and Orders Tables Side by Side */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Recent New Users Table */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Recent New Users</h3>
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b-2 border-gray-200 px-4 py-2 text-left">Name</th>
                  <th className="border-b-2 border-gray-200 px-4 py-2 text-left">Email</th>
                  <th className="border-b-2 border-gray-200 px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map(user => (
                  <tr key={user.id}>
                    <td className="border-b border-gray-200 px-4 py-2">{user.name}</td>
                    <td className="border-b border-gray-200 px-4 py-2">{user.email}</td>
                    <td className="border-b border-gray-200 px-4 py-2">{user.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {paginatedUsers.length > 0 && (
              <Pagination currentPage={currentUserPage} totalItems={allUsers.length} onPageChange={setCurrentUserPage} />
            )}
          </div>

          {/* Recent New Orders Table */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Recent New Orders</h3>
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b-2 border-gray-200 px-4 py-2 text-left">Product</th>
                  <th className="border-b-2 border-gray-200 px-4 py-2 text-left">Amount</th>
                  <th className="border-b-2 border-gray-200 px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map(order => (
                  <tr key={order.id}>
                    <td className="border-b border-gray-200 px-4 py-2">{order.product}</td>
                    <td className="border-b border-gray-200 px-4 py-2">${order.amount}</td>
                    <td className="border-b border-gray-200 px-4 py-2">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {paginatedOrders.length > 0 && (
              <Pagination currentPage={currentOrderPage} totalItems={allOrders.length} onPageChange={setCurrentOrderPage} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
