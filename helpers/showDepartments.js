const showDepartments = async () => {
    try {
      const query = "SELECT * FROM department";
      const [data] = await db.promise().query(query);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

module.exports = showDepartments;