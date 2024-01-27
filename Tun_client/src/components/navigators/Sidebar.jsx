import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Sidebar = ({user}) => {
  const location = useLocation();
  const [reportsDropdownOpen, setReportsDropdownOpen] = useState(false);
  const [chatBoxOpen, setChatBoxOpen] = useState(false);
  const navigate = useNavigate();
  console.log("this one" + user)
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('selectedItems');
    console.log('User logged out');
    navigate('/');
  };

  const toggleReportsDropdown = () => {
    setReportsDropdownOpen(!reportsDropdownOpen);
  };
  const toggleChatBox = () => {
    setChatBoxOpen(!chatBoxOpen);
  };

  return (
    <nav className="flex flex-col justify-between bg-blue-900 h-screen w-56 p-4 fixed top-0 left-0 z-10">
    <div>
      <div className="text-white text-2xl font-bold mb-4">Menu</div>
      <div className="space-y-6">
        <Link to="/home/dashboard" className={`block text-white py-2 px-4 rounded transition duration-300 ${location.pathname === '/home/dashboard' ? 'bg-blue-600 text-yellow-300' : 'hover:bg-blue-600 hover:text-yellow-300'}`}>Dashboard</Link>
        <Link to="/home/sale" className={`block text-white py-2 px-4 rounded transition duration-300 ${location.pathname === '/home/sale' ? 'bg-blue-600 text-yellow-300' : 'hover:bg-blue-600 hover:text-yellow-300'}`}>Sale</Link>
        <Link to="/home/inventory" className={`block text-white py-2 px-4 rounded transition duration-300 ${location.pathname === '/home/inventory' ? 'bg-blue-600 text-yellow-300' : 'hover:bg-blue-600 hover:text-yellow-300'}`}>Inventory</Link>
        
        <div className="space-y-2">
          <button onClick={toggleReportsDropdown} className="block text-white py-2 px-4 rounded transition duration-300 w-full text-left focus:outline-none">
            Reports
            <span className={`float-right transform ${reportsDropdownOpen ? 'rotate-180' : 'rotate-0'}`}>▼</span>
          </button>

          {reportsDropdownOpen && (
            <div className="pl-4 space-y-2">
              {/* <Link to="/home/reports" className={`block text-white py-2 px-4 rounded transition duration-300 ${location.pathname === '/home/reports' ? 'bg-blue-600 text-yellow-300' : 'hover:bg-blue-600 hover:text-yellow-300'}`}>All Reports</Link> */}
              <Link to="/home/receipts" className={`block text-white py-2 px-4 rounded transition duration-300 ${location.pathname === '/home/receipts' ? 'bg-blue-600 text-yellow-300' : 'hover:bg-blue-600 hover:text-yellow-300'}`}>Receipts</Link>
            </div>
          )}
        </div>
        {user.role === 'admin' && (
          <div className="space-y-6">
            <Link to="/home/customers" className={`block text-white py-2 px-4 rounded transition duration-300 ${location.pathname === '/home/customers' ? 'bg-blue-600 text-yellow-300' : 'hover:bg-blue-600 hover:text-yellow-300'}`}>Customers</Link>
            <Link to="/home/warehouses" className={`block text-white py-2 px-4 rounded transition duration-300 ${location.pathname === '/home/warehouses' ? 'bg-blue-600 text-yellow-300' : 'hover:bg-blue-600 hover:text-yellow-300'}`}>Warehouses</Link>
          </div>
        )}
        </div>
      </div>
      <button onClick={logout} className="block  bg-yellow-500  text-white-600 py-2 px-4 rounded transition duration-300 hover:bg-red-600 hover:text-white w-full text-left focus:outline-none">
        Log Out
      </button>
    
    </nav>
  );
};

export default Sidebar;
