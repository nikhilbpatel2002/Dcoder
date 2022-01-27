const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Question = require('../models/Question');
//challengeDifficulty, title , description , inputFormat , outputFormat , tags ,
// router.get('/question',(req,res)=>res.send("question"));
// router.get('/:id',(req,res)=>res.send("question"));

router.get('/questionList/', async (req, res) => {
    
    let question = await Question.find({});
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
    const { challengeDifficulty, title, description, inputFormat, outputFormat, tags } = req.body
    res.send("question")

    const question = new Question(
        {

            challengeDifficulty: challengeDifficulty,
            title: title, description: description, inputFormat: inputFormat, outputFormat: outputFormat, tags: tags
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