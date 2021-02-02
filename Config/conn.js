const mysql = require('mysql');
const dotenv=require('dotenv')
const JWT_SECRET = require('jsonwebtoken');  

dotenv.config({path :'./env'})

const conn = mysql.createConnection({

    host: 'localhost',
    password:'',
   // password: 'newpassword', //when i switch to linux i use empty passwordS
    user:'root', 
    database: 'zatchshoping_db',
    JWT_SECRET:'mysuperscretpassword'
});

conn.connect((err) => {
    if(err) throw err;
    console.log('database is connected successfully');
});

module.exports = { conn };