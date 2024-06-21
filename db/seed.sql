USE employees;

-- Insert departments
INSERT INTO department (name) VALUES
('Engineering'),
('Finance'),
('Legal'),
('Sales');

-- Insert roles

INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 100000, 1),
('Lead Software Engineer', 120000, 1),
('Accountant', 80000, 2),
('Lawyer', 120000, 3),
('Salesperson', 80000, 4),
('Sales Lead', 120000, 4);

-- Insert employees

INSERT INTO employee (first_name, last_name, role_id) VALUES
('John', 'Doe', 1),
('Jane', 'Doe', 2),
('Alice', 'Johnson', 3),
('Bob', 'Smith', 4),
('Charlie', 'Brown', 5),
('Diana', 'Jones', 6);