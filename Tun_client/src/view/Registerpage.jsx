import React, { useState } from 'react';
import LoginForm from '../components/form/LoginForm';
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
            console.log(response);
            navigate('/welcome');  // Change to the appropriate route on successful login
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);  // Adjust the error handling based on the response structure
            }
        }
    };

    return (
        <LoginForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            error={error}
        />
    );
}
