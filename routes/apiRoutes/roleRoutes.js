const express = require('express')
const router = express.Router()
const db = require('../../db/connection')
const inputCheck = require('../../utils/inputCheck')

//get all roles
router.get('/roles', (req, res) => {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

//get single role
router.get('/role/:id', (req, res) => {
    const sql = `SELECT * FROM roles WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

//create new role
router.post('/role', ({ body }, res) => {
    const errors = inputCheck(body, 'title', 'salary', 'department_id');
    if(errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
    const params = [body.title, body.salary, body.department_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        })
    })
})

//delete role
router.delete('/role/:id', (req, res) => {
    const sql = `DELETE FROM roles WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'role not found'
            })
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            })
        }
    })
})

//update role
router.put('/role/:id', (req, res) => {
    const errors = inputCheck(req.body, 'name');
    if(errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `UPDATE roles SET title = ? WHERE id = ?`
    const params = [req.body.name, req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'role not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            })
        }
    })
})

module.exports = router;