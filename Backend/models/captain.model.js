const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength:[3, 'First name must be at least 3 characters long'],
    },
    lastname: {
      type: String,
    
      minlength:[3, 'Last name must be at least 3 characters long'],
    }},
    email: {
      type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
        maxlength: [100, 'Email must be at most 100 characters long'],
        match: [/.+@.+\..+/, 'Please enter a valid email address']
      }, 
      password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
       
      },
      socketId: {
        type: String,
        
      },

      status:{
        type: String,
        enum: ['active', 'inactive', 'banned'],
        default: 'inactive'
      },
      vechile:{
        color: {
          type: String,
          required: true,
        },
        plate: {
          type: String,
          required: true,
          unique: true,
          minlength: [3, 'Plate must be at least 3 characters long'],
          maxlength: [15, 'Plate must be at most 15 characters long'],
        },
        capacity: {
          type: Number,
          required: true,
          min: [1, 'Capacity must be at least 1'],
          max: [100, 'Capacity must not exceed 100']
        },
        vechileType: {
          type: String,
          required: true,
          enum: ['car', 'bike', 'auto', 'van'],
        },
        location:{
            lat:{
                type: Number,
            },
            long:{
                type: Number,
            }
        }
      }

  })

  captainSchema.methods.generateAuthToken =  function() {
    const token = jwt.sign({ _id: this._id },process.env.JWT_SECRET,{ expiresIn: '24h' }
    );
    return token;
  };
  captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  }
  captainSchema.methods.hashPassword = async function() {
    this.password = await bcrypt.hash(this.password, 10);
  }
const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;