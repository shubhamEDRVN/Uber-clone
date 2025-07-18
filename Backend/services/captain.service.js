const bcrypt = require('bcryptjs');
const captainModel = require('../models/captain.model');

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const createCaptain = async ({
    firstname,
    lastname,
    email,
    password,
    plate,
    capacity,
    vechileType,
    color
}) => {
    if (!firstname || !email || !password || !plate || !capacity || !vechileType || !color) {
        throw new Error('All fields are required');
    }

    const captain = new captainModel({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vechile: {
            plate,
            capacity,
            vechileType,
            color
        }
    });

    await captain.save(); // Add this to persist in DB
    return captain;
};

module.exports = {
    hashPassword,
    createCaptain
};
