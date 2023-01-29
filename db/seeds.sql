USE sqltracker_db;

INSERT INTO department (name)
VALUES ("Human Resources"),
       ("Web Development"),
       ("Accounting"),
       ("Management");

INSERT INTO role (title, salary, departmentID)
VALUES ("HR Manager", 340000, 1),
       ("HR Grunt", 90000, 1),
       ("Lead Web Dev", 178000, 2),
       ("Junior Developer", 112000, 2),
       ("Accounts Manager", 179000, 3),
       ("Accountant", 123000, 3),
       ("General Manager", 240000, 4),
       ("Developer Manager", 193000, 4);

INSERT INTO employee (firstName, lastName, roleID, managerID)
VALUES ("Doug", "Alan", 8, NULL),
       ("Stephanie", "Claire", 2, 1),
       ("Jacob", "Van Dyke", 1, 1),
       ("Abigail", "Ritchie", 3, 2),
       ("Matthew", "Leon", 7, NULL),
       ("Arabella", "Faith", 4, 1),
       ("Lisa", "Green", 1, 2),
       ("Paula", "Tutt", 5, NULL),
       ("Joe", "Callaway", 6, 4),
       ("David", "Knott", 7, NULL);

