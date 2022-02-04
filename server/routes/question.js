const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Question = require('../models/Question');
//challengeDifficulty, title , description , inputFormat , outputFormat , tags ,
// router.get('/question',(req,res)=>res.send("question"));
// router.get('/:id',(req,res)=>res.send("question"));

router.get('/questionList/:difficulty/:tag', async (req, res) => {
    console.log(req.params.difficulty.toString());
    let question = Question();
    if (req.params.difficulty.toString() == "all" && req.params.tag.toString() == "all") question = await Question.find({});
    else if (req.params.difficulty.toString() == "all")
    {
        //only search by tag
        //db.inventory.find( { tags: { $all: ["red", "blank"] } } )
        question = await Question.find({tags: req.params.tag.toString() }) ;
    }
    else if (req.params.tag.toString() == "all"){
        question = await Question.find({ challengeDifficulty: req.params.difficulty.toString() });
    }
    // if (req.params.difficulty.toString() == "all") question = await Question.find({});
    else
        question = await Question.find({ challengeDifficulty: req.params.difficulty.toString(),tags: req.params.tag.toString() });
    if (question) {
        console.log(question);
        res.json(question);
    }
    else {
        res.json("error in fatching question list")
    }
})


router.get('/:id', async (req, res) => {
    // id = "61f2b4e2ac3689e63399f9f8";
    let question = await Question.findOne({ _id: req.params.id.toString() });
    if (question) {
        console.log(question);
        res.json(question);
    }
    else {
        res.json("error in fatching question")
    }
})


router.post('/questionWriter', (req, res) => {
    const { challengeDifficulty, title, description, inputFormat, outputFormat, sampleInput,sampleOutput, tags } = req.body

    const question = new Question(
        {

            challengeDifficulty: challengeDifficulty,
            title: title, description: description, inputFormat: inputFormat, outputFormat: outputFormat, sampleInput: sampleInput , sampleOutput:sampleOutput , tags: tags
        }
    );
    question.save(err => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send({ message: "question added Successfully " })
        }
    })

});
// delete question using id 
router.delete("/:id", async ( req,res)=>{
    console.log(req.params.id);
    const result = await Question.deleteOne({_id:new mongodb.ObjectId(req.params.id)})
    res.send( {message : "Question deleted successfully."});
})
module.exports = router


/* 
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/Profile');


router.post("/", (req, res) => {
    const { userId, fName, lName, companyName, collegeName, dateOfBirth, gender, contactNumber, address } = req.body

    User.findOne({ userId: userId }, (err, profile) => {
        if (profile) {
            if (fName)
                profile.fName = fName;
            if (lName)
                profile.lName = lName;
            if (companyName)
                profile.companyName = companyName;
            if (collegeName)
                profile.collegeName = collegeName;
            if (dateOfBirth)
                profile.dateOfBirth = dateOfBirth;
            if (gender)
                profile.gender = gender;
            if (contactNumber)
                profile.contactNumber = contactNumber;
            if (address)
                profile.address = address;
            profile.save() ; 
        }
        else if (err) {
            res.send(err)
        }
        else {
            res.send({ message: "User not registered" })
        }
    })
    console.log(req.body);
})


module.exports = router 
*/