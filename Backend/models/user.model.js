const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
        type: String,
        required: true,
        minlength: [3, 'Full name must be at least 3 characters long'],
    },
    lastname: {
        type: String,
        
        minlength: [3, 'Last name must be at least 3 characters long'],
    },
}, 
email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Email must be at least 5 characters long'],
},
password: {
    type: String,
    required: true,
    select : false,
    
},
  socketId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}
userSchema.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
}
userSchema.static.hashPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;