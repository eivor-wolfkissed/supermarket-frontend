import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newEmployee, setNewEmployee] = useState({
        fname: '',
        lname: '',
        dept_id: '',
        dob: '',
        salary: ''
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        setLoading(true);
        axios.get('http://localhost:3001/employees')
        .then(response => {
            setEmployees(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching employee data:', error);
            setLoading(false);
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({
            ...newEmployee,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/employees', newEmployee)
        .then(response => {
            alert('Employee added successfully');
            setNewEmployee({
                fname: '',
                lname: '',
                dept_id: '',
                dob: '',
                salary: ''
            });
            fetchEmployees();
        })
        .catch(error => {
            console.error('Error adding employee:', error);
            alert('Error adding employee');
        });
    };

    if (loading) {
        return <p>Loading employees...</p>;
    }

    return (
        <div>
        <h2>Employee List</h2>

        <form class="form" onSubmit={handleSubmit}>
            <input
            type="text"
            name="fname"
            placeholder="First Name"
            value={newEmployee.fname}
            onChange={handleInputChange}
            required
            />
            <input
            type="text"
            name="lname"
            placeholder="Last Name"
            value={newEmployee.lname}
            onChange={handleInputChange}
            required
            />
            <input
            type="number"
            name="dept_id"
            placeholder="Department ID"
            value={newEmployee.dept_id}
            onChange={handleInputChange}
            required
            />
            <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={newEmployee.dob}
            onChange={handleInputChange}
            required
            />
            <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={newEmployee.salary}
            onChange={handleInputChange}
            required
            />
            <button type="submit">Add Employee</button>
        </form>

        <table class="table1" border="1" style={{ marginTop: '20px' }}>
            <thead>
            <tr>
                <th class="th">Employee ID</th>
                <th class="th">First Name</th>
                <th class="th">Last Name</th>
                <th class="th">Department ID</th>
                <th class="th">Date of Birth</th>
                <th class="th">Salary</th>
            </tr>
            </thead>
            <tbody>
            {employees.map(employee => (
                <tr key={employee.employee_id}>
                    <td class="td">{employee.employee_id}</td>
                    <td class="td">{employee.fname}</td>
                    <td class="td">{employee.lname}</td>
                    <td class="td">{employee.dept_id}</td>
                    <td class="td">{employee.dob}</td>
                    <td class="td">{employee.salary}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default EmployeeList;
