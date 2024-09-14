import React from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, ArcElement, PointElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, ArcElement, PointElement);

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

  // Options for the bar chart
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

  // Sample data for the pie chart with actual order numbers
  const pieData = {
    labels: ['Electronics', 'Clothing', 'Home & Kitchen', 'Sports', 'Books'],
    datasets: [
      {
        label: 'Product Purchases',
        data: [200, 150, 100, 80, 120], // Number of orders per category
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

  // Total order count
  const totalOrders = pieData.datasets[0].data.reduce((acc, value) => acc + value, 0);

  // Options for the pie chart
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
      datalabels: {
        display: false,
      },
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const total = ctx.dataset.data.reduce((acc, val) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(2) + '%';
          return percentage;
        },
        color: '#fff',
        display: true,
      },
    },
  };

  // Sample data for the line chart
  const lineData = {
    labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    datasets: [
      {
        label: 'Active Users',
        data: [50, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110], // Number of active users per day
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1,
      },
    ],
  };

  // Options for the line chart
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

  return (
    <>
      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-4 md:p-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Admin Dashboard</h1>
          <div className="flex items-center">
            <span className="mr-4 text-lg">Welcome, Admin</span>
          </div>
        </header>

        {/* Content Area */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2">Total Users</h3>
            <p className="text-2xl font-bold text-blue-500">1500</p>
          </div>
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2">Total Products</h3>
            <p className="text-2xl font-bold text-blue-500">120</p>
          </div>
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
            <p className="text-2xl font-bold text-blue-500">450</p>
          </div>
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2">Total Sales</h3>
            <p className="text-2xl font-bold text-blue-500">$15,000</p>
          </div>
        </section>

        {/* Charts Area */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
            <div className="w-full h-80">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-4">Product Purchases</h3>
            <div className="w-full h-80">
              <Doughnut data={pieData} options={pieOptions} />
            </div>
          </div>

          {/* Line Chart */}
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-4">Daily Active Users</h3>
            <div className="w-full h-80">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
