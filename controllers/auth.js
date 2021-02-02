const mysql = require('mysql');
const bcrypt=require('bcryptjs');
const cookieParser=require('cookie-parser');
const jwt = require('jsonwebtoken');  
const connection  = require('../Config/conn');




exports.register2=(req,res)=>{

  const {username,password,passwordconfirm}=req.body;
  myquery='SELECT email FROM customers WHERE username = ?';
  connection.conn.query(myquery,[username],async(error,rows,fields)=>{

      if(error)
      {
          console.log(error);
      }
      if(rows.length>0)
      {
         return res.send('username already registered');
      }
      else if (password!==passwordconfirm)
      {
         return res.send('password entered does not match');
      }
      let hashedPassword= await bcrypt.hash(password,8);
      console.log(hashedPassword);

      myquery2='INSERT INTO admin SET ?'
      connection.conn.query(myquery2,{username:username,password: hashedPassword},(error,rows,fields)=>
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


//this is for the admin login

module.exports.AdminLogin=(req, res, next) => {
  connection.conn.query('SELECT * FROM admin WHERE username = ?',[req.body.username],(err, result) => {
      // user does not exists
      if (err) {
        throw err;
        //return res.status(400).send({
        //  msg: err
       // });
      }
      if (!result.length) {
        return res.status(401).send('Username or password is incorrect!'
      );
      }
      // check password
      bcrypt.compare( req.body.password, result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            //throw bErr;
            return res.status(401).send('Username or password is incorrect!'
            );
          }
          if (bResult) {
            const token = jwt.sign({
                username: result[0].username,
                userId: result[0].id
              },
              'SECRETKEY', {
                expiresIn: '7d'
              }
            );
           
            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]//user details appears including the password
            });
          }
          return res.status(401).send('Username or password is incorrect!'
          );
        }
      );
    }
  );
};



  
//customer login
module.exports.Authent=(req, res, next) => {
  connection.conn.query('SELECT * FROM customers WHERE email = ?',[req.body.email],(err, result) => {
      // user does not exists
      if (err) {
        throw err;
        //return res.status(400).send({
        //  msg: err
       // });
      }
      if (!result.length) {
        return res.status(401).send('Username or password is incorrect!'
      );
      }
      // check password
      bcrypt.compare( req.body.password, result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            //throw bErr;
            return res.status(401).send('Username or password is incorrect!'
            );
          }
          if (bResult) {
            const token = jwt.sign({
                username: result[0].username,
                userId: result[0].id
              },
              'SECRETKEY', {
                expiresIn: '7d'
              }
            );
           
          return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]//user details appears including the password
            });


          }
          return res.status(401).send('Username or password is incorrect!'
          );
        }
      );
    }
  );
};