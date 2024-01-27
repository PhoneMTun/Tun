import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

export default function InventoryTypeChart({ inventory}) {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [],
            hoverBackgroundColor: []
        }]
    });

    useEffect(() => {
        const typeCounts = {};
        const totalItems = inventory.length;
        const backgroundColors = [];
        const hoverBackgroundColors = [];

        inventory.forEach(item => {
            typeCounts[item.type] = (typeCounts[item.type] || 0) + 1;
        });

        const labelsWithPercentages = Object.keys(typeCounts).map(type => {
            const percentage = ((typeCounts[type] / totalItems) * 100).toFixed(2);
            return `${type} (${percentage}%)`;
        });

        Object.keys(typeCounts).forEach((type, index) => {
            backgroundColors.push(`hsl(${index * 35 % 360}, 60%, 60%)`);
            hoverBackgroundColors.push(`hsl(${index * 35 % 360}, 70%, 50%)`);
        });

        setChartData({
            labels: labelsWithPercentages,
            datasets: [{
                data: Object.values(typeCounts),
                backgroundColor: backgroundColors,
                hoverBackgroundColor: hoverBackgroundColors
            }]
        });
    }, [inventory]);
    const options = {
        responsive: true,
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
                text: 'Inventory Composition by Type',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            }
        }
        
    };
    

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-lg ml-6 mb-6">
            <Doughnut data={chartData} options={options}/>
        </div>
    );
}
