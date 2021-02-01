//connect to database

/**var mysql = require('mysql');
var conn = mysql.createConnection({
host:'localhost',
password:' ',
user:'root',
database:'zatchshoping_db'

});
conn.connect(function (err)
{
    if(err) throw err;
    console.log('database is connected successfully');
});
module.exports = conn;**/

var mysql = require('mysql');
var conn = mysql.createConnection({

    host: 'localhost',
    password: '', 
    user:'root', 
    database: 'zatchshoping_db'
});

conn.connect(function (err)
{if(err) throw err;
console.log('database is connected successfully');



});