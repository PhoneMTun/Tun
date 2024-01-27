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
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-900 text-white flex flex-col items-center justify-center">
            {successful && (
                <div className="bg-green-500 text-white font-semibold p-4 mb-6 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                    <h3 className="text-xl mb-2">Success!</h3>
                    <p>အကောင့်ဖန်တီးပြီးပါပြီ!! ယခုထိုအကောင့်ဖြင့်ဝင်ရောက်နိုင်သည်။</p>
                </div>
            )}
            <img className="mb-12" src={logo} alt="logo" style={{width: '30%'}}/>
            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl text-center">
                <h1 className="text-4xl font-bold mb-6">Welcome to Our Platform</h1>
                <p className="text-lg mb-8">Sign in to get started or create a new account to explore! (စတင်ရန် အကောင့်ဝင်ပါ။)</p>
                <div className="flex space-x-6 justify-center">
                    <button onClick={() => navigateTo('/login')} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg transition duration-200 ease-in-out transform hover:scale-110">
                        Login
                    </button>
                    <button onClick={() => navigateTo('/register')} className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full shadow-lg transition duration-200 ease-in-out transform hover:scale-110">
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
