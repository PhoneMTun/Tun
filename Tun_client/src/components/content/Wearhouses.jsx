import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Warehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [editingWarehouseID, setEditingWarehouseID] = useState(null);
  const [warehouseEdits, setWarehouseEdits] = useState({});
  const [newWarehouse, setNewWarehouse] = useState({ location: '', level: '' });

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/warehouses');
      setWarehouses(response.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const handleEdit = (warehouse) => {
    setEditingWarehouseID(warehouse.id);
    setWarehouseEdits({ location: warehouse.location, level: warehouse.level });
  };

  const handleConfirm = async (warehouseID) => {
    try {
      const response = await axios.patch(`http://localhost:5000/update/warehouse/${warehouseID}`, warehouseEdits);
      setWarehouses(warehouses.map((warehouse) => warehouse.id === warehouseID ? {...warehouse, ...warehouseEdits} : warehouse));
      setEditingWarehouseID(null);
    } catch (error) {
      console.error('Error updating warehouse:', error);
    }
  };

  const handleChange = (e) => {
    setWarehouseEdits({ ...warehouseEdits, [e.target.name]: e.target.value });
  };

  const handleInputChange = (e) => {
    setNewWarehouse({ ...newWarehouse, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post('http://localhost:5000/create/warehouse', newWarehouse);
        setWarehouses([response.data, ...warehouses]);
        setNewWarehouse({ location: '', level: '' });
        fetchWarehouses();
        } catch (error) {
        console.error('Error creating warehouse:', error);
        }
    };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Warehouses</h1>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-3">Create Warehouse</h2>
        <form onSubmit={handleSubmit} className="flex gap-3 mb-4">
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newWarehouse.location}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
          />
          <input
            type="text"
            name="level"
            placeholder="Level"
            value={newWarehouse.level}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
          />
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Create
          </button>
        </form>
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-blue-600 text-white uppercase text-lg leading-tight">
              <th className="px-5 py-3">Warehouse ID</th>
              <th className="px-5 py-3">Location</th>
              <th className="px-5 py-3">Level</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          
          <tbody className="text-gray-700">
            {warehouses.map((warehouse) => (
              <tr key={warehouse.id} className="hover:bg-gray-200">
                <td className="px-5 py-5 border-b border-gray-200">{warehouse.id}</td>
                <td className="px-5 py-5 border-b border-gray-200">
                  <input
                    type="text"
                    name="location"
                    value={editingWarehouseID === warehouse.id ? warehouseEdits.location : warehouse.location}
                    onChange={(e) => handleChange(e)}
                    readOnly={editingWarehouseID !== warehouse.id}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none"
                  />
                </td>
                <td className="px-5 py-5 border-b border-gray-200">
                  <input
                    type="text"
                    name="level"
                    value={editingWarehouseID === warehouse.id ? warehouseEdits.level : warehouse.level}
                    onChange={(e) => handleChange(e)}
                    readOnly={editingWarehouseID !== warehouse.id}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none"
                  />
                </td>
                <td className="px-5 py-5 border-b border-gray-200">
                  {editingWarehouseID === warehouse.id ? (
                    <>
                      <button
                        onClick={() => handleConfirm(warehouse.id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 rounded-full transition duration-300 mr-2
                        ">
                        Save
                      </button>
                      <button
                        onClick={() => setEditingWarehouseID(null)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded-full transition duration-300"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEdit(warehouse)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-full transition duration-300"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default Warehouses;
    
