import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Col, Button } from 'reactstrap';
import { AiOutlineUserAdd, AiOutlineUser,AiOutlineForward,AiFillCalendar,AiOutlineTeam } from 'react-icons/ai';
import { GiMoneyStack} from "react-icons/gi";
import axios from 'axios';

const EditEmloyee = (props) => {
    const [data, setData] = useState({
        employee_name: "",
        employee_bdate: Date,
        employee_gender:"",
        employee_salary: Number
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `http://localhost:4000/all_emloyee/${props.match.params.id}`
            );
            setData({ ...result.data });
        };
        fetchData();
    }, [props.match.params.id]);

    const onChangeEmployeeData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        console.log(data);
    }

    const onSubmitEmployeeData = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:4000/all_emloyee/update/${props.match.params.id}`, data).then(res => console.log(res.data));
        props.history.push('/');
    }

    return (
      <div style={{ marginTop: 10 }}>
        <h3>
          <AiOutlineUserAdd /> Edit Employee
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
            <Col md={3}>
              <Label>
                <AiOutlineTeam /> Employee Gender
              </Label>
              <div>
                <input
                  type="radio"
                  value="Male"
                  name="employee_gender"
                  onChange={onChangeEmployeeData}
                />{" "}
                Male
                <br></br>
                <input
                  type="radio"
                  value="Female"
                  name="employee_gender"
                  onChange={onChangeEmployeeData}
                />{" "}
                Female
              </div>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md={3}>
              <Label>
                <GiMoneyStack /> Employee Salary{" "}
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
            <AiOutlineForward /> Update Data
          </Button>
        </Form>
      </div>
    );
}

export default EditEmloyee;