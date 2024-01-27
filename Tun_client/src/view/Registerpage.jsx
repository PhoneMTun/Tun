import React, { useState } from 'react';
import AccountCreationForm from '../components/form/form'; // Update the path accordingly
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Registerpage() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        role: 'user',
        email: '',
        password: '',
        confirm_password: ''
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
        if (formData.password !== formData.confirm_password) {
            setError('Passwords do not match.');
            return;
        }

        axios.post("http://localhost:5000/create/user", formData)
            .then((res) => {
                console.log(res);
                // setSuccessfull(true);
                navigate('/', { state: { successful: true } });
            })
            .catch(err => {
                if (err.response) {
                    setError(err.response.data.errors);
                }
            });
    };

    return (
        <div>
        
            <AccountCreationForm 
                formData={formData} 
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                error={error}
            />
        </div>
    );
}
