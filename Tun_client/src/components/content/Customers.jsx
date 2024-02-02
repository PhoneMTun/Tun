import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomerID, setEditingCustomerID] = useState(null);
  const [customerEdits, setCustomerEdits] = useState({});
  const [newCustomer, setNewCustomer] = useState({ name: '', location: '', phoneno: '' });
  const [searchQuery, setSearchQuery] = useState('');
  

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleEdit = (customer) => {
    setEditingCustomerID(customer.id);
    setCustomerEdits({ name: customer.name, location: customer.location, phoneno: customer.phoneno });
  };

  const handleConfirm = async (customerID) => {
    try {
      const response = await axios.patch(`http://localhost:5000/update/customer/${customerID}`, customerEdits);
      setCustomers(customers.map((customer) => customer.id === customerID ? {...customer, ...customerEdits} : customer));
      setEditingCustomerID(null);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleChange = (e) => {
    setCustomerEdits({ ...customerEdits, [e.target.name]: e.target.value });
  };

  const handleInputChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/create/customer', newCustomer);
      setCustomers([response.data, ...customers]);
      setNewCustomer({ name: '', location: '', phoneno: '' });
      fetchCustomers();
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCustomers = searchQuery
    ? customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : customers;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Customers</h1>
      
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-3">Create Customer</h2>
        <form onSubmit={handleSubmit} className="flex gap-3 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Customer Name"
            value={newCustomer.name}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newCustomer.location}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
          />
          <input
            type="text"
            name="phoneno"
            placeholder="Phone Number"
            value={newCustomer.phoneno}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
          />
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Create
          </button>
        </form>
      </div>

      {/* Customer List and Edit Form */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 bg-white p-4 rounded-lg shadow-md">
            <input
                type="text"
                placeholder="Search by Customer Name"
                value={searchQuery}
            onChange={handleSearchChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out mb-4 md:mb-0"
            />
        </div>
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-blue-600 text-white uppercase text-lg leading-tight">
              <th className="px-5 py-3">Customer ID</th>
              <th className="px-5 py-3">Customer Name</th>
              <th className="px-5 py-3">Location</th>
              <th className="px-5 py-3">Phone Number</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-200">
                <td className="px-5 py-5 border-b border-gray-200">{customer.id}</td>
                <td className="px-5 py-5 border-b border-gray-200">
                  <input
                    type="text"
                    name="name"
                    value={editingCustomerID === customer.id ? customerEdits.name : customer.name}
                    onChange={(e) => handleChange(e)}
                    readOnly={editingCustomerID !== customer.id}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none"
                  />
                </td>
                <td className="px-5 py-5 border-b border-gray-200">
                  <input
                    type="text"
                    name="location"
                    value={editingCustomerID === customer.id ? customerEdits.location : customer.location}
                    onChange={(e) => handleChange(e)}
                    readOnly={editingCustomerID !== customer.id}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none"
                  />
                </td>
                <td className="px-5 py-5 border-b border-gray-200">
                  <input
                    type="text"
                    name="phoneno"
                    value={editingCustomerID === customer.id ? customerEdits.phoneno : customer.phoneno}
                    onChange={(e) => handleChange(e)}
                    readOnly={editingCustomerID !== customer.id}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none"
                  />
                              </td>
            <td className="px-5 py-5 border-b border-gray-200">
              {editingCustomerID === customer.id ? (
                <>
                  <button
                    onClick={() => handleConfirm(customer.id)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 rounded-full transition duration-300 mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingCustomerID(null)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded-full transition duration-300"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleEdit(customer)}
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

export default Customers;
