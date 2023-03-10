const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const express = require('express');
const initQuestions = require('./init');
const showDepartments = require('./helpers/showDepartments.js');
const addDepartments = require('./helpers/addDepartment.js');
const addRole = require('./helpers/addRole.js');
const addEmployee = require('./helpers/addEmployee.js');
const viewAllRoles = require('./helpers/viewAllRoles.js');



const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Jacob123!',
    database: 'sqltracker_db'
  },
  console.log(`Hello, you are currently connected to the sqltracker_db database.`)
);
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`    Thank you for using the sqltracker :)`);
});
const userAnswers = {
  updateEmployeeRole: async () => {
    try {
      console.log("currently unavailable")
    }
    catch (err) {
      console.log(err);
    }
  },
  showDepartments: async () => {
    try {
      const query = "SELECT * FROM department";
      const [data] = await db.promise().query(query);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  viewAllRoles: async () => {
    try {
      const query = "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.departmentID = department.id";
      const [data] = await db.promise().query(query);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
  showEmployees: async () => {
    try {
      const query = `SELECT employee.firstName, employee.lastName, role.title AS title, role.salary AS salary, department.name AS department, CONCAT (manager.firstName, " ", manager.lastName) AS manager FROM employee LEFT JOIN role ON employee.roleID = role.id LEFT JOIN department ON role.departmentID = department.id LEFT JOIN employee manager ON employee.managerID = manager.id`;
      const [data] = await db.promise().query(query);
      return data;
    } catch (err) {
      console.log(err);
    }
  },
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
            const departments = await userAnswers.showDepartments();
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
  addEmployee: async () => {
    try {
      const questionThree = [
        {
          type: 'input',
          name: 'firstName2',
          message: 'first name:',
        },
        {
          type: 'input',
          name: 'lastName2',
          message: 'last name:',
        },
        {
          type: 'list',
          name: 'addRole',
          message: 'What is the employee\'s role?',
          choices: async () => {
            const rolePick = [{ name: 'None', value: null }];
            const roleChoices = await userAnswers.viewAllRoles();
            roleChoices.forEach(({ id, title }) => rolePick.push({ name: title, value: { id, title } }));
            return rolePick;
          },
        },
        {
          type: 'list',
          name: 'manager',
          message: "employee manager:",
          choices: async () => {
            const managerPick = [{ name: 'None', value: null }];
            const currentEmployees = await userAnswers.showEmployees();
            currentEmployees.forEach(({ id, firstName, lastName }) => managerPick.push({ name: `${firstName} ${lastName}`, value: { id } }));
            return managerPick;
          },
        },
      ];
      const { firstName2, lastName2, addRole, manager } = await inquirer.prompt(questionThree);
      const query = `INSERT INTO employee (firstName, lastName, roleID, managerID) VALUES ("${firstName2}", "${lastName2}", ${addRole.id || null}, ${manager.id || null} )`;
      const data = await db.promise().query(query);
    } catch (err) {
      console.log(err);
    }
  }
};


module.exports = userAnswers;