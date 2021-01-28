var mysql = require('mysql');
var conn = mysql.createConnection
({

    host: 'localhost',
    password: '', 
    user:'root', 
    database: 'zatchshoping_db'
});

conn.connect(function (err)
{
    if(err) throw err;
   console.log('database is connected successfully');

});

function search(req,res,next)
{
    //the users search term
    var searchKeyword = req.query.search;
    if(searchKeyword != '')
    {
        let query =  `SELECT * FROM items_table WHERE item_name=` + searchKeyword;

    }
    database.query(query, (err, result) => 
    {
        if(err)
        {
            req.searchResult = "";
            next();
        }
        req.searchResult = result;
        req.searchKeyword = searchKeyword;
        next();
    });
}

