import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newProduct, setNewProduct] = useState({
        product_id: '',
        product_name: '',
        price: '',
        expiration_date: '',
        brand: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        setLoading(true);
        axios.get('http://localhost:3001/products')
        .then(response => {
            setProducts(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
            setLoading(false);
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
        ...newProduct,
        [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/products', newProduct)
        .then(response => {
            alert('Product added successfully');
            setNewProduct({
            product_id: '',
            product_name: '',
            price: '',
            expiration_date: '',
            brand: ''
            });
            fetchProducts();
        })
        .catch(error => {
            console.error('Error adding product:', error);
            alert('Error adding product');
        });
    };

    if (loading) {
        return <p>Loading products...</p>;
    }

    return (
        <div>
        <h2>Product List</h2>

        <form class= "form" onSubmit={handleSubmit}>
            <input
            type="text"
            name="product_id"
            placeholder="Product ID"
            value={newProduct.product_id}
            onChange={handleInputChange}
            required
            />
            <input
            type="text"
            name="product_name"
            placeholder="Product Name"
            value={newProduct.product_name}
            onChange={handleInputChange}
            required
            />
            <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            required
            />
            <input
            type="date"
            name="expiration_date"
            placeholder="Expiration Date"
            value={newProduct.expiration_date}
            onChange={handleInputChange}
            required
            />
            <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={newProduct.brand}
            onChange={handleInputChange}
            required
            />
            <button type="submit">Add Product</button>
        </form>

        <table class="table1" border="1" style={{ marginTop: '20px' }}>
            <thead>
            <tr>
                <th class="th">Product ID</th>
                <th class="th">Product Name</th>
                <th class="th">Price</th>
                <th class="th">Expiration Date</th>
                <th class="th">Brand</th>
            </tr>
            </thead>
            <tbody>
            {products.map(product => (
                <tr key={product.product_id}>
                <td class="td">{product.product_id}</td>
                <td class="td">{product.product_name}</td>
                <td class="td">{product.price}</td>
                <td class="td">{product.expiration_date}</td>
                <td class="td">{product.brand}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default ProductList;
