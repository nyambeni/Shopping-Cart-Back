const express=require('express');
const jwt = require('jsonwebtoken');  
const verify = require ('../verifyToken');
const connection  = require('../Config/conn');
authController=require('../controllers/auth');
const router=express.Router();


//admin login
router.post('/admin/auth', (request, response) => {
    const username = request.body.emailAddress;
    const password = request.body.password;

    if(username && password){
        connection.conn.query('SELECT * FROM admin WHERE email = ? AND password = ?',
         [username, password], (error, results, fields) => {
            
            if(results.length > 0){
                //generate a token fr authication
                const  the_token = jwt.sign({username: username}, ""+process.env.TOKEN_SECRET);
                token = {"token": the_token}
                response.json({token, results});

            }else{
                response.send(401);
            }
            response.end();
         });
    }else{
        response.send('Please enter username and password!!');
        response.end();
    }
});


//customer login
router.post('/auth', (request, response) => {
    const username = request.body.emailAddress;
    const password = request.body.password;

    if(username && password){
        connection.conn.query('SELECT * FROM customers WHERE email = ? AND password = ?',
         [username, password], (error, results, fields) => {
            
            if(results.length > 0){
                //generate a token fr authication
                const  the_token = jwt.sign({username: username}, ""+process.env.TOKEN_SECRET);
                token = {"token": the_token}
                response.json({token, results});

            }else{
                response.send(401);
            }
            response.end();
         });
    }else{
        response.send('Please enter username and password!!');
        response.end();
    }
});


//not fully functioning
router.post('/adminlogin',authController.login);


module.exports=router;