const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);// Validate the request body
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log("Registering user with data:", req.body);

    const { fullname, email, password } = req.body;
   
const salt = await bcrypt.genSalt(10);
const hashPassword = await bcrypt.hash(password, salt);




const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
    });

    const token = user.generateAuthToken(); // Generate JWT token

    res.status(201).json({token, user });

};

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req); // Validate the request body
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    
    const user = await userModel.findOne({email}).select('+password'); // Find user by email and include password field
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = user.generateAuthToken(); // Generate JWT token
    res.cookie('token', token); // Set token in cookie
    res.status(200).json({ token, user });
}


module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user); // Return the authenticated user's profile
}
module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token'); // Clear the token cookie
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Get the token from cookies

    
        await blacklistTokenModel.create({ token });
    

    res.status(200).json({ message: 'Logged out successfully' });
  } 