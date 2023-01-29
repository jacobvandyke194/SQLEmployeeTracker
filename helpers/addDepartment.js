const addDepartment = async () => {
    try {
      const askUser = [
        {
          type: 'input',
          name: 'updatedDepartment',
          message: 'What department would you like to add?',
        },
      ];
      const { updatedDepartment } = await inquirer.prompt(askUser);
      const query = `INSERT INTO department (name) VALUES ("${updatedDepartment}")`;
      const data = await db.promise().query(query);
    } catch (err) {
      console.log(err);
    }
  }

  module.exports = addDepartment;