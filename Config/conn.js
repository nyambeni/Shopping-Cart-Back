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
