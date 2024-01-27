// ReceiptPopupConfirm.js
import React from 'react';

export default function ReceiptPopupConfirm({ receiptId, onPrint, onView, onClose }) {
  return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Receipt Confirmation</h3>
            <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">Receipt ID: {receiptId}</p>
            </div>
            <div className="items-center px-4 py-3">
                <button onClick={onPrint} className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-auto shadow-sm hover:bg-blue-700">Print</button>
                <button onClick={onView} className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-auto shadow-sm hover:bg-green-700 ml-3">View</button>
                <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-auto shadow-sm hover:bg-red-700 ml-3">Close</button>
            </div>
            </div>
        </div>
        </div>
    );
    }
