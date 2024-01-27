import React from 'react'

export default function SortNewtoOld({ sortOrder, onSortChange }) {
    return (
        <select
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
        </select>
    );
    }