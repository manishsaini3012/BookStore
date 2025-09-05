const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {authenticateToken} =require("./userAuth");
const Book= require('../models/book');


//add book--admin
router.post("/add-book",authenticateToken, async(req,res)=>{
   try{

    const {id}= req.headers;
    const user = await User.findById(id);
    if(user.role!=="admin"){
      return  res.status(400).json({message:"you cannot access this."});
    }

        const book = new Book({
            url:req.body.url,
            title:req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
            
        });
        await book.save();
       return res.status(200).json({message:"book added successfully"});

   }catch(error){
      
     return res.status(500).json({message:"internal server error"});

   }
});

//update book
router.put("/update-book",authenticateToken, async(req,res)=>{
    try{
 
     const {bookid }= req.headers;
      await Book.findByIdAndUpdate(bookid,{
             url:req.body.url,
             title:req.body.title,
             author: req.body.author,
             price: req.body.price,
             desc: req.body.desc,
             language: req.body.language,
             
         });
        
        return res.status(200).json({message:"book updated successfully"});
 
    }catch(error){
       
      return res.status(500).json({message:"internal server error"});
 
    }
 });


// delete book
router.delete("/delete-book",authenticateToken, async(req,res)=>{
    try{
 
     const {bookid }= req.headers;
      await Book.findByIdAndDelete(bookid);
        
        return res.status(200).json({message:"book deleted successfully"});
 
    }catch(error){
       
      return res.status(500).json({message:"internal server error"});
 
    }
 });


 //get all books
 router.get("/get-all-books", async(req,res)=>{
    try{
 
     const books = await Book.find().sort({createdAt:-1});
     return res.json({
        status: "success",
        data: books,
     });
        
        
 
    }catch(error){
       
      return res.status(500).json({message:"internal server error"});
 
    }
 });


 //get recently added book
 router.get("/get-recent-books", async(req,res)=>{
    try{
 
     const books = await Book.find().sort({createdAt:-1}).limit(4);
     return res.json({
        status: "success",
        data: books,
     });
        
        
 
    }catch(error){
       
      return res.status(500).json({message:"internal server error"});
 
    }
 });


 //get book by id

 router.get("/get-book-by-id/:id", async(req,res)=>{
    try{
       const{id}=req.params;
     const books = await Book.findById(id);
     return res.json({
        status: "success",
        data: books,
     });
        
        
 
    }catch(error){
       
      return res.status(500).json({message:"internal server error"});
 
    }``
 });


module.exports=router;