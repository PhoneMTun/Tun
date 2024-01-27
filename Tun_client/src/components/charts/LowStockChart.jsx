import React , {useState, useEffect} from 'react'
import { Bar } from 'react-chartjs-2';

export default function LowStockChart({inventory}) {
    const lowStockThreshold  = 25;
    const lowStockItems = inventory.filter(item=>item.quantity < lowStockThreshold)
    const data = {
        labels: lowStockItems.map(item => item.name),
        datasets: [
        {
            label: 'Quantity',
            data: lowStockItems.map(item => item.quantity),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(0, 176, 255, 1)',
            borderWidth: 1,
        },
        ],
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
                text: 'Low Stock Items',
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
        <div className="p-4 bg-gray-100 rounded-lg shadow-lg ml-6 mb-6 w-full h-74">
            <Bar data={data} options={options} />
        </div>
    );
}
