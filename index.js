const { prompt } = require('inquirer');
const logo = require('asciiart-logo');
const db = require('./db');

// function to display logo and start app
function init() {
    const logoText = logo({ name: "Employee Manager" }).render();
    console.log(logoText);
    loadMainPrompts();
}

// function to display main prompts and handle user input
function loadMainPrompts() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                { name: "View All Employees", value: "VIEW_EMPLOYEES" },
                { name: "Add Employee", value: "ADD_EMPLOYEE" },
                { name: "Update Employee Role", value: "UPDATE_EMPLOYEE_ROLE" },
                { name: "View All Roles", value: "VIEW_ROLES" },
                { name: "View All Departments", value: "VIEW_DEPARTMENTS" },
                { name: "Quit", value: "QUIT" }
            ]
        }
    ]).then(handleChoice)
        .catch(handleError);
}

// function to handle user input
function handleChoice({ choice }) {
    switch (choice) {
        case "VIEW_EMPLOYEES":
            return viewEmployees();
        case "ADD_EMPLOYEE":
            return addEmployee();
        case "UPDATE_EMPLOYEE_ROLE":
            return updateEmployeeRole();
        case "VIEW_ROLES":
            return viewRoles();
        case "VIEW_DEPARTMENTS":
            return viewDepartments();
        case "QUIT":
            return quit();
        default:
            console.log("invalid choice");
            loadMainPrompts();
    }
}

// function to view all employees
function viewEmployees() {
    db.findAllEmployees()
        .then(([rows]) => {
            console.log("\n");
            console.table(rows);
        })
        .then(loadMainPrompts)
        .catch(handleError);
}

// function to add an employee
function addEmployee() {
    prompt([
        { name: "first_name", message: "First name?" },
        { name: "last_name", message: "Last name?" }
    ]).then(({ first_name, last_name }) => {
        return db.findAllRoles()
            .then(([rows]) => {
                const roleChoices = rows.map(role => ({
                    name: role.title,
                    value: role.id
                }));
                return prompt({
                    type: "list",
                    name: "roleId",
                    message: "What is their role?",
                    choices: roleChoices
                });
            })
            .then(() => {
                console.log("Employee ${first_name} ${last_name} added!");
                loadMainPrompts();
            })
            .catch(handleError);
    });
}

// function to update an employee's role
function updateEmployeeRole() {
    db.findAllEmployees()
        .then(([rows]) => {
            const employeeChoices = rows.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }));
            return prompt({
                type: "list",
                name: "employeeId",
                message: "Which employee's role do you want to update?",
                choices: employeeChoices
            });
        })
        .then(({ employeeId }) => {
            return db.findAllRoles()
                .then(([rows]) => {
                    const roleChoices = rows.map(role => ({
                        name: role.title,
                        value: role.id
                    }));
                    return prompt({
                        type: "list",
                        name: "roleId",
                        message: "What is their new role?",
                        choices: roleChoices
                    });
                })
        })
        .then(({ roleId }) => {
            return db.updateEmployeeRole(employeeId, roleId);
        })
        .then(() => {
            console.log("Employee's role updated!");
            loadMainPrompts();
        })
        .catch(handleError);
}

// function to view all roles
function viewRoles() {
    db.findAllRoles()
        .then(([rows]) => {
            console.log("\n");
            console.table(rows);
        })
        .then(loadMainPrompts)
        .catch(handleError);
}

// function to view all departments
function viewDepartments() {
    db.findAllDepartments()
        .then(([rows]) => {
            console.log("\n");
            console.table(rows);
        })
        .then(loadMainPrompts)
        .catch(handleError);
}

// function to handle errors
function handleError(err) {
    console.log(err);
}

// function to quit app
function quit() {
    console.log("Goodbye!");
    process.exit();
}

// call init function to start app
init();