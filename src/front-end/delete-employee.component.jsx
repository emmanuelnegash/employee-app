import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import {AiOutlineDelete,AiOutlineUser,AiFillCalendar,AiOutlineTeam} from 'react-icons/ai';
import { GiMoneyStack} from "react-icons/gi";
import axios from 'axios';

const DeleteEmployee = (props) => {
    const [data, setData] = useState({
        employee_name: "",
        employee_bdate: Date,
        employee_gender: "",
        employee_salary: Number 
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `http://localhost:4000/all_employee/${props.match.params.id}`
            );
            setData({ ...result.data });
        };
        fetchData();
    }, [props.match.params.id]);

    const onDeleteEmployeeData = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:4000/all_employee/remove/${props.match.params.id}`, data).then(res => console.log(res.data));
        props.history.push('/list');
    }

    return (
        <div style={{ marginTop: 10 }}>
            <h3>Delete Employee</h3>
            <Form onSubmit={onDeleteEmployeeData}>
                <FormGroup row>
                    <Col md={3}>
                        <Label><AiOutlineUser /> Employee Name </Label>
                        <Input
                            readOnly
                            type="text"
                            name="employee_name"
                            className="form-control"
                            value={data.employee_name} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md={3}>
                        <Label><AiFillCalendar /> Date of Birth </Label>
                        <Input
                            readOnly
                            type="date"
                            name="employee_bdate"
                            className="form-control"
                            value={data.employee_bdate} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md={3}>
                        <Label><AiOutlineTeam /> Employee Gender </Label>
                        <Input
                            readOnly
                            type="text"
                            name="employee_gender"
                            className="form-control"
                            value={data.employee_gender}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md={3}>
                        <Label><GiMoneyStack /> Employee Salary </Label>
                        <Input
                            readOnly
                            type="number"
                            name="employee_salary"
                            className="form-control"
                            value={data.employee_salary} />
                    </Col>
                </FormGroup>
                <Button color="danger"><AiOutlineDelete /> Delete Data</Button>
            </Form>
        </div>
    );
}

export default DeleteEmployee;