const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:jP0IDH6vCgzhL17C@cluster0.seecv95.mongodb.net/paytm-backend')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30,
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50,
    },
})

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId ,
        ref:"User" ,
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model('User' , userSchema)
const Account = mongoose.model('Account' , AccountSchema)

module.exports = {
    User , 
    Account
}