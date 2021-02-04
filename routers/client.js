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

//insert to payment

router.post('/payment',(req,res)=>{
    
    adminId = connection.conn.query('SELECT admin_id FROM admin', function(res,err,result){
        if(err)
        {throw err;
          console.log("[mysql error]",err)
        }
        else{
            if(result.length > 0)
            {
                res.send(result);
           }
        }

      });
    customerId = connection.conn.query('SELECT customer_id FROM customers', function(res,err, result){if(err) throw err;
    res.send(result);
    });
    cartId= connection.conn.query('SELECT cart_id FROM cart');
    // totalPrice = req.body.totalPrice;
    // cust_name = req.body.name;
    // email =req.body.email;

    cpay='INSERT INTO payment_tbl(totalPrice,id_customer,id_admin,id_cart,customer_name,customer_email) VALUES (?,?,?,?,?,?)';
    customerValue =[req.body.totalPrice,customerId,adminId,cartId,req.body.name,req.body.email];
    connection.conn.query(cpay,[customerValue],(error,rows)=>{
        if(!error)
        {
            res.send(rows);
        }else

        {
            console.log(error);
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