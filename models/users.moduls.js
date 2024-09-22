const mongoose = require('mongoose')
const validator =  require('validator')


const usersSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    age:{
        type: Number,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true,
        validate: [validator.isEmail,  'lease enter a valid email'] 
    },
    password:{
      type: String,
      require: true,
    },
    token:{
      type: String,
    }
})

module.exports = mongoose.model('Users',  usersSchema)
 

