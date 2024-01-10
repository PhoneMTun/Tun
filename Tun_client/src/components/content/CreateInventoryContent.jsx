import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported
import CreateInventory_form from '../form/CreateInventory_form';
export default function CreateInventoryContent({ formData, handleChange , fetchInventory, validateForm, validationErrors, inventory}) {
    const navigate = useNavigate();
    
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
        Object.keys(formData).forEach(key => {
            if (key !== 'image_url') {
                data.append(key, formData[key]);
            }
        });
        try {
            const response = await axios.post('http://localhost:5000/create/inventory', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await fetchInventory()
            navigate('/home/inventory');
            console.log(response.data);
        } catch (error) {
            console.error('Error creating inventory:', error);
        }
    };
    return (
        <CreateInventory_form formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} validationErrors={validationErrors} inventory={inventory}/>
    );
}    
