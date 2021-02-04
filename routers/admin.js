const express=require('express');
const connection  = require('../Config/conn');

const router=express.Router();

//getting all users
router.get('/customers',(req,res)=>{

    connection.conn.query('SELECT * FROM customers', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })

});


//GET user by id
router.get('/customer/:id',(req,res)=>{
    csearch='SELECT * FROM customers WHERE customer_id = ?';
    connection.conn.query(csearch,[req.params.id],(error,rows,fields)=>
    {
        if(!error)
        {
            res.send(rows);
        }else{
            console.log(error);
        }
    })
})

//show cart
router.get('/cart',(req,res)=>{
    cart='SELECT * FROM cart';
    connection.conn.query(cart,(error,rows,fields)=>
    {
        if(!error)
        {
            res.send(rows);
        }else{
            console.log(error);
        }
    })
})




//not yet working ....still working on it
router.get('/viewpayment',(req,res)=>{
    payments='SELECT * FROM payment_tbl';
    connection.conn.query(payments,(error,rows,fields)=>{
        if(!error)
        {
            res.send(rows);
        }
        else{
            console.log(error);
    }
    })
})






module.exports=router;