const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Will add user validation later
const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true, minlength: 3},
  name: String,
  passwordHash: {type: String, required: true}
});

userSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
    delete returnedObj.passwordHash;
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);