const express = require("express")
// const router = require('./routes/index')
const user = require('./routes/user')
const account = require('./routes/account')
const cors = require('cors')
const bodyParser = require("body-parser")

const app = express()

app.use(cors())
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
//   });
app.use(bodyParser.json())
// app.use(express.json())


app.use('/api/v1/user' , user);
app.use('/api/v1/account' , account);


app.get('/api/v1/' , (req ,res) => {
    return res.json({
        message:"System is up"
    })
    // res.send('System is up!' ) ;
});



app.listen(3000, () => {
    console.log('listening on port 3000');
})


