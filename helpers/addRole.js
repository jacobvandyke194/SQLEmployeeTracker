const addRole = async () => {
    try {
      const askUser2 = [
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
      const { newRole, newSalary, assignDepartment } = await inquirer.prompt(askUser2);
      const query = `INSERT INTO role (title, salary, departmentID) VALUES ("${newRole}", ${newSalary}, ${assignDepartment})`;
      const data = await db.promise().query(query);
    } catch (err) {
      console.log(err);
    }
  }

  module.exports = addRole;