const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const isBlacklisted = await userModel.findOne({ token: token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

   try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       const user = await userModel.findById(decoded.id); // ✅ Fix: Use 'id' instead of '_id'
 // use _id instead of id
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized user' });
        }
        req.user = user; // Attach user to request object
      return next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
