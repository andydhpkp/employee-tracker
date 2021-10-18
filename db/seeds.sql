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
('Andrew', 'Durham', 2, 5),
('Taylor', 'Dunn', 2, 5),
('Tate', 'Benson', 1, 5),
('Brock', 'Bettilyon', 1, 5),
('Trevor', 'Diemoz', 5, NULL)