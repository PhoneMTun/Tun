import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function WarehouseChart({ inventory }) {
    const totalQuantities = {
        Main: 0,
        Warehouse: 0
    };
    inventory.forEach(item => {
        const location = item.warehouse.location;
        if (location === 'Main') {
            totalQuantities.Main += item.quantity;
        } else if (location === 'Warehouse') {
            totalQuantities.Warehouse += item.quantity;
        }
    });

    const chartData = {
        labels: ['Main', 'Warehouse'],
        datasets: [{
            label: 'Total Quantity',
            data: [totalQuantities.Main, totalQuantities.Warehouse],
            backgroundColor: ['rgba(123, 31, 162, 0.5)', 'rgba(0, 176, 255, 0.5)'],
            borderColor: ['', 'rgba(0, 176, 255, 1)'],
            borderWidth: 2,
            borderRadius: 10,
            hoverBackgroundColor: ['rgba(123, 31, 162, 0.7)', 'rgba(0, 176, 255, 0.7)'],
            hoverBorderColor: ['rgba(123, 31, 162, 1)', 'rgba(0, 176, 255, 1)'],
            hoverBorderWidth: 3,
            barPercentage: 0.7,
            categoryPercentage: 0.8
        }]
    };

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
                text: 'Inventory Quantities by Location',
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
        <div className="p-4 bg-gray-100 rounded-lg shadow-lg ml-6 mb-6 w-full h-72">
            <Bar data={chartData} options={options} />
        </div>
    );
}
