const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } =require("./userAuth");


//add to cart
router.put("/add-book-to-cart", authenticateToken, async (req,res)=>{
   try{
      const{bookid,id}=req.headers;
      const userData= await User.findById(id);
      const isBookinCart= userData.cart.includes(bookid);
      if(isBookinCart){
        return res.json({
            status:"success",
            message:"book already in cart",
        });
      }

      await User.findByIdAndUpdate(id,{
        $push:{cart:bookid},
    });
      return res.json({
        status:"success",
        message:"book added to cart",
    });
      

   }catch(error){
    return res.status(500).json({message:"internal server error"});

   } 
});


// remove from cart
router.put("/remove-book-from-cart/:bookid",authenticateToken,async(req,res)=>{
   try{
      const{bookid}=req.params;
      const{id}=req.headers;
      
         await User.findByIdAndUpdate(id,{$pull:{cart:bookid}
      });

      
      return res.json({status:"success",
        message:"book removed from cart",
    });
      

   }catch(error){
    return res.status(500).json({message:"internal server error"});

   } 
});

//get cart of a particular user

router.get("/get-user-cart",authenticateToken,async(req,res)=>{
   try{
      const{id}=req.headers;
      const userData = await User.findById(id).populate("cart");
     const cart = userData.cart.reverse();
   return res.json({
      status:"success",
       data: cart,
      });
      

   }catch(error){
    return res.status(500).json({message:"an error occurred"});

   } 
});

module.exports= router;