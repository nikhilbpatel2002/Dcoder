const express = require('express');
const router = express.Router();
var request = require('request');
// const GovermentScheme = require('../models/GovermentScheme');
const { body, validationResult } = require('express-validator');

// router.get('/',(req,res)=>res.send("ide"));
// 

router.post('/',async(req,res)=>{
    const { code,input} = req.body
    console.log("hello");
    console.log(code);
    var program = {
        script : code,
        stdin:input ,
        language: "cpp14",
        versionIndex: "0",
        clientId: "6b9cb7c8a2328869a3ede7a4d167b2d0",
        clientSecret:"c3e31d55e9a385391f9f70ab1d1f3ebece6ebcc58498fe18c2904b5e72243345"
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