const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
    {
        FirstName:{
            type:String,
            required:true,
        },
        LastName:{
            type:String,
            required:true,
        },
        Email:{
            type:String,
            required:true
        },
        PhNumber:{
            type:Number,
            required:true
        },
        Password:{
            type:String,
            required:true
        },
        Cart:[
           { cartId:{
                type:String,
                required:true
            },
            Photo:{
                type:String,
                required:true
            },
            Price:{
                type:Number,
                required:true
            },
            PrevPrice:
            {
                type:Number,
                required:true
            },
           Description:{
            type:String,
            required:true
           }}
        ],
        History:
        [
           { 
            ProdId:{
                type:String,
                required:true
            },
            Price:
            {
                type:Number,
                required:true
            },
            Description:
            {
                type:String,
                required:true
            },
            Photo:{
                type:String,
                required:true
            }
        }
            
        ]
    },
    {
        timestamps:true
    }
)

const User = mongoose.model("User",UserSchema);
module.exports = User