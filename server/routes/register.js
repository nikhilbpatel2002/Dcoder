const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth : {     
        // user:process.env.DEFAUL_EMAIL,
        // pass:process.env.DEFAUL_EMAIL_PASSWORD
        user:'nbjtestproject@gmail.com',
        pass:'nbj@1234'
    },
    secure:false,
    tls: {
        rejectUnauthorized: false
    }
});


router.post("/",(req,res)=>{
    const {name , email , password } =req.body

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    var OTP = getRandomInt(1000, 10000).toString()

    User.findOne({email:email},(err,user) => {
        if(user){
            res.send({message:"User already Registered"})
        }
        else if (err)
        {
            res.send(err)
        }
        else{
            const user= new User({
                email : email ,
                password : password
            })

            user.save() ; 
            
           
        }
    })
    
})

router.post("/otp",(req,res)=>{
    const {name , email , password } =req.body
    const user= new User({
        name : name ,
        email : email ,
        password : password
    })
    user.save(err => {
        if(err){
            console.log(err)
            res.send( err)
        }else{
            res.send( { message : "Successfully Registered , Please Login Now"})
        }
    })

    console.log(req.body)
})


module.exports = router