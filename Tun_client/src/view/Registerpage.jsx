import React, { useState } from 'react';
import AccountCreationForm from '../components/form/form'; // Update the path accordingly
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Registerpage() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        axios.post("http://localhost:5000/create/user", formData)
            .then((res) => {
                console.log(res);
                navigate('/Home');
            })
            .catch(err => {
                if (err.response) {
                    setError(err.response.data.errors);
                }
            });
    };

    return (
        <AccountCreationForm 
            formData={formData} 
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            error={error}
        />
    );
}
