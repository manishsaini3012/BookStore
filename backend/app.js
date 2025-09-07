const express= require("express");
const app= express();
require("dotenv").config();
app.use(express.json());
const cors=require("cors");
require("./connection/connection");
const User =  require("./routes/user");
const Books =require('./routes/book');
const FAVOURITE =require('./routes/favourites');
const CART=  require('./routes/cart');
const ORDER=  require('./routes/order');

app.use(cors({
    origin:["https://book-bhandar1.vercel.app"]
}));


//routes
app.use("/api/v1",User);  
app.use("/api/v1",Books);
app.use("/api/v1",FAVOURITE);
app.use("/api/v1",CART);    
app.use("/api/v1",ORDER);    

app.get('/',(req,res)=>{
    res.send({
        activeStatus:true,
        error:false,
    })
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: true, message: "Something went wrong!" });
});


//creating a port
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
}); 
