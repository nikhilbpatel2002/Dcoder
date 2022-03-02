const express = require('express');
const router = express.Router();
var request = require('request');
require('dotenv/config');
// const GovermentScheme = require('../models/GovermentScheme');
const { body, validationResult } = require('express-validator');

// router.get('/',(req,res)=>res.send("ide"));
// 

router.post('/',async(req,res)=>{
    const { code,input,language} = req.body
    console.log("hello");
    console.log(code);
    console.log("language " , language);
    var program = {
        script : code,
        stdin:input ,
        language: language,
        versionIndex: "0",
        clientId: process.env.JDOODLE_CLIENTID,
        clientSecret:process.env.JDOODLE_CLIENTSECRET
    };
    await request({
        url: 'https://api.jdoodle.com/v1/execute',
        method: "POST",
        json: program
    },
    function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
        // console.log('body:', body.output);
        res.send(body);
    });
    //  res.send({message:"hello nikhil !"});
    // res.send("hello");
});


module.exports = router

/* 

var program = {
    script : "",
    language: "php",
    versionIndex: "0",
    clientId: "YourClientID",
    clientSecret:"YourClientSecret"
};
request({
    url: 'https://api.jdoodle.com/v1/execute',
    method: "POST",
    json: program
},
function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
});
 */