const express=require('express');
const connection  = require('../Config/conn');

const router=express.Router();


//customer profile
router.get('/profile/:id',(req,res)=>{

    cprofile='SELECT * FROM customers WHERE customer_id= ?';
    connection.conn.query(cprofile,[req.params.id],(error,rows,fields)=>{
        if(!error)
        {
            res.send(rows);

        }
        else{
            console.log(error);
        }
    })

})

//cart table


//payment
router.put('/cpayment/:id',(req,res)=>{

    cpay='UPDATE payment_tbl SET totalPrice WHERE id_customer= ?';

    connection.conn.query(cpay,[req.params.id],(error,rows)=>{
        if(!error)
        {
            res.send(rows);
        }else
        {
            console.log(error);
        }
    })

})





module.exports=router;