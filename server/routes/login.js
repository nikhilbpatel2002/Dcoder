const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// router.get('/question',(req,res)=>res.send("question"));


router.post("/",(req,res)=>{
    const { email , password } =req.body
    
    User.findOne({email:email},(err,user) => {
        if(user){
            if (password == user.password){
                res.send({message:"Login Sucessfull",user:user})
            }else
            {
                res.send({message:"password didn't match "})
            }
        }
        else if (err)
        {
            res.send(err)
        }
        else{
            res.send( {message : "User not registered"})
        }
    })
    console.log(req.body);
})


module.exports = router