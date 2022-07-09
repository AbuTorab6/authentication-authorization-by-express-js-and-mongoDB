let express = require('express');
let app = express();
let router = express.Router();

let studentModel = require('../models/StudentModel.js');

let jwt = require('jsonwebtoken');



var readStudent = async (req,res)=>
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
            jwt.verify(tokenFromPostman,process.env.SECRETKEY);

            try{
                var result = await studentModel.find();
                if(result[0]==undefined)
                {
                    res.status(404);
                    res.send(ob.message);
                }
                else
                {
                    res.send(result)
                }
               
            }
            catch(ob)
            {
                res.status(404);
                res.send(ob.message);
                
            }
        }
        catch(ob)
        {
            res.status(400);
            res.send(ob.message)
        }
    }
}




var deleteStudent = async (req,res)=>
{
    var myid = req.params.p1;

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


            if(decryptedToken.role=='admin')
            {
                try
                {
                    var result = await studentModel.deleteOne({_id:myid})

                    if(result.deletedCount==0)
                    {
                        res.status(404);
                        res.send("something is wrong data can not delete");
                    }
                    else
                    {
                        res.send("data deleted");
                    }
                
                }
                catch(ob)
                {
                    res.status(404);
                    res.send(ob.message);
                    
                }
            }
            else{
                res.send("make sure that u are a admin");
            }

            
        }
        catch(ob)
        {
            res.status(400);
            res.send(ob.message)
        }
    }
    
}




router.route('/student')
    .get(readStudent)

router.route('/student/:p1')
    .delete(deleteStudent)



module.exports = router;