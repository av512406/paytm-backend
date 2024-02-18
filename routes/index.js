const express = require('express')
const user = require('./routes/user');
const account = require('./account');

const router = express.Router() ; 

// router.get('/' , (req, res) => {
//     console.log(' i got the request');
//     res.json({
//         msg:"hello "
//     })
// })

// router.use('/user' , user);

// router.use("/account" , account)

module.exports = router



