// Homepage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/navigators/Sidebar';
import DashboardContent from '../components/content/HomeContent';
import InventoryContent from '../components/content/InventoryContent';
import CreateInventoryContent from '../components/content/CreateInventoryContent';
import UpdateContent from '../components/content/UpdateContent';
import SaleContent from '../components/content/SaleContent';
import '../App.css';

const Homepage = () => {
  const [inventory, setInventory] = useState([]);
  const [user, setUser] = useState({});
  const [validationErrors, setValidationErrors] = useState([]);
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
console.log(validationErrors)

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
const validateForm = () => {
  let errors = {};
  if (!formData.sku) {
      errors.sku = 'SKU is required';
  }

  if (!formData.name.trim()) {
      errors.name = 'Item name is required';
  }
  if (!formData.color) {
      errors.color = 'Color is required';
  }

  if (!formData.sizes || formData.sizes <= 0) {
      errors.sizes = 'Size is required and must be a positive number';
  }

  if (!formData.prices || isNaN(formData.prices) || formData.prices <= 0) {
      errors.prices = 'Valid price is required and must be a positive number';
  }

  if (!formData.quantity || isNaN(formData.quantity) || formData.quantity <= 0) {
      errors.quantity = 'Valid quantity is required and must be a positive number';
  }

  if (!formData.quantity_per_packet || isNaN(formData.quantity_per_packet) || formData.quantity_per_packet <= 0) {
      errors.quantity_per_packet = 'Valid quantity per packet is required and must be a positive number';
  }
  if (!formData.type.trim()) {
      errors.type = 'Type is required';
  }
  if (!formData.warehouse_id) {
      errors.warehouse_id = 'Warehouse location is required';
  }
  if (formData.image_url && formData.image_url.length > 4) {
      errors.image_url = 'Upload no more than 4 images';
  }
  setValidationErrors(errors);
  return Object.keys(errors).length === 0;
};

const fetchInventory = async () => {
  try {
    const response = await axios.get('http://localhost:5000/inventory');
    setInventory(response.data);
  } catch (error) {
    setError('Error fetching inventory: ' + error);
  }
};
  useEffect(() => {
    console.log('hello');
    fetchInventory();
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
              console.log(data);
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
    fetchUser();
    setIsLoading(false);
  }, []);

  

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-60 flex-grow p-4 flex justify-center items-center ">
        <Routes>
          <Route path="/dashboard" element={<DashboardContent user={user} />} />
          <Route path="/inventory" element={<InventoryContent inventory={inventory} setInventory={setInventory} error={error} isLoading= {isLoading} setValidationErrors={setValidationErrors} setFormData={setFormData}/>} />
          <Route path="/inventory/create-inventory" element={<CreateInventoryContent formData={formData}  handleChange={handleChange}   fetchInventory={fetchInventory} validateForm={validateForm} validationErrors={validationErrors} inventory={inventory}/>}/>
          <Route path="/inventory/edit/:id" element={<UpdateContent fetchInventory={fetchInventory} inventory={inventory}/>}/>
          <Route path="/sale" element={<SaleContent inventory={inventory} user={user}/>}/>
        </Routes>
      </div>
    </div>
    
  );
}

export default Homepage;
