import React from 'react';

export default function SimilarSKU({ inventory, formData }) {
    const similarSKUItems = inventory.filter(item => item.sku.includes(formData.sku));

    return (
        <div className="w-full md:w-1/3 p-4 bg-gray-100 ml-10 rounded-lg shadow">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Similar SKU Items</h3>
            {similarSKUItems.length > 0 ? (
                <div className="h-96 overflow-y-auto">
                    {similarSKUItems.map((item, index) => {
                        const imageUrls = item.image_url.split(',').map(filename => 
                            `../../../public/product_pictures/${item.sku}/${filename.trim()}`
                        );
                        const firstImageUrl = imageUrls[0];

                        return (
                            <div key={index} className="mb-5 m-2 p-4 bg-white w-full rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition duration-300 flex items-center  space-x-4">
                                <img src={firstImageUrl} alt={`${item.name}`} className="w-16 h-16 object-cover rounded-full border border-gray-200" />
                                <div className="flex-grow">
                                    <p className="text-gray-900 font-semibold">{item.name}</p>
                                    <p className="text-gray-500 text-sm">SKU: {item.sku}</p>
                                    <p className="text-gray-500 text-sm">Color: {item.color}</p>
                                    <p className="text-gray-500 text-sm">Size: {item.sizes}</p>
                                    <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                                    {/* Other item details */}
                                </div>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200">
                                    Details
                                </button>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex justify-center items-center h-96">
                    <p className="text-gray-800 font-semibold">No similar SKUs found.</p>
                </div>
            )}
        </div>
    );
}
