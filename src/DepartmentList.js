import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function DepartmentList() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newDepartment, setNewDepartment] = useState({
        dept_name: '',
        dept_type: '',
        dept_mgr_ssn: ''
    });

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = () => {
        setLoading(true);
        axios.get('http://localhost:3001/departments')
        .then(response => {
            setDepartments(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching department data:', error);
            setLoading(false);
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDepartment({
            ...newDepartment,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/departments', newDepartment)
        .then(response => {
            alert('Department added successfully');
            setNewDepartment({
                dept_name: '',
                dept_type: '',
                dept_mgr_ssn: ''
            });
            fetchDepartments();
        })
        .catch(error => {
            console.error('Error adding department:', error);
            alert('Error adding department');
        });
    };

    if (loading) {
        return <p>Loading departments...</p>;
    }

    return (
        <div>
        <h2>Department List</h2>

        <form class="form" onSubmit={handleSubmit}>
            <input
            type="text"
            name="dept_name"
            placeholder="Department Name"
            value={newDepartment.dept_name}
            onChange={handleInputChange}
            required
            />
            <input
            type="text"
            name="dept_type"
            placeholder="Department Type"
            value={newDepartment.dept_type}
            onChange={handleInputChange}
            required
            />
            <input
            type="text"
            name="dept_mgr_ssn"
            placeholder="Manager SSN"
            value={newDepartment.dept_mgr_ssn}
            onChange={handleInputChange}
            required
            />
            <button type="submit">Add Department</button>
        </form>

        <table class="table1" border="1" style={{ marginTop: '20px' }}>
            <thead>
            <tr>
                <th class="th">Department ID</th>
                <th class="th">Department Name</th>
                <th class="th">Department Type</th>
                <th class="th">Manager SSN</th>
            </tr>
            </thead>
            <tbody>
            {departments.map(department => (
                <tr key={department.dept_id}>
                    <td class="td">{department.dept_id}</td>
                    <td class="td">{department.dept_name}</td>
                    <td class="td">{department.dept_type}</td>
                    <td class="td">{department.dept_mgr_ssn}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default DepartmentList;
