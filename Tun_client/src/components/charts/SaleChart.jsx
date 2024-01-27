import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function SaleChart({ salesData }) {

    const [view, setView] = useState('daily');

    // Sort sales data by date
    const sortedSalesData = [...salesData].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    // Function to aggregate sales by date or month
    const aggregateSales = (salesData, type) => {
        return salesData.reduce((acc, sale) => {
            let key;
            if (type === 'daily') {
                key = sale.created_at.split(' ')[0];
            } else if (type === 'monthly') {
                key = sale.created_at.substring(0, 7); // YYYY-MM format
            }
            acc[key] = (acc[key] || 0) + sale.total;
            return acc;
        }, {});
    };

    // Aggregate sales based on the current view
    const salesByPeriod = aggregateSales(sortedSalesData, view);

    // Prepare the data for the chart
    const labels = Object.keys(salesByPeriod);
    const data = {
        labels: labels,
        datasets: [{
            label: view === 'daily' ? 'Daily Sales' : 'Monthly Sales',
            data: Object.values(salesByPeriod),
            fill: false,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            tension: 0.3,
            pointRadius: 3,
            pointHoverRadius: 5
        }]
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-lg mt-6 mb-6">
            <div className="flex justify-center space-x-4 mb-6">
                <button onClick={() => setView('daily')} className={`px-3 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${view === 'daily' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}>Daily</button>
                <button onClick={() => setView('monthly')} className={`px-3 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${view === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}>Monthly</button>
            </div>
            <div className="h-64">
                <Line data={data} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                        },
                        title: {
                            display: true,
                            text: 'Sales Trends',
                            font: {
                                size: 16
                            }
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            grid: {
                                color: 'rgba(200, 200, 200, 0.3)'
                            }
                        }
                    }
                }} />
            </div>
        </div>
    );
}
