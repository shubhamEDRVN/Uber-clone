const express = require('express');
const router = express.Router();
const {body}= require('express-validator');
const captainController = require('../controllers/captain.controller');


router.post('/register',[
    body('fullname.firstname').notEmpty().withMessage('First name is required')
    .isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('email').notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be a valid email address'),
    body('password').notEmpty().withMessage('Password is required')
    .isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('vechile.color').notEmpty().withMessage('Vechile color is required'),
    body('vechile.plate').notEmpty().withMessage('Vechile plate is required')
    .isLength({min:3}).withMessage('Vechile plate must be at least 3 characters long'),
    body('vechile.capacity').notEmpty().withMessage('Vechile capacity is required')
    .isInt({min:1,max:100}).withMessage('Vechile capacity must be between 1 and 100'),
    body('vechile.vechileType').notEmpty().withMessage('Vechile type is required')
    .isIn(['car', 'bike', 'truck']).withMessage('Vechile type must be one of car, bike, or truck')],
    captainController.registerCaptain
    )


 module.exports = router;