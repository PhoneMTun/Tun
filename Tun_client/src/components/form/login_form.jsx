import React from 'react'

export default function login_form() {


  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-gray-700 p-12 w-2/5  rounded-lg shadow-lg">
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
        </form>
    </div>
  )
}
