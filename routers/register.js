const express = require('express');        
const app = express();   
const jwt = require('jsonwebtoken');              
const bodyParser = require('body-parser');
const mysql = require("mysql");
const connection  = require('./conn_db');
const cors = require('cors'); 

const verify = require ('./verifyToken');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;        

const router = express.Router();  

//Register a customer
router.post('/', (req, res, next) => {
    //Have to check whether the email exits before inserting
const username = req.body.emailAddress;
	connection.conn.query('SELECT * FROM customers WHERE email = ?',
         [username], (error, results, fields) => {
    if(results.length === 0){
    const queryStatement = 'INSERT INTO customers (firstname, lastname, email, password) VALUES (?,?,?,?)';
                //this has to be encrypeted
    let password = req.body.password; 
    const customerValues = [req.body.firstName, req.body.lastName, req.body.emailAddress, password];

    let username = req.body.emailAddress;

    connection.conn.query(queryStatement, customerValues, (err, results, fields) => {
       if(!err){

        const  the_token = jwt.sign({username: username}, ""+process.env.TOKEN_SECRET);
        token = {"token": the_token}
        res.json({token, results});
       }else{
        res.send(401);
       }
    })}else{
	res.send(401);
}})
});

app.use('/api', router);

app.listen(port, () => console.log('Go to localhost:' + port + "/api"));











