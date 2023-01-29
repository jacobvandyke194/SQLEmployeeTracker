const userAnswers = require('./server.js');
const inquirer = require('inquirer');
const showDepartments = require('./helpers/showDepartments.js');

const initQuestions = async () => {
    try {
        const questions = [
            {
                type: "list",
                name: "answer",
                message: "Select from the options below:",
                choices: [
                    "Show Employees",
                    "Show Departments",
                    "Show Roles",
                    "Add New Employee",
                    "Update Employee Role",
                    "Add New Role",
                    "Add New Department",
                    "Quit"
                ],
            },
        ];
        const userAnswer = await inquirer.prompt(questions);
        switch (userAnswer.answer) {
            case "Show Employees":
                const employeeList = await userAnswers.showEmployees();
                console.table(employeeList);
                break;
                case "Show Roles":
                    const allRoleList = await userAnswers.viewAllRoles();
                    console.table(allRoleList);
                    break;
                case "Show Departments":
                    const departmentsList = await userAnswers.showDepartments();
                    console.table(departmentsList);
                    break;
            case "Add New Employee":
                await userAnswers.addEmployee();
                break;
            case "Update Employee Role":
                await userAnswers.updateEmployeeRole();
                break;
            case "Add New Role":
                await userAnswers.addRole();
                break;
            case "Add New Department":
                await userAnswers.addDepartment();
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