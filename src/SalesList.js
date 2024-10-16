import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function SalesList() {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newSale, setNewSale] = useState({
        customer_id: '',
        product_id: '',
        unit_price: '',
        quantity: ''
    });

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = () => {
        setLoading(true);
        axios.get('http://localhost:3001/sales')
        .then(response => {
            setSales(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching sales data:', error);
            setLoading(false);
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSale({
            ...newSale,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/sales', newSale)
        .then(response => {
            alert('Sale record added successfully');
            setNewSale({
                customer_id: '',
                product_id: '',
                unit_price: '',
                quantity: ''
            });
            fetchSales();
        })
        .catch(error => {
            console.error('Error adding sale record:', error);
            alert('Error adding sale record');
        });
    };

    if (loading) {
        return <p>Loading sales...</p>;
    }

    return (
        <div>
        <h2>Sales List</h2>

        <form class="form" onSubmit={handleSubmit}>
            <input
            type="number"
            name="customer_id"
            placeholder="Customer ID"
            value={newSale.customer_id}
            onChange={handleInputChange}
            required
            />
            <input
            type="number"
            name="product_id"
            placeholder="Product ID"
            value={newSale.product_id}
            onChange={handleInputChange}
            required
            />
            <input
            type="number"
            name="unit_price"
            placeholder="Unit Price"
            value={newSale.unit_price}
            onChange={handleInputChange}
            required
            />
            <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newSale.quantity}
            onChange={handleInputChange}
            required
            />
            <button type="submit">Add Sale</button>
        </form>

        <table class="table1" border="1" style={{ marginTop: '20px' }}>
            <thead>
            <tr>
                <th class="th">Sale ID</th>
                <th class="th">Customer ID</th>
                <th class="th">Product ID</th>
                <th class="th">Unit Price</th>
                <th class="th">Quantity</th>
            </tr>
            </thead>
            <tbody>
            {sales.map(sale => (
                <tr key={sale.sale_id}>
                    <td class="td">{sale.sale_id}</td>
                    <td class="td">{sale.customer_id}</td>
                    <td class="td">{sale.product_id}</td>
                    <td class="td">{sale.unit_price}</td>
                    <td class="td">{sale.quantity}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default SalesList;
