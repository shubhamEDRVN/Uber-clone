const express = require('express');
const { validate } = require('../models/user.model');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');

router.post('/register', [
    body('fullname.firstname').notEmpty().withMessage('First name is required'),
    body('fullname.lastname').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long')
], userController.registerUser);


module.exports = router;
