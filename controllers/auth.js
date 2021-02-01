const mysql = require('mysql');
const bcrypt=require('bcryptjs');
const cookieParser=require('cookie-parser');
const jwt = require('jsonwebtoken');  
const connection  = require('../Config/conn');

//login

exports.login=async(req,res)=>{
    try{

        const {email,password}=req.body;

        if(!email || !password)
        {
            return res.status(400).send('please provide username & password')
        }
        
        
        connection.conn.query('SELECT * FROM customers WHERE email = ? ',[req.body.email],async(error,results)=>{
            console.log(results);
            //if(!results || await bcrypt.compare())
            //comparing the database password and the logging password
            if(!results || !(await bcrypt.compare(password,results[0].password)))
             {

                    res.status(401).send('email or password is encorrect')
            }
            else{
                const id=results[0].customer_id;//id of the user

                const token=jwt.sign({id},process.env.JWT_SECRET,{
                    expiresIn:process.env.JWT_EXPIRES_IN
                });

                console.log("the token is :"+ token);
                const cookieOption={
                    expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES*24*60*60*1000),
                    httponly:true
                }

                res.cookie(jwt,token,cookieOption);
                results.status(200);
            }

        })

    }catch(error){
        console.log(error);

    }
}





//registering a customer to the database
exports.register=(req,res)=>{

    

    const {firstname,lastname,email,password,passwordconfirm}=req.body;
    myquery='SELECT email FROM customers WHERE email = ?';
    connection.conn.query(myquery,[email],async(error,rows,fields)=>{

        if(error)
        {
            console.log(error);
        }
        if(rows.length>0)
        {
           return res.send('email already registered');
        }
        else if (password!==passwordconfirm)
        {
           return res.send('password entered does not match');
        }
        let hashedPassword= await bcrypt.hash(password,8);
        console.log(hashedPassword);

        myquery2='INSERT INTO customers SET ?'
        connection.conn.query(myquery2,{firstname:firstname,lastname:lastname,email:email,password: hashedPassword},(error,rows,fields)=>
        {
            if(error)
            {
                console.log(error);
            }
            else{
                console.log(rows);
                res.send('user registered in the database');
            }
        })

    })
}