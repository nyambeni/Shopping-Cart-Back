
//For Login

var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const { json } = require('body-parser');
const { createConnection } = require('net');


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

var app = express()

    app.use(session({
        secret: 'secrete',
        resave:true,
        saveUninitialized: true
    }));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('../', function(request,response)
{
    response.sendFile(path.join(__dirname +'../login.component.html'));
});

app.post('/auth', function(request,response)
{
    var username = request.body.emailAddress;
    var password = request.body.password;

    if(username && password){
    
        conn.query('SELECT * FROM customers WHERE email = ? AND password = ?', [username, password], function(error, results, fields)
        {
            console.log(results.length);
            if(results.length >0)
            {
                request.session.loggedin = true;
                request.session.username = username;
                //response.redirect('../landing');
                response.send('sername and/or password');

            }
            else
            {
                response.send('Incorrect Username and/or password');
            }
            response.end();
    });
    
    
 }
else
    {
        response.send('Please enter username and password!!');
        response.end();

    }
    
});

app.get('../landing', function(request,response)
{
    if(request.session.loggedin)
    {
        response.send('Welcome back,' + request.session.username+ '!!');

    }
    else{
        response.send('Please login to view this page!!');
    }
    response.end();
});
app.listen(3200);



/**var express = require('express');
var router = express.Router();
var connection  = require('../zatchshopping_backend_code/conn_db');
//display login page
router.get('/login', function(req, res, next){    
// render to the login pfrontend page, the name of the frontend login page name
res.render('foldername/filename', {
title: 'Login',
email: '',
password: ''     
})
})
//display login page
router.get('/loginfilename here', function(req, res, next){    
// render to the login pfrontend page, the name of the frontend login page name
res.render('folder/loginfilename', {
title: 'Login',
email: '',
password: ''    
})
})
//authenticate user
router.post('/authentication', function(req, res, next) {
var email = req.body.email;
var password = req.body.password;
connection.query('SELECT * FROM customers WHERE email = ? AND password = ?', [email, password], function(err, rows, fields) {
if(err) throw err
// if user not found
if (rows.length <= 0) {
req.flash('error', 'Please correct enter email and Password!')
res.redirect('/loginpage name')
}
else { // if user found
// render to  
req.session.loggedin = true;
req.session.firstname = firstname;
res.redirect('/home'); //the home page name
}            
})
})
//display login page
router.get('/register', function(req, res, next){    
// render to fronend register page name, folder/register file name
res.render('foldeeername/register', {
title: 'Registration Page',
name: '',
email: '',
password: ''    
})
})
// user registration
router.post('/post-register', function(req, res, next){    
req.assert('firstname', 'Firstname is required').notEmpty() //Validate name 
req.assert('lastname', 'Lastname is required').notEmpty() //Validate surname 
req.assert('password', 'Password is required').notEmpty()   //Validate password
req.assert('email', 'A valid email is required').isEmail()  //Validate email
var errors = req.validationErrors()
if( !errors ) {   //No errors were found. Validation! passed
var user = {
    //remove spaces in the data fields
firstname: req.sanitize('firstame').escape().trim(),
lastname: req.sanitize('lastname').escape().trim(),
email: req.sanitize('email').escape().trim(),
password: req.sanitize('password').escape().trim()
}
//insert data to the database table
connection.query('INSERT INTO customers SET ?', user, function(err, result) {
//if(err) throw err
if (err) {
req.flash('error', err)
// render to foldername/subfolder(if there)/filname.extension, the name page fr registaring the user
res.render('foldername/register', {
title: 'Registration Page',
firstname: '',
lastname: '',
password: '',
email: ''                   
})
} else {                
req.flash('success', 'You have successfully signup!');
res.redirect('/login');
}
})
}
else {   //Display errors to user
var error_msg = ''
errors.forEach(function(error) {
error_msg += error.msg + '<br>'
})                
req.flash('error', error_msg)        
// render to foldername/subfolder(if there)/filname.extension, the name page fr registaring the user

res.render('foldername/register', { 
title: 'Registration Page',
firstname: req.body.firstname,
lastname: req.body.lastname,
email: req.body.email,
password: ''
})
}
})
//display home page,
router.get('/home', function(req, res, next) {
if (req.session.loggedin) {
// render to foldername/subfolder(if there)/filname.extension, the homepage name

res.render('foldername/home', {
title:"Zatchshopping", //title fr the home page
firstname: req.session.firstname,     
});
} 
else {
req.flash('success', 'Please login first!');
res.redirect('/login'); //when they have signup successfully, they must log in first, direct them to the login page
}
});
// Logout user
router.get('/logout', function (req, res) {
req.session.destroy();
req.flash('success', 'Login Again Here');
res.redirect('/login');
});
module.exports = router;



//code for handling requests, handling database and returning response
var express =  require('express');
var app=express();
var mysql=require('mysql');
//application configuration
app.set('icepshopingcart-master', __dirname+'/icepshopingcart-master');
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

//connect to mysql database

var connection = mysql.createConnection({
    host:'localhost',
    password:'',
    user:'root',
    database:'zatchshoping_db'
});
connection.connect();

//handling routers
app.get('/search', function(req,res){
    //the users search term
    var searchKeyword = req.query.search;
    if(searchKeyword != '')
    {
        connection.query('SELECT * FROM items_table WHERE item_name LIKE "%' + searchKeyword +'%"'),
        function(err, rows,fields)
        {
            if(err) throw err;
            var data[];
            for(x=0; x<rows.length;x++)
            {
                data.push(rows[x].item_name);
            }
            res.end(JSON.stringify(data));
        });
    }
});





**/
