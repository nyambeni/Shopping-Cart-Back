
const mysql = require('mysql');
const JWT_SECRET = require('jsonwebtoken');  
const conn = mysql.createConnection({

    host: 'localhost',
    password: 'newpassword', 
    user:'root', 
    database: 'zatchshoping_db',
    JWT_SECRET:'mysuperscretpassword',
    JWT_EXPIRE_IN:'90d',
    JWT_COOKIE_EXPIRES:'90'
});

conn.connect((err) => {
    if(err) throw err;
    console.log('database is connected successfully');
});

module.exports = { conn };
const mysql = require('mysql');
const conn = mysql.createConnection({

    host: 'localhost',
    password: '', 
    user:'root', 
    database: 'zatchshoping_db'
});

conn.connect((err) => {
    if(err) throw err;
    console.log('database is connected successfully');
});

module.exports = { conn };
