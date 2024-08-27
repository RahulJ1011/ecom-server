const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    Photo1:{
        type:String,
        required:true
    },
    Photo2:{
        type:String,
        required:true
    },
     Photo3:{
        type:String,
        required:true
    }, 
    Photo4:{
        type:String,
        required:true
    }, 
    Photo5:{
        type:String,
        required:true
    },
    Description:
    {
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    PrevPrice:{
        type:Number,
        required:true
    },
    Rating:{
        type:Number,
        required:true
    }


},
{
    timestamps:true
})

const Product = mongoose.model("Product",ProductSchema);
module.exports = Product