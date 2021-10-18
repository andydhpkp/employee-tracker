INSERT INTO departments (name)
VALUES
('Sales'),
('Accounting'),
('Marketing'),
('Management');

INSERT INTO roles (title, salary, department_id)
VALUES
('Head Sales', 65000, 1),
('Accountant', 35000, 2),
('Marketer', 44000, 3),
('Salesperson', 48000, 1),
('Manager', 69000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Trevor', 'Diemoz', 5, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Andrew', 'Durham', 2, 1),
('Taylor', 'Dunn', 2, 1),
('Tate', 'Benson', 1, 1),
('Brock', 'Bettilyon', 1, 1);
