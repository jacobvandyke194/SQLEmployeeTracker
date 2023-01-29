const showEmployees = async () => {
    try {
      const query = `SELECT employee.firstName, employee.lastName, role.title AS title, role.salary AS salary, department.name AS department, CONCAT (manager.firstName, " ", manager.lastName) AS manager FROM employee LEFT JOIN role ON employee.roleID = role.id LEFT JOIN department ON role.departmentID = department.id LEFT JOIN employee manager ON employee.managerID = manager.id`;
      const [data] = await db.promise().query(query);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  module.exports = showEmployees;