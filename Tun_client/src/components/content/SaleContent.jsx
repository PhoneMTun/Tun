import React, { useState, useEffect } from 'react';
import SKUPick from '../navigators/SKUPick';
import Saleform from '../form/Saleform';
import SearchBar from '../filter/SearchSKU';
import CurrencyConvert from '../API/CurrencyConvert';
import { useNavigate } from 'react-router-dom';

export default function SaleContent({ inventory, user, customers }) {
    // Load items from local storage or initialize to an empty array if not available
    const navigate = useNavigate();
    const savedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    const [formData, setFormData] = useState({
        items: savedItems,
        discount: 0,
        total: 0,
        customer_id: '',
        income_statement_id: '',
        user_id: user.id,
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredInventory, setFilteredInventory] = useState([]);

    // Effect for recalculating the total whenever items change
    useEffect(() => {
        const newTotal = formData.items.reduce((acc, item) => acc + item.prices * item.quantity, 0);
        setFormData(prevFormData => ({ ...prevFormData, total: newTotal }));
    }, [formData.items]);

    // Update local storage when items change
    const updateLocalStorage = (items) => {
        localStorage.setItem('selectedItems', JSON.stringify(items));
    };

    // Handler to add an item to the cart
    const addItemToCart = (selectedItem) => {
        const existingItemIndex = formData.items.findIndex(item => item.id === selectedItem.id);
        let updatedItems = [...formData.items];
        const inventoryItem = inventory.find(item => item.id === selectedItem.id);
    
        if (existingItemIndex !== -1) {
            const existingItem = updatedItems[existingItemIndex];
            if (existingItem.quantity + 1 > inventoryItem.quantity || inventoryItem.quantity===0) {
                alert(`Cannot add more of ${selectedItem.name}. Only ${inventoryItem.quantity} available in stock.`);
                return;
            }
            updatedItems[existingItemIndex] = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
        } else {
            if (selectedItem.quantity > inventoryItem.quantity) {  
                alert(`Cannot add ${selectedItem.name}. Only ${inventoryItem.quantity} available in stock.`);
                return;
            }
            const newItem = {
                ...selectedItem,
                quantity: 1
            };
            updatedItems.push(newItem);
        }
    
        setFormData({ ...formData, items: updatedItems });
        updateLocalStorage(updatedItems);
    };

    // Unified handler for form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        const itemIndex = e.target.getAttribute('data-itemindex');
    
        if (name === "quantity" && itemIndex !== null) {
            const newQuantity = parseInt(value, 10);
            const updatedItems = formData.items.map((item, idx) =>
                idx.toString() === itemIndex ? { ...item, quantity: newQuantity } : item
            );
            setFormData({ ...formData, items: updatedItems });
            updateLocalStorage(updatedItems);
        } else {
            setFormData({ ...formData, [name]: name === "discount" ? parseFloat(value) || 0 : value });
        }
    };
    
    

    // Handler for search bar changes
    const handleSearch = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);
    };

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        navigate('/invoice-confirmation', { state: { invoiceDetails: formData } });
 
        // Submit logic here
    };

    // Handler to remove an item from the cart
    const removeItemFromCart = (event,itemId ) => {
        event.stopPropagation();
        const updatedItems = formData.items.filter(item => item.id !== itemId);
        setFormData({ ...formData, items: updatedItems });
        updateLocalStorage(updatedItems);
    };

    // Fetch latest POS data
    const fetchLatestPOS = async () => {
        try {
            const response = await fetch('http://localhost:5000/point-of-sale/latest');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const latestPOS = await response.json();
            if (latestPOS && latestPOS.created_at) {
                const mostRecentItemYear = new Date(latestPOS.created_at).getFullYear();
                let newIncomeStatementId;
                if (new Date().getFullYear() !== mostRecentItemYear) {
                    newIncomeStatementId = latestPOS.income_statement.id + 1;
                } else {
                    newIncomeStatementId = latestPOS.income_statement.id;
                }
                setFormData(prevFormData => ({ ...prevFormData, income_statement_id: newIncomeStatementId, user_id: latestPOS.user_id }));
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    // Effect to fetch POS and filter inventory based on search term
    useEffect(() => {
        fetchLatestPOS();
        const filteredItems = inventory.filter(
            item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredInventory(filteredItems);
    }, [searchTerm, inventory]);

    return (
        <div className="flex flex-col md:flex-row md:space-x-6 p-6 bg-gray-50 w-full">
            <div className="md:w-1/2">
                <SearchBar onSearch={handleSearch} />
                <SKUPick inventory={filteredInventory} searchTerm={searchTerm} onItemSelect={addItemToCart} />
            </div>
            <div className="flex-grow md:w-1/2">
                <CurrencyConvert className="mb-10" />
                <Saleform
                formData={formData}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                onRemoveItem={removeItemFromCart}
                customers={customers}
                />
            </div>
        </div>
    );
    }
