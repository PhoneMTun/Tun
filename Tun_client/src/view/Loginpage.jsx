import React, { useState } from 'react';
import Login_form from '../components/form/Login_form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Loginpage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', formData);
  
      const { token, user_id } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', user_id);
  
      navigate('/home/dashboard');
    } catch (err) {
      if (err.response && err.response.data) {
        const message = err.response.data.errors || err.response.data.message;
        setError(message);
      } else {
        setError('An error occurred during login.');
      }
    }
  };
  

  return (
    <Login_form
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
}
