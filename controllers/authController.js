const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/auth');
const dotenv = require('dotenv');

dotenv.config()

const register = async(req,res)=> {
    try
    {
        const {FirstName,LastName,Email,Password,PhNumber} = req.body;
        const isUser = await User.findOne({Email});
        if(isUser)
            {
                return res.status(400).json({
                    msg:"User already exists"
                })
            }
        const hashedPassword = await bcrypt.hash(Password,10);
        const newUser = new User({
            FirstName,
            LastName,
            Email,
            Password:hashedPassword,
            PhNumber
        })
        await newUser.save();
        return res.status(201).json({
            msg:"sucessfully registered",
            newUser
        })
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({msg:err})
    }
}

const login = async(req,res)=>
    {
        try
        {
            const {Email,Password} = req.body;
            const isUser = await User.findOne({Email});
            if(!isUser)
                {
                    return res.status(404).json({msg:"User not found"});
                }
            const checkUser = await bcrypt.compare(Password,isUser.Password);
            if(!checkUser)
                {
                    return res.status(400).json({msg:"Password does not match to email Id"});
                }
            const token = jwt.sign({
                id:isUser._id
            },"ecomm123");
            const loggedUser = isUser.toObject();
      delete loggedUser.Password;
      return res.status(201).json({token,loggedUser});

        }
        catch(err)
        {
            console.log(err)
            return res.status(500).json({msg:err})
        }
    }
    module.exports ={login,register}