import React from 'react';

export default function SKUPick({ inventory, onItemSelect }) {
    return (
        <div className="w-full  p-4 bg-white rounded-lg shadow-md overflow-y-auto max-h-screen">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Pick SKU Items</h3>
            <div className="space-y-4">
                {inventory.map((item, index) => {
                    const imageUrls = item.image_url.split(',').map(filename => 
                        `../../../public/product_pictures/${item.sku}/${filename.trim()}`
                    );
                    const firstImageUrl = imageUrls[0];
                    return (
                        <div key={index} className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition duration-300">
                            
                            <img src={firstImageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-full border border-gray-200" />
                            
                            <div className="flex-grow">
                                <p className="text-gray-900 font-semibold">{item.name}</p>
                                <p className="text-gray-500 text-sm">SKU: {item.sku}</p>
                                <p className="text-gray-500 text-sm">Price: {item.prices}</p>
                                
                            </div>
                            
                            <button onClick={() => onItemSelect(item)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                Pick
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
