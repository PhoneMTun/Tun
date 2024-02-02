import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReceiptPopupConfirm from '../PopUp/ReciptPopUpConfirm';


export default function InvoiceConfirmation() {
    const location = useLocation();
    const { invoiceDetails } = location.state || {};
    const [sellername, setSellername] = useState('');
    const [customer, setCustomerName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [receiptId, setReceiptId] = useState(null);
    const navigate = useNavigate();
    console.log(invoiceDetails);

    const fetchSeller = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/user/${invoiceDetails.user_id}`);
            setSellername(response.data.first_name);
        } catch (error) {
            console.log('Error fetching seller:', error);
        }
    };

    const fetchCustomer = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/customer/${invoiceDetails.customer_id}`);
            setCustomerName(response.data.name);
        } catch (error) {
            console.log('Error fetching customer:', error);
        }
    };

    useEffect(() => {
        if (invoiceDetails) {
            fetchSeller();
            fetchCustomer();
        }
    }, [invoiceDetails]);


    
    const handleCancel = () => {
        navigate('/home/sale');
    };
    const postRecipt= async ()=>{
        try {
            const response = await axios.post('http://localhost:5000/create/point-of-sale', invoiceDetails);
            console.log('Receipt confirmed:', response);
            setReceiptId(response.data.message);
        } catch (error) {
            console.error('Error confirming receipt:', error);
        }
    };
    const updateIncome_statement= async ()=>{
        try {
            const response = await axios.post('http://localhost:5000/update_income_statements');
            console.log('Update Successful');
        } catch (error) {
            console.error('Update Failure:');
        }
    };
    const handlePrint = () => {
        const receiptContent = document.getElementById('receipt-section');
        if (receiptContent) {
            const originalContent = document.body.innerHTML;
            document.body.innerHTML = receiptContent.innerHTML;
            window.print();
            document.body.innerHTML = originalContent;
            handleClosePopup();
            window.location.reload();
        } else {
            console.error('Receipt content not found');
        }
    };

    const handleView = () => {
        setShowPopup(false);
        window.open(`/view-receipt/${receiptId}`, '_blank');
        handleClosePopup();
};

    const handleConfirm =  () => {
        postRecipt();
        updateIncome_statement();
        console.log('Receipt Confirmed');
        localStorage.removeItem('selectedItems');
        setShowPopup(true);
    };
    const handleClosePopup = () => {
        setShowPopup(false);
        navigate('/home/sale');
    };


    return (
            <div className="container mx-auto p-4">
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
        
                    {/* Invoice Details Section */}
                    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg mt-4 rounded-lg">
                        <div className="font-bold text-2xl mb-4 text-center">
                            Receipt {invoiceDetails.id}
                        </div>
                        <div className="mb-6">
                            <div className="font-semibold text-lg">
                                Customer Name: {invoiceDetails.customer_id ? customer : 'Guest'}
                            </div>
                            <div className="font-semibold text-lg">
                                Sold By: {sellername}
                            </div>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-4">Items Purchased:</h3>
                            {invoiceDetails.items.map((item, index) => (
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
                                        <div className="font-semibold">${item.prices.toFixed(2)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-lg font-medium text-right mb-2">
                            Discount: ${invoiceDetails.discount.toFixed(2)}
                        </div>
                        <div className="text-xl font-bold text-right mb-4">
                            Total: ${invoiceDetails.total.toFixed(2)}
                        </div>
                    </div>
                </div>
    
                {/* Buttons Section */}
                <div className="flex justify-end space-x-3 mt-4">
                    <button
                        onClick={handleCancel}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        Confirm Receipt
                    </button>
                </div>
                {showPopup && (
                <ReceiptPopupConfirm
                    receiptId={receiptId}
                    onPrint={handlePrint}
                    onView={handleView}
                    onClose={handleClosePopup}
                />
            )}
            </div>
        );
    }
