const inquirer = require('inquirer')
const mysql = require('mysql2')
const db = require('../db/connection')
const cTable = require('console.table')

db.connect((err) => {
    if(err) throw err;
    tracker()
})

const tracker = async() => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'tasks',
                message: 'What do you want to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Exit',
                ],
            },
        ])
        .then((response) => {
            console.log(response);
            switch(response.tasks) {
                case "View all departments":
                    viewAllDepartments();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break;
                case "View all employees":
                    viewAllEmployees();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Update an employee role":
                    updateRole();
                    break;
                default:
                    console.log('Press ctrl C, Goodbye')
            }
        })
}

const viewAllDepartments = () => {
    let sql = `SELECT * FROM departments`;

    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        tracker()
    })
}

const viewAllEmployees = () => {
    let sql = `SELECT * FROM employees RIGHT JOIN roles ON employees.role_id = roles.id RIGHT JOIN departments ON roles.department_id = departments.id`;

    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        tracker()
    })
}

const viewAllRoles = () => {
    let sql = `SELECT * FROM roles RIGHT JOIN departments ON roles.department_id = departments.id`;

    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res)
        tracker()
    })
}

const addDepartment = () => {
    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "What is the name of the department?"
            }
        ])
        .then((response) => {
            let sql = `INSERT INTO departments (name) VALUES (?)`;
            const params = [response.name];
            db.query(sql, params, (err, res) => {
                if (err) throw err;
                tracker()
            })
        })
}

const addRole = () => {
    let sql = `SELECT * FROM departments`;
    let departmentNames
    db.query(sql, (err, res) => {
        if (err) throw err
        departmentNames = res.map((x) => x.name)

    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title of the role?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of the role?"
            },
            {
                name: "department",
                type: "list",
                choices: departmentNames
            }
        ])
        .then((response) => {
            let id;
            for (let i = 0; i < res.length; i++) {
                if (response.department === res[i].name){
                    id = res[i].id
                }
            }
            let sql = `INSERT INTO roles(title, salary, department_id) VALUES ('${response.title}', ${response.salary}, ${id})`;

            db.query(sql, (err, res) => {
                if (err) throw err;
                tracker()
            })
        })
    })
}

const addEmployee = () => {
    let sql = `SELECT * FROM roles`
    let titles
    db.query(sql, (err, res) => {
        if(err) throw err
        titles = res.map((x) => x.title)

        inquirer
            .prompt([
                {
                    name: "first_name",
                    type: "input",
                    message: "What is the first name of the employee?"
                },
                {
                    name: "last_name",
                    type: "input",
                    message: "What is the last name of the employee?"
                },
                {
                    name: "role",
                    type: "list",
                    choices: titles
                },
                {
                    name: "manager_id",
                    type: "input",
                    message: "What is the id of the manager?"
                }
            ])
            .then((response) => {
                let id 
                for (let i = 0; i < res.length; i++) {
                    if (response.department === res[i].name){
                        id = res[i].id
                    }
                }
                let sql = `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ('${response.first_name}', '${response.last_name}', ${id}, ${response.manager_id})`
                db.query(sql, (err, res) => {
                    if (err) throw err
                    tracker()
                })
            })
    })
}

const updateRole = () => {
    let sqlRole = `SELECT * FROM roles`;
    let sqlEmployee = `SELECT * FROM employees`;
    let titles
    let names
    db.query(sqlRole, (err, res) => {
        if (err) throw err
        titles = res.map((x) => x.title);
        db.query(sqlEmployee, (err, resName) => {
            if(err) throw err
            names = resName.map((x) => `${x.first_name} ${x.last_name}`)

            inquirer
                .prompt([
                    {
                        name: "nameUpdate",
                        type: "list",
                        choices: names
                    },
                    {
                        name: "titles",
                        type: "list",
                        choices: titles
                    }
                ])
                .then((response) => {
                    let roleId
                    let employeeId
                    for (let i = 0; i < res.length; i++) {
                        if (response.titles === res[i].title) {
                            roleId = res[i].id
                        }
                    }
                    for (let i = 0; i < resName.length; i++) {
                        if (response.nameUpdate === `${resName[i].first_name} ${resName[i].last_name}`) {
                            employeeId = resName[i].id
                        }
                    }
                    const sql = `UPDATE employees SET role_id = ${roleId} WHERE id = ${employeeId}`;
                    db.query(sql, (err, res) => {
                        if (err) throw err
                        tracker()
                    })
                })
        })
    })
}

