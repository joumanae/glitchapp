const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  
  firstName: { 
    type : String, 
    Required : true
},
   lastName: {
      type : String, 
      Required : true
        }, 
    email: {
      type: String, 
      Required: true 
    },
    password: {
      type: String, 
      Required: true
    }
  
}, 
{timestamps: true })

const User = mongoose.model('user', userSchema) 
module.exports = User  
