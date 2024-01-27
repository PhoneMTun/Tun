import React from 'react';

export default function Saleform({ formData, handleSubmit, handleChange, onRemoveItem, customers }) {
    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Selected Items</h2>
            
            {/* Customer Selection */}
            <div className="mb-4">
                <label htmlFor="customer-select" className="block text-lg font-semibold text-gray-700 mb-2">Customer:</label>
                <select 
                    name="customer_id"
                    id="customer-select"
                    value={formData.customer_id}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded text-center focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                    <option value="">Select a customer</option>
                    {customers && customers.map(customer => (
                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                    ))}
                </select>
            </div>
            
            {/* Items Table */}
            <table className="w-full mb-6">
                <tbody>
                    {formData.items.map((item, index) => (
                        <tr key={index} className="border-b">
                            <td className="py-2 text-gray-800">{item.sku}</td>
                            <td className="py-2 text-gray-600">{item.name}</td>
                            <td className="py-2">
                                <input
                                    type="number"
                                    name="quantity"
                                    data-itemindex={index}
                                    value={item.quantity}
                                    onChange={handleChange}
                                    min="1"
                                    className="w-16 border border-gray-300 rounded text-center focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                />
                            </td>
                            <td className="py-2 font-semibold text-gray-800 text-right">MMK {item.prices}</td>
                            <td className="py-2">
                                <button type="button" onClick={(event) => onRemoveItem(event, item.id)} className="text-red-500 hover:text-red-700">
                                    X
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {/* Discount and Total */}
            <div className="flex flex-col justify-end">
                <div className="mb-4 flex justify-between items-center">
                    <label className="text-lg font-semibold text-gray-700" htmlFor="discount">Discount(kyats):</label>
                    <input
                        type="number"
                        id="discount"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        className="w-24 border border-gray-300 rounded text-center focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <p className="text-xl font-semibold text-gray-800 mb-6 text-right">
                    Total: MMK {(formData.total - formData.discount).toFixed(2)}
                </p>
            </div>
            
            {/* Submit Button */}
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300">
                Submit Order
            </button>
        </form>
    );
}
