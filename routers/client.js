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

//customer add to cart (table)
router.post('/addcart',(req,res)=>{
    const {quantity,item_name}=req.body;

    cart='INSERT INTO cart SET ?';
    connection.conn.query(cart,{quantity:quantity,item_name: item_name},(error,rows,fields)=>
      {
          if(error)
          {
              console.log(error);
          }
          else{
              console.log(rows);
              res.send('items added to the database');
          }
      })
})


//payment  NOT FUNCTIONALLY STILL WORKING ON IT
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