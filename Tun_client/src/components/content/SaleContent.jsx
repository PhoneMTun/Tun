import React, { useState } from 'react';
import SKUPick from '../navigators/SKUPick';
import Saleform from '../form/Saleform';

export default function SaleContent({ inventory, user }) {
    console.log(user);
    const [formData, setFormData] = useState({
        items: [],
        total: 0,
        customer_id: '',
        income_statement_id: '',
        user_id: user.id,
    });

    const addItemToCart = (selectedItem) => {
        console.log("Adding item:", selectedItem);
        
        // Check if the item already exists in the cart
        const existingItem = formData.items.find(item => item.id === selectedItem.id);
    
        let updatedItems;
        if (existingItem) {
            // Increase the quantity of the existing item
            updatedItems = formData.items.map(item => 
                item.id === selectedItem.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            // Add the new item with a quantity of 1
            const newItem = { ...selectedItem, quantity: 1, price: parseFloat(selectedItem.prices || 0) };
            updatedItems = [...formData.items, newItem];
        }
    
        // Calculate the new total
        const newTotal = updatedItems.reduce((acc, item) => acc + (item.prices * item.quantity), 0);
        setFormData({ ...formData, items: updatedItems, total: newTotal });
    };

    const handleQuantityChange = (e, changedItem) => {
        const newQuantity = parseInt(e.target.value) ;
        console.log(newQuantity);
        const updatedItems = formData.items.map(item =>
            item.id === changedItem.id ? { ...item, quantity: newQuantity, price: parseFloat(item.prices || 0) } : item
        );

        const newTotal = updatedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setFormData({ ...formData, items: updatedItems, total: newTotal });
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    return (
    <div className="flex flex-col md:flex-row md:space-x-6 p-6 bg-gray-50">
        <div className="md:w-1/3">
            <SKUPick inventory={inventory} onItemSelect={addItemToCart} />
        </div>
        <div className="flex-grow md:w-2/3">
            <Saleform formData={formData} onSubmit={handleSubmit} handleQuantityChange={handleQuantityChange}/>
        </div>
    </div>  
    )
}
