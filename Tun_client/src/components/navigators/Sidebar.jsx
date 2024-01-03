import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <nav className="bg-blue-900 h-screen w-56 p-4 fixed top-0 left-0 z-10">
      <div className="text-white text-2xl font-bold mb-4">Menu</div>
      <div className="space-y-6">
        <Link to="/home/dashboard" className={`block text-white py-2 px-4 rounded transition duration-300 ${location.pathname === '/home/dashboard' ? 'bg-blue-600 text-yellow-300' : 'hover:bg-blue-600 hover:text-yellow-300'}`}>Home</Link>
        <Link to="/products" className={`block text-white py-2 px-4 rounded transition duration-300 ${location.pathname === '/products' ? 'bg-blue-600 text-yellow-300' : 'hover:bg-blue-600 hover:text-yellow-300'}`}>Sale</Link>
        <Link to="/home/inventory" className={`block text-white py-2 px-4 rounded transition duration-300 ${location.pathname === '/home/inventory' ? 'bg-blue-600 text-yellow-300' : 'hover:bg-blue-600 hover:text-yellow-300'}`}>Inventory</Link>
        <Link to="/orders" className={`block text-white py-2 px-4 rounded transition duration-300 ${location.pathname === '/orders' ? 'bg-blue-600 text-yellow-300' : 'hover:bg-blue-600 hover:text-yellow-300'}`}>Reports</Link>
        <Link to="/customers" className={`block text-white py-2 px-4 rounded transition duration-300 ${location.pathname === '/customers' ? 'bg-blue-600 text-yellow-300' : 'hover:bg-blue-600 hover:text-yellow-300'}`}>Customers</Link>
        {/* Add more links for different sections of your app */}
      </div>
    </nav>
  );
};

export default Sidebar;
