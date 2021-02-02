const express = require('express');        
const app = express();   
const cookieParser=require('cookie-parser');
const jwt = require('jsonwebtoken');              
const bodyParser = require('body-parser');
const mysql = require("mysql");
const connection  = require('./Config/conn');
const cors = require('cors');
const verify = require ('./verifyToken');//change routes 
const register=require('./routers/register');
const Login=require('./routers/login');
const Admin=require('./routers/admin');
const Customers=require('./routers/client');



//app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
//import a register file

const port = process.env.PORT || 3000;        

//const router = express.Router();
var router=express.Router();

//defining routes

//localhost:3000/auth/register
app.use('/auth', register);//registering a customer


//for admin localhost:3000/login/admin
//for customer localhost:3000/login/customer
app.use('/login',Login);//admin & customer login
//
//
app.use('/admin',Admin);
app.use('/customer',Customers);


//app.use('/api', router);
app.listen(port, () => console.log('Go to localhost:' + port));