const mongoose = require('mongoose');
var validator = require('validator');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');



const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 2,
        maxlength: 50,
      },
      lastname: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 100,
      },
      email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate: {
          validator: validator.isEmail,
          message: 'Please provide valid email',
        },
      },
      password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
      },
      isAdmin:{
        type: Boolean,
        default:false
      }
},
{ timestamps: true })


UserSchema.pre('save', async function(){
this.password = await CryptoJS.AES.encrypt(this.password, process.env.SECRET_PHRASE).toString()
})

UserSchema.methods.createJWT =  function () {
  return jwt.sign(
    {
      userId: this._id,
      firstname: this.firstname,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  )
}




module.exports = mongoose.model('User', UserSchema);


