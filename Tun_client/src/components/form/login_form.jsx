import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login_form({ formData, handleInputChange, handleSubmit, error }) {
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('/');
    };

    const renderErrorMessages = () => {
        if (typeof error === 'string') {
            // Single error message
            return <li className="text-sm italic">{error}</li>;
        } else {
            // Multiple error messages
            return Object.values(error).map((errorMsg, index) => (
                <li key={index} className="text-sm italic">{errorMsg}</li>
            ));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-900">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-12 w-96 rounded-xl shadow-2xl">
                {error && (
                    <div className="text-red-500 mb-4 bg-red-100 p-4 rounded shadow">
                        <p className="font-bold">Errors:</p>
                        <ul className="list-disc list-inside">
                            {renderErrorMessages()}
                        </ul>
                    </div>
                )}
                <h2 className="text-white text-2xl mb-4">Log in</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-white text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex justify-between mt-6">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105">
                        Log in
                    </button>
                    <button type="button" onClick={handleCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
