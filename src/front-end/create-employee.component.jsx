import React, { useState} from 'react';
import { Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import { AiOutlineUserAdd, AiOutlineUser,AiOutlineForward,AiFillCalendar,AiOutlineTeam } from 'react-icons/ai';
import { GiMoneyStack} from "react-icons/gi";
import axios from 'axios';

const CreateEmployee = (props) => {
    const [data, setData] = useState({
        employee_name: "",
        employee_bdate: Date,
        employee_gender: "",
        employee_salary: Number
    });

    const onChangeEmployeeData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitEmployeeData = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/all_employee/add', data).then(res => console.log(res.data));
        setData({
            employee_name: "",
            employee_bdate: "",
            employee_gender: "",
            employee_salary: ""
        });
    }

    return (
      <div style={{ marginBlock:17 }}>
        <h3>
          <AiOutlineUserAdd /> Create Employee
        </h3>
        <Form onSubmit={onSubmitEmployeeData}>
          <FormGroup row>
            <Col md={4}>
              <Label>
                <AiOutlineUser /> Employee Name{" "}
              </Label>
              <Input
                type="text"
                name="employee_name"
                className="form-control"
                value={data.employee_name}
                onChange={onChangeEmployeeData}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md={4}>
              <Label>
                <AiFillCalendar /> Date of Birth{" "}
              </Label>
              <Input
                type="date"
                name="employee_bdate"
                className="form-control"
                value={data.employee_bdate}
                onChange={onChangeEmployeeData}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md={4}>
              <Label>
                <AiOutlineTeam /> Employee Gender
              </Label>
              <div>
                <input 
                type="radio" 
                value="Male" 
                name="employee_gender" 
                onChange={onChangeEmployeeData}
                /> Male
                <br></br>
                <input 
                type="radio" 
                value="Female" 
                name="employee_gender" 
                onChange={onChangeEmployeeData}
                /> Female
              </div>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md={3}>
              <Label>
                <GiMoneyStack/> Employee Salary{" "}
              </Label>
              <Input
                type="number"
                name="employee_salary"
                className="form-control"
                value={data.employee_salary}
                onChange={onChangeEmployeeData}
              />
            </Col>
          </FormGroup>
          <Button color="primary">
            <AiOutlineForward /> Submit
          </Button>
        </Form>
      </div>
    );
}

export default CreateEmployee;