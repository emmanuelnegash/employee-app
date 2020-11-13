import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'reactstrap';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const ListBar = (props) => {
    return (
        <tr>
            <td>{props.employee.employee_name}</td>
            <td>{props.employee.employee_bdate}</td>
            <td>{props.employee.employee_gender}</td>
            <td>{props.employee.employee_salary}</td>
            <td>
                <Link to={"/update/" + props.employee._id}><AiOutlineEdit /></Link>
                <Link to={"/remove/"+props.employee._id}><AiOutlineDelete /></Link>
            </td>
        </tr>
    );
}

const Listemployee = () => {
    const [listData, setListData] = useState({ lists: [] });

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:4000/all_employee/'
            );
            setListData({ lists: result.data });
        };
        fetchData();
    }, []);

    return (
        <div>
            <h3>List employee</h3>
            <Table striped style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Employee Birth Day</th>
                        <th>Employee Gender</th>
                        <th>Employee Salary</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listData.lists.map((current, i) => (
                        <ListBar employee={current} key={i} />
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Listemployee;