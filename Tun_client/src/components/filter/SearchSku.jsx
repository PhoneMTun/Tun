import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        const newSearchTerm = e.target.value.toLowerCase();
        setSearchTerm(newSearchTerm);
        onSearch(newSearchTerm);
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 bg-white p-4 rounded-lg shadow-md">
            <input
                type="text"
                placeholder="Search by SKU or Name"
                onChange={handleSearchChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out mb-4 md:mb-0"
            />
        </div>
    );
}
