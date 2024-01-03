import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function CreateInventory_form({formData, handleChange , handleSubmit, validationErrors  , uploadedImages, setUploadedImages}) {
    const [warehouses, setWearehouses] = useState([])
    
    useEffect(() => {
        const fetchWarehouses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/warehouses');
            setWearehouses(response.data); 
        } catch (error) {
            console.log(error);
        }
        };
        fetchWarehouses();
}, []); 
        
        // console.log(warehouses);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
            
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create New Inventory Item</h2>
                <form onSubmit={handleSubmit} className="space-y-4">   
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Item Name
                        {validationErrors.name && <span className="text-red-500 ml-2">{validationErrors.name}</span>}
                        </label>
                        <input
                        type="text"
                        name="name"
                        id="name"
                        value= {formData.name || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-400 focus:outline-none"
                        placeholder="Item Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Image
                        {validationErrors.name && <span className="text-red-500 ml-2">{validationErrors.image_url}</span>}
                        </label>
                        <input
                        type="file"
                        name="image_url"
                        id="image_url"
                        onChange={handleChange}
                        multiple
                        accept="image/*"
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-400 focus:outline-none"
                        aria-describedby="image_url_help"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="sku" className="block text-gray-700 font-medium mb-2">SKU
                        {validationErrors.name && <span className="text-red-500 ml-2">{validationErrors.sku}</span>}
                        </label>                        
                        <input
                        type="text"
                        name="sku"
                        id="sku"
                        value= {formData.sku || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-400 focus:outline-none"
                        placeholder="SKU"
                        />
                    </div>
                    <div>
                        <label htmlFor="color" className="block text-gray-700 font-medium mb-2">Color
                        {validationErrors.name && <span className="text-red-500 ml-2">{validationErrors.color}</span>}
                        </label>
                        <input
                        type="text"
                        name="color"
                        id="color"
                        value= {formData.color || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-400 focus:outline-none"
                        placeholder="Color"
                        />
                    </div>
                    <div>
                        <label htmlFor="sizes" className="block text-gray-700 font-medium mb-2">Size
                        {validationErrors.name && <span className="text-red-500 ml-2">{validationErrors.sizes}</span>}
                        </label>
                        <input
                        type="text"
                        name="sizes"
                        id="sizes"
                        value= {formData.sizes || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-400 focus:outline-none"
                        placeholder="Size"
                        />
                    </div>
                    <div>
                        <label htmlFor="prices" className="block text-gray-700 font-medium mb-2">Price
                        {validationErrors.name && <span className="text-red-500 ml-2">{validationErrors.prices}</span>}
                        </label>
                        <input
                        type="number"
                        name="prices"
                        id="prices"
                        value= {formData.prices || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-400 focus:outline-none"
                        placeholder="Price"
                        />
                    </div>
                    <div>
                        <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">Quantity
                        {validationErrors.name && <span className="text-red-500 ml-2">{validationErrors.quantity}</span>}
                        </label>
                        <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        value= {formData.quantity || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-400 focus:outline-none"
                        placeholder="Quantity"
                        />
                    </div>
                    <div>
                        <label htmlFor="quantity_per_packet" className="block text-gray-700 font-medium mb-2">Quantity Per Packet
                        {validationErrors.name && <span className="text-red-500 ml-2">{validationErrors.quantity_per_packet}</span>}
                        </label>
                        <input
                        type="number"
                        name="quantity_per_packet"
                        id="quantity_per_packet"
                        value= {formData.quantity_per_packet || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-400 focus:outline-none"
                        placeholder="Quantity Per Packet"
                        />
                    </div>
                    <div>
                        <label htmlFor="type" className="block text-gray-700 font-medium mb-2">Type
                        {validationErrors.name && <span className="text-red-500 ml-2">{validationErrors.type}</span>}
                        </label>
                        <input
                        type="text"
                        name="type"
                        id="type"
                        value= {formData.type || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-400 focus:outline-none"
                        placeholder="Type"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Warehouse Location
                            {validationErrors.name && <span className="text-red-500 ml-2">{validationErrors.warehouse_id}</span>}
                        </label>
                        {warehouses.map((warehouse, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="radio"
                                    name="warehouse_id"
                                    id={`warehouse_location_${index}`}
                                    value={warehouse.id}
                                    checked={formData.warehouse_id == warehouse.id}
                                    onChange={handleChange}
                                    className="focus:ring-indigo-400 h-4 w-4 text-indigo-600 border-gray-300"
                                />
                                <label htmlFor={`warehouse_location_${index}`} className="ml-3 block text-sm font-medium text-gray-700">
                                    {warehouse.location}
                                </label>
                            </div>
                        ))}
                    </div>
                    
                    <div>
                        <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg focus:outline-none focus:ring focus:ring-indigo-400"
                        >
                        Create Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
  )
}
