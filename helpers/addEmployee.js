const addEmployee = async () => {
    try {
      const askUser3 = [
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
      const { given_name, surname, addedRole, managerTie } = await inquirer.prompt(askUser3);
      const query = `INSERT INTO employee (firstName, lastName, roleID, managerID) VALUES ("${given_name}", "${surname}", ${addedRole.id || null}, ${managerTie.id || null} )`;
      const data = await db.promise().query(query);
    } catch (err) {
      console.log(err);
    }
  }

  module.exports = addEmployee;