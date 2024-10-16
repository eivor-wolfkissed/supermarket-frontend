
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCustomer, setNewCustomer] = useState({
        fname: '',
        lname: '',
        address: '',
        account_no: ''
    });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        setLoading(true);
        axios.get('http://localhost:3001/customers')
        .then(response => {
            setCustomers(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching customer data:', error);
            setLoading(false);
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer({
        ...newCustomer,
        [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/customers', newCustomer)
        .then(response => {
            alert('Customer added successfully');
            setNewCustomer({
            fname: '',
            lname: '',
            address: '',
            account_no: ''
            });
            fetchCustomers();
        })
        .catch(error => {
            console.error('Error adding customer:', error);
            alert('Error adding customer');
        });
    };

    if (loading) {
        return <p>Loading customers...</p>;
    }

    return (
        <div>
        <h2>Customer List</h2>

        <form class="form" onSubmit={handleSubmit}>
            <input
            type="text"
            name="fname"
            placeholder="First Name"
            value={newCustomer.fname}
            onChange={handleInputChange}
            required
            />
            <input
            type="text"
            name="lname"
            placeholder="Last Name"
            value={newCustomer.lname}
            onChange={handleInputChange}
            required
            />
            <input
            type="text"
            name="address"
            placeholder="Address"
            value={newCustomer.address}
            onChange={handleInputChange}
            required
            />
            <input
            type="text"
            name="account_no"
            placeholder="Account Number"
            value={newCustomer.account_no}
            onChange={handleInputChange}
            required
            />
            <button type="submit">Add Customer</button>
        </form>

        <table class= "table1" border="1" style={{ marginTop: '20px' }}>
            <thead>
            <tr>
                <th class="th">Customer ID</th>
                <th class="th">First Name</th>
                <th class="th">Last Name</th>
                <th class="th">Address</th>
                <th class="th">Account Number</th>
            </tr>
            </thead>
            <tbody>
            {customers.map(customer => (
                <tr key={customer.customer_id}>
                    
                <td class="td">{customer.customer_id}</td>
                <td class="td">{customer.fname}</td>
                <td class="td">{customer.lname}</td>
                <td class="td">{customer.address}</td>
                <td class="td">{customer.account_no}</td>
                
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
    }

    export default CustomerList;
