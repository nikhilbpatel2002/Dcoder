const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const nodemailer = require('nodemailer');


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
    const {email , password } =req.body

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    var OTP = getRandomInt(1000, 10000).toString()

    User.findOne({email:email},(err,user) => {
        if(!user){
            res.send({message:"User Not Registered Yet"})
        }
        else if (err)
        {
            res.send(err)
        }
        else{
            const user= new User({
                fName:null,
                email : email ,
                password : password
            })

            var mailOptions = {
                from : 'nbjtestproject@gmail.com',
                to : email ,
                subject : 'Dcoder - Verify your Email ✔' ,
                text : OTP,
                html : "<h5>Your OTP is "+OTP +"</h5>",
                html : `<p><span style="font-size:18px">Please use the below OTP to verify your email information on Dcoder&nbsp;</span></p>&nbsp;<h1><span style="color:#000080"><em><strong>`+OTP+`</strong>
                </em><span></h1><br /><span style="font-size:18px"><strong>Note : Do not share your OTP&nbsp;to anyone
                </strong><br /><br /><br />Thanks,<br/>Team Dcoder</span>`
            }
            
            transporter.sendMail(mailOptions,function(err,info){
                if(err){
                    console.log(err);
                }else{
                    console.log("Email sent: " + info.response );
                }
            });
            console.log(OTP);
            res.send( {user : user, OTP: OTP})

        }
    })
    
})

router.put("/otp",async(req,res)=>{
    const {email , password } =req.body
    User.updateOne(
        { email: email },
        {
            $set: {
                password: password
            }
        }
    ).then(res.send({ message: "Password Updated successfully." })).catch((err)=>console.log(err));
    

})


module.exports = router