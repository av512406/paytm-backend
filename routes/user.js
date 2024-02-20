const express = require('express')
const {User, Account} = require('../db');
const user = express.Router(); 
const zod = require('zod') ; 
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config');
const { authMiddleware } = require('../middleware/middleware');

const userbody = zod.object({   
    username: zod.string().email() ,
    password:zod.string().min(6, "Password is less than 6 characters") ,
    firstName:zod.string() ,
    lastName:zod.string() 
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

const updateBody = zod.object({
    password: zod.string().optional() ,
    firstName: zod.string().optional() ,
    lastName: zod.string().optional() ,
})

user.post("/signin" , async(req,res) => {
    const {success} = signinBody.safeParse(req.body)
    
    if(!success) {
        return res.status(411).json({
            message:"Invalid Inputs"
        })
    }
    const user = await User.findOne({
        username:req.body.username,
        password: req.body.password
    })
    if(!user){
        return res.status(411).json({
            message:"Invalid Inputs"
        })
    }

    const token = jwt.sign({userId: user._id} , JWT_SECRET)
    res.json({
        msg:"sign in successful" , 
        token : token
    })
})

user.post("/signup" , async (req,res) => {
    const {success} = userbody.safeParse(req.body)
    console.log(success);
    if(!success) {
        return res.status(411).json({
            message:"Incorrect Inputs"
        })
    }
    const existingUser = await User.findOne({
        username:req.body.username
    })
    // const existingUser = await User.findOne({
    //     username:req.body.username,
    //     password:req.body.password,
    //     firstName:req.body.firstName,
    //     lastName:req.body.lastName
    // })
    console.log('existing user ' , existingUser);
    if(existingUser != null) {
        return res.status(411).json({
            message:"Username already taken"
        })
    }
    const userCreate = await User.create({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    })
    console.log('user creattion ' , userCreate)
    const userId = userCreate._id ;
    // adding random balance to user
    await Account.create({
        userId , 
        balance: Math.floor((Math.floor(Math.random() * 1000 * 1000) / 100) + 1)
        // balance: 1 + Math.random() * 1000
    })

    const token = jwt.sign({
        userId 
    }, JWT_SECRET)

    res.json({
        token: token
    })
})

user.put("/update" , authMiddleware , async(req,res) => {
    const {success} = updateBody.safeParse(req.body) ;
    if(!success) {
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    
    // const user = await User.findOneAndReplace({_id: req.userId} ,{
    //     password:req.body.password,
    //     firstName:req.body.firstName,
    //     lastName:req.body.lastName,
    // })
    await User.updateOne(req.body , {
        _id: req.userId
    })
    
    res.json({
        message: "Updated successfully"
    })
})


user.get('/bulk' , async(req,res) => {
    const filter = req.query.filter || ""
    const users  = await User.find()
    // const users  = await User.find({ $or:[{
    //     firstName:`/${filter}/`
    // },{
    //     lastName:`/${req.query.filter}/`
    // }]
    // })

    res.json({
        user: users.map( user => ({
            username: user.username , 
            firstName: user.firstName ,
            lastName: user.lastName ,
            _id: user._id ,
        }))
    })
})

module.exports = user ; 
