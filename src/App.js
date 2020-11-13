import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//Import front end jsx components
import ListEmployee from './front-end/list-employee.component';
import EditEmployee from './front-end/edit-employee.component';
import CreateEmployee from './front-end/create-employee.component';
import DeleteEmployee from './front-end/delete-employee.component';


const App = () => {
  return (
    <Router>
      <div className="container" >
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
          <Link to="/list" className="navbar-brand">Employee Registration MERN App</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/list" className="nav-link">List Employee</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create Employee</Link>
              </li>
            </ul>
          </div>
        </nav>
        <br />
        <Route path="/list" exact component={ListEmployee} />
        <Route path="/update/:id" component={EditEmployee} />
        <Route path="/create" component={CreateEmployee} />
        <Route path="/remove/:id" component={DeleteEmployee} />
      </div>
    </Router>
  );
}





export default App;
