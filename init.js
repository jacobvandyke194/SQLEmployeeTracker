const selections = require('./server.js');
const inquirer = require('inquirer');
const showDepartments = require('./helpers/showDepartments.js');

// console.log(selections);

// command line prompts
const initQuestions = async () => {
    try {
        const questions = [
            {
                type: "list",
                name: "answer",
                message: "Select from the options below:",
                choices: [
                    "Show Employees",
                    "Add New Employee",
                    "Update Employee Role",
                    "Show Roles",
                    "Add New Role",
                    "Show Departments",
                    "Add New Department",
                    "Quit"
                ],
            },
        ];
        // call to function depending on what the user selects
        const userAnswer = await inquirer.prompt(questions);
        console.log(userAnswer);
        switch (userAnswer.answer) {
            case "Show Employees":
                const employeeList = await selections.showEmployees();
                console.table(employeeList);
                break;
                case "Show Roles":
                    const allRoleList = await selections.viewAllRoles();
                    console.table(allRoleList);
                    break;
                case "Show  Departments":
                    showDepartments();
                    // const departmentsList = await selections.showDepartments();
                    // console.table(departmentsList);
                    break;
            case "Add New Employee":
                await selections.addEmployee();
                break;
            case "Update Employee Role":
                await selections.updateEmployeeRole();
                break;
            case "Add New Role":
                await selections.addRole();
                break;
            case "Add New Department":
                await selections.addDepartment();
                break;
            case "Quit":
                process.exit();
            default:
                break;
        }
        initQuestions();
    } catch (err) {
        console.log(err);
    }
};
initQuestions();