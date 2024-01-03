import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported
import CreateInventory_form from '../form/CreateInventory_form';
export default function CreateInventoryContent({ formData, handleChange , user}) {
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState({});

    const validateForm = () => {
        let errors = {};
        if (!formData.sku) {
            errors.sku = 'SKU is required';
        }
    
        if (!formData.name.trim()) {
            errors.name = 'Item name is required';
        }
        if (!formData.color) {
            errors.color = 'Color is required';
        }
    
        if (!formData.sizes || formData.sizes <= 0) {
            errors.sizes = 'Size is required and must be a positive number';
        }
    
        if (!formData.prices || isNaN(formData.prices) || formData.prices <= 0) {
            errors.prices = 'Valid price is required and must be a positive number';
        }
    
        if (!formData.quantity || isNaN(formData.quantity) || formData.quantity <= 0) {
            errors.quantity = 'Valid quantity is required and must be a positive number';
        }
    
        if (!formData.quantity_per_packet || isNaN(formData.quantity_per_packet) || formData.quantity_per_packet <= 0) {
            errors.quantity_per_packet = 'Valid quantity per packet is required and must be a positive number';
        }
        if (!formData.type.trim()) {
            errors.type = 'Type is required';
        }
        if (!formData.warehouse_id) {
            errors.warehouse_id = 'Warehouse location is required';
        }
        if (formData.image_url && formData.image_url.length > 4) {
            errors.image_url = 'Upload no more than 4 images';
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };
    
    
    
    const handleSubmit = async (e) => {
        console.log('tring to submit');
        e.preventDefault();
        if(!validateForm()){
            console.log('valdiation failed')
            return;
        }
        console.log('validation successful');
        const data = new FormData();
        if (formData.image_url) {
            formData.image_url.forEach((file, index) => {
                data.append('image_url', file);
            });
        }
    

        // Object.keys(formData).forEach(key => {
        //     if (key !== 'image_url') {
        //         data.append(key, formData[key]);
        //     }
        // });
    
        try {
            const response = await axios.post('http://localhost:5000/create/inventory', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/home/inventory');
            console.log(response.data);
        } catch (error) {
            console.error('Error creating inventory:', error);
        }
    };
    
    return (
        <CreateInventory_form formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} validationErrors={validationErrors} user={user}/>
    );
}    
