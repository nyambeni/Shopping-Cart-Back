//this is the midddleware for the other routes that can only be accessed if the user is logged in.
//like the checkout route, import this middleware using :: const verify = require ('./verifyToken');

const { JsonWebTokenError } = require("jsonwebtoken");

const jwt = require('jsonwebtoken');;

module.exports = function(req,res,next)
{
    const token = req.header('auth-token');

    if(!token) return res.send('There is no token');

    try{
        const verified = jwt.verify(token, ""+process.env.TOKEN_SECRET);
        req = verified;
        next();
    }
    catch(err)
    {
        res.send('Invalid Token');
    }
}
  
