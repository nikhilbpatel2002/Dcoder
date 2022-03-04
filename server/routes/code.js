const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Code = require('../models/Code');
//challengeDifficulty, title , description , inputFormat , outputFormat , tags ,
// router.get('/savecode',(req,res)=>res.send("code"));


// get qeustions by filder
// router.get('/codeList/:difficulty/:tag', async (req, res) => {
router.post('/codeList/:language', async (req, res) => {
    // console.log(req.params.language.toString());
    let myCode = Code();
    let id = req.body._id
    console.log(id);
    if (req.params.language.toString() == "all")
        myCode = await Code.find({userId:  new mongodb.ObjectId(id)});
    else
        myCode = await Code.find({userId:  new mongodb.ObjectId(id), language: req.params.language.toString()});
    if (myCode) {
        // console.log(code);
        res.json(myCode);
    }
    else {
        res.json("error in fatching code list")
    }
})
// get quesiton by id 
router.get('/getCode/:id', async (req, res) => {
    // id = "61f2b4e2ac3689e63399f9f8";
    let myCode = await Code.findOne({ _id: req.params.id.toString() });
    if (myCode) {
        // console.log(code);
        res.json(myCode);
    }
    else {
        res.json("error in fatching code")
    }
})

// add new code
router.post('/savecode/', (req, res) => {
    const { code, fileName, language , user } = req.body
    console.log(req.body);
    const myCode = new Code(
        {
            userId : user._id,
            code: code,
            fileName: fileName,
            language: language
        }
    );
    myCode.save(err => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send({ id: myCode._id, message: "File added Successfully! " })
        }
    })

});


//update Code
router.put('/updatecode/:id', (req, res) => {
    const { code, fileName, language } = req.body
    console.log(req.body);
    console.log(req.params.id);
    Code.updateOne(
        { _id: new mongodb.ObjectId(req.params.id) },
        {
            $set: {
                code: code,
                fileName: fileName,
                language: language
            }
        }
    ).then(res.send({ message: "Code Updated successfully." })).catch((err) => console.log(err));


});

// delete code using id 
router.delete("/deleteCode/:id", async (req, res) => {
    console.log("delete Id" + req.params.id);
    const result = await Code.deleteOne({ _id: new mongodb.ObjectId(req.params.id) })
    res.send({ message: "File deleted successfully." });
})
module.exports = router
