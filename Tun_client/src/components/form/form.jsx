import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccountCreationForm = ({ formData, handleInputChange, handleSubmit, error }) => {
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('/');
    }
    
    return (

            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-900">
                {error && (
                    <div className="text-red-500 mb-4 bg-red-100 p-4 rounded shadow">
                        <p className="font-bold">Errors:</p>
                        <ul className="list-disc list-inside">
                            {typeof error === 'string' ? (
                                <li className="text-sm italic">{error}</li>
                            ) : (
                                Object.values(error).map((errorMessage, index) => (
                                    <li key={index} className="text-sm italic">{errorMessage}</li>
                                ))
                            )}
                        </ul>
                    </div>
                )}
            <form onSubmit={handleSubmit} className="bg-gray-800 p-12 w-96 rounded-xl shadow-2xl">
                <h2 className="text-white text-2xl mb-4">Create Account</h2>
                <div className="mb-4">
                    <label htmlFor="first_name" className="block text-white text-sm font-bold mb-2">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="last_name" className="block text-white text-sm font-bold mb-2">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="role" className="block text-white text-sm font-bold mb-2">
                        Role
                    </label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
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
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="confirm_password" className="block text-white text-sm font-bold mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex justify-between mt-6">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105">
                        Create Account
                    </button>
                    <button type="button" onClick={handleCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AccountCreationForm;
