import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import SearchBar from '../filter/SearchSku';
import SortNewtoOld from '../filter/SortNewtoOld';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import DisplayEachInventory from './DisplayEachInventory';

const InventoryContent = ({ user, inventory, setInventory, error, isLoading, setValidationErrors, setFormData }) => {
  const toast = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const resetValidationErrors = () => {
    setValidationErrors([]);
    setFormData({
      name: '',
      sku: '',
      color: '',
      sizes: '',
      prices: '',
      quantity: '',
      quantity_per_packet: '',
      image_url: '',
      type: '',
      warehouse_id: '',
      user_id: ''
    });
  };

  const accept = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete/inventory/${itemId}`);
      console.log("Deleting item with ID:", itemId);
      toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Item deleted', life: 3000 });
      setInventory(prevInventory => prevInventory.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Item could not be deleted', life: 3000 });
    }
  };

  const reject = () => {
    toast.current.show({ severity: 'warn', summary: 'Cancelled', detail: 'Deletion cancelled', life: 3000 });
  };

  const handleDelete = (itemId, event) => {
    confirmPopup({
      target: event.currentTarget,
      message: 'Do you want to delete this record?',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger p-button-rounded p-button-raised bg-red-500 border-red-500 text-white px-2 py-2',
      rejectClassName: 'p-button-secondary p-button-rounded p-button-raised bg-blue-400 border-gray-400 text-white px-2 py-2 mr-3',
      accept: () => accept(itemId),
      reject
    });
  };

  const handleSearch = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  useEffect(() => {
    const filteredItems = inventory.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.sku.toLowerCase().includes(searchTerm)
    );
    const sortedItems = [...filteredItems];
    if (sortOrder === 'newest') {
      sortedItems.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sortOrder === 'oldest') {
      sortedItems.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }
    setFilteredInventory(sortedItems);
  }, [searchTerm, inventory, sortOrder]);

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US').format(price);
  };


  
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };

  const handleItemClick = (item, event) => {
    event.preventDefault();
    setSelectedItem(item);
    setIsModalVisible(true);
  };
  
  return (
    <div className="bg-dark-blue min-h-screen  p-6">
      <Toast ref={toast} />
      <ConfirmPopup />
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out shadow-md hover:shadow-lg">
        Inventory Management
      </h1>

      {user.role === 'admin' && (
        <Link to="/home/inventory/create-inventory" className="mb-2 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg">
          <Button onClick={resetValidationErrors} label="Create an Item" />
        </Link>
      )}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 bg-white p-4 rounded-lg shadow-md">
        <SearchBar onSearch={handleSearch} />

        <SortNewtoOld sortOrder={sortOrder} onSortChange={handleSortChange} />
      </div>
      {filteredInventory.length > 0 ? (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-blue-600 text-white uppercase text-lg leading-tight">
                <th className="px-5 py-3 rounded-tl-lg">Item Name</th>
                <th className="px-5 py-3">SKU</th>
                <th className="px-5 py-3">Color</th>
                <th className="px-5 py-3">Image</th>
                <th className="px-5 py-3 ">Price(Kyats)</th>
                <th className="px-5 py-3">Quantity</th>
                {/* <th className="px-5 py-3">Quantity PER Packet</th>
                <th className="px-5 py-3">Total Packets</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3 ">Created by</th>
                <th className="px-5 py-3 ">Created at</th> */}
                {user.role === 'admin' && (
                <th className="px-5 py-3 rounded-tr-lg">Actions</th>)}
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredInventory.map(item => (
                <tr key={item.id} className="hover:bg-gray-200">
                  <td className="px-5 py-5 border-b border-gray-200">{item.name}</td>
                
                  <td className="px-5 py-5 border-b border-gray-200 bg-blue-100 text-blue-900 font-medium">
                    <a onClick={(e) => handleItemClick(item, e)} className="hover:text-blue-600 cursor-pointer">
                        {item.sku}
                    </a>
                </td>
                  
                  <td className="px-5 py-5 border-b border-gray-200">{item.color}</td>
                  <td className="px-5 py-5 border-b border-gray-200">
                  {item.image_url && (
                      <img 
                          src={`/product_pictures/${item.sku}/${item.image_url.split(',')[0]}`} 
                          alt={item.name} 
                          className="w-10 h-10 rounded-full" 
                      />
                  )}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-green-100 text-green-900 font-medium">
                    {formatPrice(item.prices)}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200">{item.quantity}</td>
                  {/* <td className="px-5 py-5 border-b border-gray-200">{item.quantity_per_packet}</td>
                  <td className="px-5 py-5 border-b border-gray-200"> {Math.floor(item.quantity / item.quantity_per_packet)}</td>
                  <td className="px-5 py-5 border-b border-gray-200">{item.type}</td>
                  <td className="px-5 py-5 border-b border-gray-200">{item.warehouse.location}</td>
                  <td className="px-5 py-5 border-b border-gray-200">{item.userdata.first_name}</td>
                  <td className="px-5 py-5 border-b border-gray-200">{formatDate(item.created_at)}</td> */}
                  {user.role === 'admin' && (                
                  <td className="px-5 py-5 border-b border-gray-200">
                  <Link to={`/home/inventory/edit/${item.id}`} style={{ textDecoration: 'none' }}>
                    <Button
                      onClick={resetValidationErrors}
                      icon="pi pi-pencil" 
                      label="Edit" 
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out shadow hover:shadow-md mr-2"
                      />
                  </Link>
                  <Button 
                      onClick={(e) => handleDelete(item.id, e)} 
                      icon="pi pi-times" 
                      label="Delete" 
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out shadow hover:shadow-md"
                    />
                  </td>
                    )}
                </tr>
                
              ))}
            </tbody>
          </table>
          {isModalVisible && selectedItem && (
        <DisplayEachInventory item={selectedItem} onClose={closeModal} />
      )}


        </div>
        
      ) : (
        <p className="text-center mt-6">No inventory items found.</p>
      )}
    </div>
  );
};

export default InventoryContent;
