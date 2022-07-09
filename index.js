let dotenv = require('dotenv');
dotenv.config({path:'./config.env'})

let express = require('express');
let app = express();
app.use(express.json());


let userRouter = require('./routers/UserRouter')
let authRouter = require('./routers/AuthRouter')
let studentRouter = require('./routers/StudentRouter.js')
app.use('/',userRouter);
app.use('/',authRouter)
app.use('/',studentRouter);

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/authentication' , {useNewUrlParser:true,useUnifiedTopology:true})
.then
(
    (res)=>
    {
        console.log("connection established");
    }
)
.catch
(
    (err)=>
    {
        console.log("connection failed");
    }
)






app.listen(3000);