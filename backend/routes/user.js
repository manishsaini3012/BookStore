const router = require("express").Router();
const User = require("../models/user");
const bcrypt =require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authenticateToken} =require("./userAuth");

// Sign-up route
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, address, password } = req.body;

        // Check length of username
        if (username.length < 4) {
            return res.status(400).json({ message: "Username should be at least 4 characters long." });
        }

        // Check if username already exists
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.status(400).json({ message: "Username already exists." });
        }

        // Check if email already exists
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: "Email already registered." });
        }

        // Check password length
        if (password.length < 5) {
            return res.status(400).json({ message: "Password should be at least 5 characters long." });
        }

        const hashPass= await bcrypt.hash(password, 10);

        // Create and save new user
        const newUser = new User({ username:username, email:email, password:hashPass , address:address });
        await newUser.save();

        return res.status(201).json({ message: "User created successfully." });

    } catch (error) {
        // console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

//sign-in 
router.post("/sign-in", async (req, res) => {
  try {
      const{username ,password} =req.body;
      const alreadyUser =await User.findOne({username});
      if(!alreadyUser){
        res.status(400).json({message:"invalid credentials"});
      }

       await bcrypt.compare(password,alreadyUser.password,(err,data)=>{
        if (data){
            const authClaims=[
                {name:alreadyUser.username},
                {role:alreadyUser.role},
            ]
            const token=jwt.sign({authClaims},"bookstore123",{
                expiresIn:"30d",
            });
            res.status(200).json({
                id:alreadyUser._id,
                role:alreadyUser.role,
                token:token,
            });
        }
        else{
            res.status(400).json({message:"inavlid credentials"});
        }
       });

      

  } catch (error) {
      // console.error(error);
      return res.status(500).json({ message: "Internal server error." });
  }
});


// get-user-information
router.get("/get-user-information", authenticateToken, async(req,res)=>{
    try{
    const{id}=req.headers;
    const data =await User.findById(id).select("-password");
    return res.status(200).json(data);

    }catch(error){
        res.status(500).json({message:"internal server error"});

    }
});


// update address
router.put("/update-address", authenticateToken, async(req,res)=>{
    try{
        const {id}= req.headers;
        const{address}=req.body;
        await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"Address updated successfully"});

    }catch(error){
        res.status(500).json({message:"internal server error"});

    }
});
module.exports = router;
