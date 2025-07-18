const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const isBlacklisted = await  blacklistTokenModel.findOne({ token: token });

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

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
   
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
    console.log('Is Blacklisted:', isBlacklisted);
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

   try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id); // ✅ Fix: Use '_id' instead of 'id'
        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized captain' });
        }
        req.captain = captain; // Attach captain to request object
        return next();
    } catch (error) {
        console.log('Error in authCaptain:', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
