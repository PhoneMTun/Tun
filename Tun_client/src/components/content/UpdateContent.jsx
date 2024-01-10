import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CreateInventory_form from '../form/CreateInventory_form';

export default function UpdateContent({fetchInventory, inventory}) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [validation, setValidationErrors] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        color: '',
        sizes: '',
        prices: '',
        quantity: '',
        quantity_per_packet: '',
        image_url: [],
        type: '',
        warehouse_id: '',
        user_id: '' 
    });
    const [error, setError] = useState('');

    const fetchthisInventory = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/inventory/${id}`);
            const imageUrls = response.data.image_url.split(',').map(filename => 
                `../../../public/product_pictures/${response.data.sku}/${filename}`
            );
            setFormData({
                ...formData,
                name: response.data.name,
                sku: response.data.sku,
                color: response.data.color,
                sizes: response.data.sizes,
                prices: response.data.prices,
                quantity: response.data.quantity,
                quantity_per_packet: response.data.quantity_per_packet,
                image_url: imageUrls,
                type: response.data.type,
                warehouse_id: response.data.warehouse.id,
                user_id: response.data.userdata.id
            });
        } catch (error) {
            setError('Error fetching inventory: ' + error);
        }
    };
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
        for (var i = 0; i < formData.image_url.length; i++) {
            if(typeof formData.image_url[i]==='string'){
                errors.image_url = 'Pick .png, .jpg or .jpeg file types';
        }
    }
        // console.log(typeof formData.image_url[0]);
        // if(typeof formData.image_url==='string') {
        // const allowedTypes = ['.png', '.jpg', '.jpeg'];
        // if (!allowedTypes.includes(formData.image_url.type)) {
        //         errors.image_url = 'Pick a proper image type'
        // }
        
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
      };

    useEffect(() => {
        fetchthisInventory();
    }, [id]); // Dependency array ensures useEffect runs only when id changes
    
    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
    
        setFormData(prevFormData => {
            if (type === 'file') {
                // Creating an array from FileList
                const fileArray = Array.from(files);
                return { ...prevFormData, [name]: fileArray };
            } else {
                return { ...prevFormData, [name]: value };
            }
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm(formData)) {
            console.log('Validation failed');
            return;
        }
        const data = new FormData();
        if (formData.image_url && formData.image_url.length) {
            formData.image_url.forEach((file) => {
                if (file instanceof File) {
                    data.append('image_url', file);
                }
            });
        }
        Object.keys(formData).forEach(key => {
            if (key !== 'image_url') {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await axios.patch(`http://localhost:5000/update/inventory/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await fetchInventory()
            navigate('/home/inventory');
        } catch (error) {
            console.error('Error updating inventory:', error);
        }
    };

    return (
        <CreateInventory_form formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} validationErrors={validation} inventory={inventory}/>
    );
}
