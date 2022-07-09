let express = require('express');
let app = express();
let router = express.Router();

let userModel = require('../models/UserModel.js');

app.use(express.json());

let bcrypt = require('bcryptjs');

let jwt = require('jsonwebtoken');


var insertUser = async (req,res)=>
{
    var dataFromPostman = req.body;

    var result = await userModel.find({email:dataFromPostman.email})

    if(result[0]!=undefined)
    {
        res.status(400);
        res.send("the user is already exist");
    }
    else
    {
        var salt = await bcrypt.genSalt(10);
        var encryptData = await bcrypt.hash(dataFromPostman.password, salt);
        var userObj = new userModel(
            {
                name:dataFromPostman.name,
                email:dataFromPostman.email,
                password:encryptData,
                role:dataFromPostman.role
            }
        );
        try{
            await userObj.save();

            var result2 = await userModel.find({email:dataFromPostman.email})
            var token = jwt.sign({_id:result2[0]._id , email:result2[0].email,role:result2[0].role} , process.env.SECRETKEY);
            res.send(token);
        }
        catch(ob)
        {
            res.status(404);
            res.send(ob.message);
        }
    }
    
}


var userDetail = (req,res)=>
{
    let tokenFromPostman = req.headers.authorization;
    if(tokenFromPostman==undefined)
    {
        res.status(404);
        res.send("no token provided");
    }
    else
    {
        tokenFromPostman = tokenFromPostman.split(" ")[1].trim();
        try
        {
            var decryptedToken = jwt.verify(tokenFromPostman,process.env.SECRETKEY);
            res.send(decryptedToken);
          
        }
        catch(ob)
        {
            res.status(400);
            res.send(ob.message)
        }
    }
}



router.route('/user')
    .post(insertUser);


router.route('/user/me')
    .get(userDetail);


    module.exports = router;