const mongoose = require("mongoose");

const Db = async()=>{
    try{
        await mongoose.connect(`${process.env.URI}`)
        console.log("Database connected successfully")
     }
    catch(error){
        console.log(error);

    }

}
Db();