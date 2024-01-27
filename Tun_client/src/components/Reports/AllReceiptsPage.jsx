import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllReceiptsPage = () => {
    const [receipts, setReceipts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchReceipts = async () => {
        try {
        const response = await axios.get('http://localhost:5000/point-of-sale');
        setReceipts(response.data);
        } catch (error) {
        console.error('Error fetching receipts:', error);
        }
    };

    useEffect(() => {
        fetchReceipts();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredReceipts = receipts.filter((receipt) => 
        receipt.customer.name
        ? receipt.customer.name.toLowerCase().includes(searchTerm)
        : 'Guest'.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Receipts</h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 bg-white p-4 rounded-lg shadow-md">
            <input
                type="text"
                placeholder="Search by Customer Name"
                value={searchTerm}
                onChange={handleSearchChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out mb-4 md:mb-0"
            />
        </div>
        {filteredReceipts.length > 0 ? (
            <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full leading-normal">
                <thead>
                <tr className="bg-blue-600 text-white uppercase text-lg leading-tight">
                    <th className="px-5 py-3">Receipt ID</th>
                    <th className="px-5 py-3">Customer Name</th>
                    <th className="px-5 py-3">Total Amount</th>
                    <th className="px-5 py-3">Date</th>
                </tr>
                </thead>
                <tbody className="text-gray-700">
                {filteredReceipts.map((receipt) => (
                    <tr key={receipt.id} className="hover:bg-gray-200">
                    <td className="px-5 py-5 border-b border-gray-200">
                        <Link to={`/view-receipt/${receipt.id}`} className="text-blue-600 hover:text-blue-800">
                        {receipt.id}
                        </Link>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200">{receipt.customer.name ? receipt.customer.name : 'Guest'}</td>
                    <td className="px-5 py-5 border-b border-gray-200">{receipt.total}</td>
                    <td className="px-5 py-5 border-b border-gray-200">{new Date(receipt.created_at).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        ) : (
            <p className="text-center mt-6">No receipts found.</p>
        )}
        </div>
    );
    };

    export default AllReceiptsPage;
