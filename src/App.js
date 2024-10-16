
import React from 'react';
import CustomerList from './CustomerList';
import ProductList from './ProductList';
import DepartmentList from './DepartmentList';
import SalesList from './SalesList';
import EmployeeList from './EmployeeList';
import './styles.css';


function App() {
    return (
        <body className="App">
            <div class="division">
            <div class="logo"><img src='./public/newlogo.png' />
            </div>
                <div>
                <h1>Supermarket Management System</h1>
    
                </div>
        
        <CustomerList />
        <ProductList />
        <DepartmentList />
        <EmployeeList />
        <SalesList />
        </div>
        </body>

    );
}

export default App;
