const inquirer = require('inquirer');

const initQuestions = () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "requestedAction",
                message: "How can I help? :)",
                choices: ["View all employees", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"]
            }
        ])
        .then((answers) => {
            console.log(answers);
        })
}
 

module.exports = initQuestions;