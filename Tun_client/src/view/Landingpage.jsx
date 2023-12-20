import React from 'react';
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
import '../App.css'

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <img className ="logo" src={logo} alt="logo" />
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                <p className="text-lg mb-8">Sign in to get started! (စတင်ရန် အကောင့်ဝင်ပါ။)</p>
                <div className="flex space-x-8 justify-center">
                    <Link to = {"/login"} >
                        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200">
                            Login
                        </button>
                    </Link>
                    <Link to = {"/register"} >
                        <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-200">
                            Create Account
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default LandingPage;
