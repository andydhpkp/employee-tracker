INSERT INTO departments (name)
VALUES
('Sales'),
('Accounting'),
('Marketing'),
('Management');

INSERT INTO roles (title, salary, department_id)
VALUES
('CPA', 65000, 1),
('Another Role', 35000, 2),
('The final role', 44000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Andrew', 'Durham', 2, NULL),
('Taylor', 'Dunn', 2, NULL),
('Tate', 'Benson', 1, 1);