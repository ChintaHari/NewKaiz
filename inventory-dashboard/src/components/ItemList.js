import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemListTable from './ItemListTable';
import { TextField } from '@mui/material'; // Import the TextField component for the search input

const App = () => {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // State to keep track of search input
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
    const [filterCategory, setFilterCategory] = useState('');

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('token');
            
            // Include the token in the Authorization header
            const response = await axios.get('http://localhost:8000/items/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };
    

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const getFilteredItems = () => {
        if (!searchQuery) return items;
        return items.filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.sku.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleFilterChange = (category) => {
        setFilterCategory(category);
    };

    const getProcessedItems = () => {
        let processedItems = [...items];

        if (filterCategory) {
            processedItems = processedItems.filter(item => item.category === filterCategory);
        }

        if (searchQuery) {
            processedItems = processedItems.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.sku.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        processedItems.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        return processedItems;
    };

    return (
        <div>
            <h1>Item List</h1>
            <ItemListTable
                items={getProcessedItems()}
                onSearch={handleSearch}
                onSort={handleSort}
                onFilterChange={handleFilterChange}
                searchQuery={searchQuery}
                sortConfig={sortConfig}
                filterCategory={filterCategory}
            />
        </div>
    );
};

export default App;
