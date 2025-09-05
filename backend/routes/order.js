const router = require("express").Router();
const {authenticateToken} =require("./userAuth");
const Book= require('../models/book');
const Order= require('../models/order');
const User = require("../models/user");

//placing order
router.post("/place-order",authenticateToken,async(req,res)=>{
   try{
   const {id}= req.headers;
   const{order}= req.body;

   for(const orderData of order){
      const newOrder =new Order({user:id,book: orderData._id});
      const orderDataFromDb = await newOrder.save();

      //saving order in user model
      await User.findByIdAndUpdate(id,{
         $push:{orders: orderDataFromDb._id},
      });
      //clearing cart
      await User.findByIdAndUpdate(id,{
         $pull:{ cart:orderData._id},
      });
   }
   return res.json({status:"Success",message:"Order Placed Successfully",

   });
}
catch(error){
   return res.status(500).json({messsage:" internal server error"});
}

   
});

//get order history of particular user
router.get("/get-order-history",authenticateToken,async(req,res)=>{
   try{
   const {id}= req.headers;
   const userData =await User.findById(id).populate({
      path:"orders",
      populate:{path:"book"},
   });
   const orderData =userData.orders.reverse();
    return res.json({status:"Success",
      data: orderData,

   });
}
catch(error){
   return res.status(500).json({messsage:" internal server error"});
}

   
});

//get all order --admin
router.get("/get-all-orders",authenticateToken,async(req,res)=>{
   try{
    const userData =await Order.find()
    .populate({
      path:"book",
    })
    .populate({
      path:"user",
    })
    .sort({createdAt:-1});
    return res.json({
      status:"success",
      data: userData,
    });
}
catch(error){
   return res.status(500).json({messsage:" internal server error"});
}

   
});

//update order--admin
router.put("/update-status/:id",authenticateToken,async(req,res)=>{
   try{
      const{ id }=req.params;
      
      await Order.findByIdAndUpdate(id, { status: req.body.status });
      return res.json({
         status:"Success",
         message:"status Updated  Successfully",
      });
}
catch(error){
   return res.status(500).json({messsage:" internal server error"});
}

   
});






module.exports= router;
