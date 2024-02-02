import React, { useState } from 'react';
import axios from 'axios';

export default function CurrencyConvert() {
  const [formData, setFormData] = useState({
    fromCurrency: 'MMK',
    toCurrency: 'CNY', 
    amount: '',
    result: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const convertCurrency = (e) => {
    e.preventDefault();
    const { fromCurrency, toCurrency, amount } = formData;
    const apiUrl = `https://v6.exchangerate-api.com/v6/8e60f6f534a895d508c01bf5/latest/${fromCurrency}`;
    axios.get(apiUrl)
      .then((response) => {
        const exchangeRates = response.data.conversion_rates;
        if (exchangeRates[toCurrency]) {
          const convertedAmount = amount * exchangeRates[toCurrency];
          setFormData({ ...formData, result: `${convertedAmount} ${toCurrency}` });
        } else {
          setFormData({ ...formData, result: 'Invalid currency pair' });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setFormData({ ...formData, result: 'An error occurred' });
      });
  };

  return (
    <form onSubmit={convertCurrency} className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-lg mb-10">
      <div className="mb-4">
        <label htmlFor="fromCurrency" className="block text-gray-700 text-sm font-bold mb-2">
          From Currency
        </label>
        <select
          name="fromCurrency"
          id="fromCurrency"
          value={formData.fromCurrency}
          onChange={handleInputChange}
          className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="MMK">Myanmar Kyat (MMK)</option>
          <option value="CNY">Chinese Yuan (CNY)</option>
          <option value="USD">US Dollar (USD)</option>
          <option value="VND">Vietnamese Dong (VND)</option>
          <option value="THB">Thai Baht (THB)</option>
          
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="toCurrency" className="block text-gray-700 text-sm font-bold mb-2">
          To Currency
        </label>
        <select
          name="toCurrency"
          id="toCurrency"
          value={formData.toCurrency}
          onChange={handleInputChange}
          className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
        > 
          <option value="MMK">Myanmar Kyat (MMK)</option>
          <option value="CNY">Chinese Yuan (CNY)</option>
          <option value="USD">US Dollar (USD)</option>
          <option value="VND">Vietnamese Dong (VND)</option>
          <option value="THB">Thai Baht (THB)</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
          Amount
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={formData.amount}
          onChange={handleInputChange}
          className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter amount"
          required
        />
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          Convert
        </button>
      </div>
      {formData.result && (
        <div className="text-center text-gray-800 font-semibold">
          Result: {formData.result}
        </div>
      )}
    </form>
  );
}
