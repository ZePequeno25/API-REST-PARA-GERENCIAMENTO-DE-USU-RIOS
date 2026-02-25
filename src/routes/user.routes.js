const express = require('express');
const router = express.Router();
const { createUser, getAll, getById, update, deleteUser } = require('../controllers/user.controller');

router.post('/users', createUser);
router.get('/users', getAll);
router.get('/users/:id', getById);
router.put('/users/:id', update);
router.delete('/users/:id', deleteUser);

module.exports = router;