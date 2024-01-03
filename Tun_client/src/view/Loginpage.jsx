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

      // Retrieve token and user_id from the response
      const { token, user_id } = response.data;

      // Store the token and user_id in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', user_id);

      console.log(response);
      navigate('/home/dashboard');
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 404) {
        setError("User not found");
      } else {
        // Check if err.response.data is defined before accessing .message
        const errorMessage = err.response?.data?.message || "An error occurred";
        setError(errorMessage);
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
