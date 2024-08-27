const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connection = ()=>
    {
       
        mongoose.connect(process.env.MONGO_URI);
        console.log("mongoose is connected");
    }
module.exports = {connection};

