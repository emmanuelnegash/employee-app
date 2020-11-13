const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

const crudRoutes = express.Router();
let Crud = require('../model-db/crud.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://dbuser:rkwYTH3C36pzVnT@cluster0.pelky.mongodb.net/test',
    { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

crudRoutes.route('/').get((req, res) => {
    // eslint-disable-next-line array-callback-return
    Crud.find((err, results) => {
        if (err) console.log(err);
        else res.json(results);
    });
});

crudRoutes.route('/:id').get((req, res) => {
    let id = req.params.id;
    Crud.findById(id, (err, result) => {
        if (err) console.log(err);
        else res.json(result);
    });
});

crudRoutes.route('/add').post((req, res) => {
    let list = new Crud(req.body);
    list.save().then(list => {
        res.status(200).json({'list': 'Employee added successfully'});
    }).catch(err => {
        res.status(400).send('Adding failed');
    });
});

crudRoutes.route('/update/:id').post((req, res) => {
    Crud.findById(req.params.id, (err, data) => {
        if (!data) res.status(404).send("Employee is not found");
        else {
            data.employee_name = req.body.employee_name;
            data.employee_bdate = req.body.employee_bdate;
            data.employee_gender = req.body.employee_gender;
            data.employee_salary = req.body.employee_salary;

            data.save().then(data => {
                res.json('Data Employee is updated!');
            }).catch(err => {
                res.status(400).send("Update isn't possible");
            });
        }
    });
});

crudRoutes.route('/remove/:id').delete((req, res) => {
    Crud.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send(`Employee ${data.employee_name} was deleted`);
    })
})

app.use('/all_employee', crudRoutes);

app.listen(PORT, () => {
    console.log("Server is running on PORT: " + PORT);
})