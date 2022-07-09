let express = require('express');
let app = express();
let router = express.Router();

let userModel = require('../models/UserModel.js');

app.use(express.json());


let bcrypt = require('bcryptjs');

let jwt = require('jsonwebtoken');

var authUser = async (req,res) =>
{
    var dataFromPostman = req.body;
    var result = await userModel.find({email:dataFromPostman.email})

    if(result[0]==undefined)
    {
        res.status(404);
        res.send("incorrect password or email 1");
    }
    else
    {
        var validUser = await bcrypt.compare(dataFromPostman.password , result[0].password);

        if(validUser==true)
        {
            var token = jwt.sign({_id:result[0]._id , email:result[0].email, role:result[0].role} , process.env.SECRETKEY);
            res.status(200);
            res.send(token);
        }
        else
        {
            res.status(404);
            res.send("incorrect password or email 2");
        }
    }

}





router.route('/auth')
    .post(authUser);



module.exports = router;