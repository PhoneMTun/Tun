import React from 'react';

export default function Saleform({ formData, onSubmit, handleQuantityChange }) {
    console.log("Form Data:", formData);
    
    return (
        <form onSubmit={onSubmit} className="max-w-md bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Selected Items</h2>
            <div className="space-y-2 mb-4">
                {formData.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <span>{item.sku}</span>
                        <span>{item.name}</span>
                        <span>
                        <input 
                                type="number" 
                                value={item.quantity} 
                                onChange={(e) => handleQuantityChange(e, item)} 
                                min="1"
                                className="ml-2 border rounded px-2 py-1"
                            />
                        </span>                       
                        <span>${item.prices}</span>
                    </div>
                ))}
            </div>
            <p className="font-bold mb-4">Total: ${formData.total.toFixed(2)}</p>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Submit Order
            </button>
        </form>
    );
}
