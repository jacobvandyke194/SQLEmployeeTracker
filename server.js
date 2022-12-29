const express = require('express');
const app = express();
const mysql = require('mysql2');
const inquirer = require('inquirer');

const initQuestions = require('./inquire.js');

const PORT = process.env.PORT || 3001;


// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// db connection!
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Jacob123!',
      database: '' //add db here
    },
    console.log(`Connected to the database.`)
  );

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
initQuestions();