import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SaleChart from '../charts/SaleChart';
import InventoryChart from '../charts/InventoryChart';
import BestSellerChart from '../charts/BestSellerChart';
import TypesChart from '../charts/TypesChart';
import LowStockChart from '../charts/LowStockChart';

const DashboardContent = ({ user , inventory}) => {
  const [receipts, setReceipts] = useState([]);

    const fetchReceipts = async () => {
        try {
        const response = await axios.get('http://localhost:5000/point-of-sale');
        setReceipts(response.data);
        } catch (error) {
        console.error('Error fetching receipts:', error);
        }
    };

    useEffect(() => {
        fetchReceipts();
    }, []);
    console.log(receipts)
  return (
    <div>
      <div className="bg-white p-12 rounded shadow-md">
      <h1 className="text-4xl font-bold mb-4 text-blue-900 uppercase">
        Hello, {user && user.role} - {user && user.first_name}
      </h1>
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Dashboard Overview</h3>
        <p className="text-gray-600">Welcome to your personalized dashboard. Here is the overview of business performace.</p>
      </div>
      <div></div>
      <SaleChart salesData={receipts}/>
      <div className='flex w-full pt-8 pb-8'>
          <InventoryChart inventory={inventory}/>
          <BestSellerChart salesData={receipts}/>
      </div>
      <div className='flex w-full pt-8 pb-8'>
        <TypesChart inventory={inventory}/>
        <LowStockChart inventory={inventory}/>
      </div>
    </div>

  );
};

export default DashboardContent;
