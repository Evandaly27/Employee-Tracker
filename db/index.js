const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }       

    // function to view all employees
    findAllEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

    // function to view all employees by department
    findAllEmployeesByDepartment(departmentId) {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id WHERE role.department_id = ?;", departmentId
        );
    }

    // function to find all roles
    findAllRoles() {
        return this.connection.promise().query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }

    // function to create a new employee
    createEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employee SET ?", employee);
    }

    // function to remove an employee
    removeEmployee(employeeId) {
        return this.connection.promise().query(
            "DELETE FROM employee WHERE id = ?", employeeId
        )
    }

    // function to update an employee's role
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]
        );
    }
}

    module.exports = new DB(connection);