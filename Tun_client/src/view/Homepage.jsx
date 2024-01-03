// Homepage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/navigators/Sidebar';
import DashboardContent from '../components/content/HomeContent';
import InventoryContent from '../components/content/InventoryContent';
import CreateInventoryContent from '../components/content/CreateInventoryContent';
import '../App.css';

const Homepage = () => {
  const [inventory, setInventory] = useState([]);
  const [user, setUser] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    color: '',
    sizes:'',
    prices: '',
    quantity: '',
    quantity_per_packet: '',
    image_url:'',
    type: '',
    warehouse_id: '',
    user_id: '' 
});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === 'file') {
        // Creating an array from FileList
        const fileArray = Array.from(files);

        // Update state
        setFormData({ ...formData, [name]: fileArray });
    } else {
        setFormData({ ...formData, [name]: value });
    }
};


  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/inventory');
        setInventory(response.data);
      } catch (error) {
        setError('Error fetching inventory: ' + error);
      }
    };

    const fetchUser = () => {
      const token = localStorage.getItem('token');
      console.log(token);

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          axios(`http://localhost:5000/user/${decodedToken.user_id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          })
            .then(response => response.data)
            .then(data => {
              setUser(data);
              setFormData(prevFormData => ({
                ...prevFormData,
                user_id: data.id
            })
            );
            })
            .catch(error => console.error('Error:', error));
        } catch (error) {
          console.error('Invalid token:', error);
        }
      }
    };
    fetchInventory();
    fetchUser();
    setIsLoading(false);
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-56 p-4"> 
        <Routes>
          <Route path="/dashboard" element={<DashboardContent user={user} />} />
          <Route path="/inventory" element={<InventoryContent inventory={inventory} setInventory={setInventory} error={error} isLoading= {isLoading}/>} />
          <Route path="/inventory/create-inventory" element={<CreateInventoryContent formData={formData} handleChange={handleChange}   />}/>
        </Routes>
      </div>
    </div>
  );
}

export default Homepage;
