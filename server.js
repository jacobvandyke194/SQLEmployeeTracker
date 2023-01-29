const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const express = require('express');
const initQuestions = require('./init');
// const showDepartments = require('./helpers/showDepartments.js');
// const addDepartments = require('./helpers/addDepartments.js');
// const Departments = require('./helpers/showDepartments.js');
// const showDepartments = require('./helpers/showDepartments.js');
// const showDepartments = require('./helpers/showDepartments.js');
// const showDepartments = require('./helpers/showDepartments.js');

// set up our server listener
const PORT = process.env.PORT || 3001;
const app = express();
// //middleware for express.js
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Jacob123!',
    database: 'employees_db'
  },
  console.log(`Hello, you are currently connected to the employees_db database.`)
);

// Default response for any other request (Not Found)
// not using express.
app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


 
const selections = {
  // function to show all departments
  showDepartments: 
  async () => {
    try {
    showDepartments
  //     const query = "SELECT * FROM department";
  //     const [data] = await db.promise().query(query);
  //     return data;
    } catch (err) {
      console.log(err);
    }
  },
  // function to Show roles
  viewAllRoles: async () => {
    try {
      const query = "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.departmentID = department.id";
      const [data] = await db.promise().query(query);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  // function to see all employees
  showEmployees: async () => {
    try {
      const query = `SELECT employee.firstName, employee.lastName, role.title AS title, role.salary AS salary, department.name AS department, CONCAT (manager.firstName, " ", manager.lastName) AS manager FROM employee LEFT JOIN role ON employee.roleID = role.id LEFT JOIN department ON role.departmentID = department.id LEFT JOIN employee manager ON employee.managerID = manager.id`;
      const [data] = await db.promise().query(query);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
// function to add a new department
  addDepartment: async () => {
    try {
      const questionOne = [
        {
          type: 'input',
          name: 'updatedDepartment',
          message: 'What department would you like to add?',
        },
      ];
      const { updatedDepartment } = await inquirer.prompt(questionOne);
      const query = `INSERT INTO department (name) VALUES ("${updatedDepartment}")`;
      const data = await db.promise().query(query);
    } catch (err) {
      console.log(err);
    }
  },
  // function to add a new role to database
  addRole: async () => {
    try {
      const questionTwo = [
        {
          type: 'input',
          name: 'newRole',
          message: 'What new roll are you adding?'
        },
        {
          type: 'input',
          name: 'newSalary',
          message: `What salary does this role earn?`,
        },
        {
          type: 'list',
          name: 'assignDepartment',
          message: `Please select which department this new role falls into`,
          choices: async () => {
            const departments = await selections.showDepartments();
            const userPicks = [{ name: 'None', value: null }];
            departments.forEach(({ id, name }) => userPicks.push({ name, value: id }));
            return userPicks;
          },
        },
      ];
      const { newRole, newSalary, assignDepartment } = await inquirer.prompt(questionTwo);
      const query = `INSERT INTO role (title, salary, departmentID) VALUES ("${newRole}", ${newSalary}, ${assignDepartment})`;
      const data = await db.promise().query(query);
    } catch (err) {
      console.log(err);
    }
  },
  // function to add a new employee to database
  addEmployee: async () => {
    try {
      const questionThree = [
        {
          type: 'input',
          name: 'given_name',
          message: 'What is the first name?',
        },
        {
          type: 'input',
          name: 'surname',
          message: 'What is the last name?',
        },
        {
          type: 'list',
          name: 'addedRole',
          message: 'What is this employee\'s role?',
          choices: async () => {
            const rolePick = [{ name: 'None', value: null }];
            const roleChoices = await selections.viewAllRoles();
            roleChoices.forEach(({ id, title }) => rolePick.push({ name: title, value: { id, title }}));
            return rolePick;
          },
        },
        {
          type: 'list',
          name: 'managerTie',
          message: "Who is this employee's manager?",
          choices: async () => {
            const managerPick = [{ name: 'None', value: null }];
            const currentEmployees = await selections.showEmployees();
            currentEmployees.forEach(({ id, firstName, lastName }) => managerPick.push({ name: `${firstName} ${lastName}`, value: { id }}));
            return managerPick;
          },
        },
      ];
      const { given_name, surname, addedRole, managerTie } = await inquirer.prompt(questionThree);
      const query = `INSERT INTO employee (firstName, lastName, roleID, managerID) VALUES ("${given_name}", "${surname}", ${addedRole.id || null}, ${managerTie.id || null} )`;
      const data = await db.promise().query(query);
    } catch (err) {
      console.log(err);
    }
  }
};


module.exports = selections;