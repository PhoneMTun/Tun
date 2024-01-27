import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ReceiptPage() {
    const location = useLocation();
    const { id } = useParams();
    const receiptId = id || location.state?.receiptId;
    const navigate = useNavigate();
    const [receiptDetails, setReceiptDetails] = useState(null);
    const [sellerName, setSellerName] = useState('');
    const [customerName, setCustomerName] = useState('');

    useEffect(() => {
        if (receiptId) {
            fetchReceiptDetails(receiptId);
        }
    }, [receiptId]);
    
    const handleBackToDashboard = () => {
        navigate('/home/dashboard');
    };

    const fetchReceiptDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/point-of-sale/${id}`);
            setReceiptDetails(response.data);
            fetchSeller(response.data.user_id);
            fetchCustomer(response.data.customer_id);
        } catch (error) {
            console.log('Error fetching receipt details:', error);
        }
    };

    const fetchSeller = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/user/${userId}`);
            setSellerName(response.data.first_name);
        } catch (error) {
            console.log('Error fetching seller:', error);
        }
    };

    const fetchCustomer = async (customerId) => {
        try {
            const response = await axios.get(`http://localhost:5000/customer/${customerId}`);
            setCustomerName(response.data.name);
        } catch (error) {
            console.log('Error fetching customer:', error);
        }
    };
    if (!receiptDetails) {
        return <div>Loading...</div>;
    }
    const handlePrint = () => {
        const receiptContent = document.getElementById('receipt-section');
        if (receiptContent) {
            const originalContent = document.body.innerHTML;
            document.body.innerHTML = receiptContent.innerHTML;
            window.print();
            document.body.innerHTML = originalContent;
            window.location.reload();
        } else {
            console.error('Receipt content not found');
        }
    };

    return (
        <div className="container mx-auto p-4" >
            <div id="receipt-section">
                <div className="max-w-xl mx-auto p-6 bg-white shadow-lg mt-6 rounded-lg">
                    <h2 className="text-2xl font-bold text-center mb-6 border-b pb-2">ထွန်း ဖိနပ်ဆိုင်</h2>
                    <div className="text-center mb-4">
                        <h3 className="text-lg font-semibold mb-1">Phoo Pwint (Main Product) ဖိနပ် Sale Company</h3>
                        <h4 className="text-base mb-1">Kyaw Hlaing Tun + Sandar Moe</h4>
                        <p className="text-sm mb-1">
                            Main Shop-No(3), Room(001), Sapae Street, Yuzana Plaza(South)
                        </p>
                        <p className="text-sm mb-1">Phone no: 01-200531, 01-8619672, 01-8619673, 09-444666087, 09-777999121, 09-777555252</p>
                        <p className="text-sm mb-1">
                            Warehouse- No(14), Room (9), Nin Si Street, Yuzana Plaza(Tammwae)
                        </p>
                        <p className="text-sm">Phone no: 206089, 205048, 09-420167892, Home - 09-255244447</p>
                    </div>
                </div>
                <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg mt-4 rounded-lg">
                    <div className="font-bold text-2xl mb-4 text-center">
                        Receipt No.{receiptDetails.id}
                    </div>
                    <div className="mb-6">
                        <div className="font-semibold text-lg">
                            Customer Name: {receiptDetails.customer_id ? customerName : 'Guest'}
                        </div>
                        <div className="font-semibold text-lg">
                            Sold By: {sellerName}
                        </div>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-4">Items Purchased:</h3>
                        {receiptDetails.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center mb-4">
                                <div>
                                    <div className="font-medium">
                                        {item.name} ({item.color})
                                    </div>
                                    <div className="text-gray-600">
                                        Created at: {new Date(item.created_at).toLocaleString()}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold">Quantity: {item.quantity}</div>
                                    <div className="font-semibold">${item.prices}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-lg font-medium text-right mb-2">
                        Discount: ${receiptDetails.discount}
                    </div>
                    <div className="text-xl font-bold text-right mb-4">
                        Total: ${receiptDetails.total}
                    </div>
                </div>
            </div>
            <div className="mt-4 text-center">
                <button
                    onClick={handleBackToDashboard}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Back to Dashboard
                </button>
                <button
                    onClick={handlePrint}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                    Print Receipt
                </button>
            </div>
        </div>
    );
}

