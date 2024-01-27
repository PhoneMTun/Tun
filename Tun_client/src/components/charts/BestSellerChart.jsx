import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function TopSellingProductsChart({ salesData }) {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Total Quantity Sold',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1
        }]
    });

    useEffect(() => {
        const fetchProductNames = async (ids) => {
            try {
                const names = await Promise.all(
                    ids.map(async ([id]) => {
                        const response = await fetch(`http://localhost:5000/inventory/${id}`);
                        if (!response.ok) {
                            throw new Error('Failed to fetch product data');
                        }
                        const data = await response.json();
                        return data ? data.name : 'Unknown Product';
                    })
                );
                return names;
            } catch (error) {
                console.error('Error fetching product names:', error);
                return ids.map(() => 'Unknown Product');
            }
        };
        
        const updateChartData = async () => {
            const quantitiesById = {};
            salesData.forEach(sale => {
                const items = JSON.parse(sale.items);
                items.forEach(item => {
                    quantitiesById[item.id] = (quantitiesById[item.id] || 0) + item.quantity;
                });
            });
            const topSellingIds = Object.entries(quantitiesById)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5);
            const names = await fetchProductNames(topSellingIds);
            setChartData({
                labels: names,
                datasets: [{
                    ...chartData.datasets[0],
                    data: topSellingIds.map(([, quantity]) => quantity)
                }]
            });
        };
        updateChartData();
    }, [salesData]);
    
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 20
                }
            },
            title: {
                display: true,
                text: 'Top 5 selling items',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(200, 200, 200, 0.3)'
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-lg ml-6 mb-6">
            <Bar data={chartData} options={options} />
        </div>
    );
}
