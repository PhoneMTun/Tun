import React from 'react';
import logo from '../assets/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';

const LandingPage = () => {
    const location = useLocation();
    const successful = location.state?.successful;
    const navigate = useNavigate();

    const navigateTo = (route) => {
        navigate(route, { state: { successful: null } });
    };
    
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
            {successful && (
                <div className="bg-green-500 text-white font-semibold p-4 mb-6 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                    <h3 className="text-xl mb-2">Success!</h3>
                    <p>အကောင့်ဖန်တီးပြီးပါပြီ!! ယခုထိုအကောင့်ဖြင့်ဝင်ရောက်နိုင်သည်။</p>
                </div>
            )}
            <img className="logo mb-8" src={logo} alt="logo" />
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                <p className="text-lg mb-8">Sign in to get started! (စတင်ရန် အကောင့်ဝင်ပါ။)</p>
                <div className="flex space-x-4 justify-center">
                    <button onClick={() => navigateTo('/login')} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200">
                        Login
                    </button>
                    <button onClick={() => navigateTo('/register')} className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-200">
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
