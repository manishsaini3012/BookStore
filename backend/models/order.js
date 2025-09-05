const mongoose = require("mongoose");

const order = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref:"user",
    },
    book:{
        type:mongoose.Types.ObjectId,
        ref:"books",
    },
    status:{
        type:String,
        default:"Order Placed",
         enum:["Order Placed","Out for delivery","Delivered","Cancelled"],
        
    },
},
{timestamps:true},
);

module.exports=mongoose.model("order",order);






// const mongoose = require("mongoose");

// const order = new mongoose.Schema({
//     user: {
//         type: mongoose.Types.ObjectId,
//         ref: "user",
//     },
//     book: {
//         type: mongoose.Types.ObjectId,
//         ref: "books",
//     },
//     status: {
//         type: String,  // Changed "types" to "type"
//         enum: ["Order Placed", "Out for delivery", "Delivered", "Cancelled"],
//         default: "Order Placed"
//     }, 
// }, {timestamps: true});

// module.exports = mongoose.model("order", order); 


 // Changed "module.export" to "module.exports"