import React from 'react';

const DashboardContent = ({ user }) => {
  return (
    <div className="bg-white p-8 rounded shadow-md">
      <h1 className="text-4xl font-bold mb-4 text-blue-900">Hello, {user && user.first_name}</h1>
      <h3 className="text-xl font-semibold mb-2 text-gray-700">Dashboard Overview</h3>
      <p className="text-gray-600">Welcome to your personalized dashboard. Explore the features and stay updated!</p>
      {/* Add other content specific to the dashboard */}
    </div>
  );
};

export default DashboardContent;
