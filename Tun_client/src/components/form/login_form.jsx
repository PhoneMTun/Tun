import React from 'react'

export default function Login_form({formData,handleInputChange,handleSubmit,error}) {


  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-gray-700 p-12 w-2/5  rounded-lg shadow-lg">
        {error && (
        <div className="text-red-500">
            <p className="font-bold">Errors:</p>
            <ul className="list-disc list-inside">
                <li className="text-s italic">{Object.values(error).join(' ')}</li>
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="last_name" className="block text-white text-sm font-bold mb-2">
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
            

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Log in
                </button>
        </form>
    </div>
  )
}
