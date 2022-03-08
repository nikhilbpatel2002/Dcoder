const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Question = require('../models/Question');
//challengeDifficulty, title , description , inputFormat , outputFormat , tags ,
// router.get('/question',(req,res)=>res.send("question"));
// router.get('/:id',(req,res)=>res.send("question"));


// get qeustions by filder
router.get('/questionList/:difficulty/:tag', async (req, res) => {
    console.log(req.params.difficulty.toString());
    let question ;
    if (req.params.difficulty.toString() == "all" && req.params.tag.toString() == "all") question = await Question.find({});
    else if (req.params.difficulty.toString() == "all") {
        //only search by tag
        //db.inventory.find( { tags: { $all: ["red", "blank"] } } )
        question = await Question.find({ tags: req.params.tag.toString() });
    }
    else if (req.params.tag.toString() == "all") {
        question = await Question.find({ challengeDifficulty: req.params.difficulty.toString() });
    }
    // if (req.params.difficulty.toString() == "all") question = await Question.find({});
    else
        question = await Question.find({ challengeDifficulty: req.params.difficulty.toString(), tags: req.params.tag.toString() });
    if (question) {
        // console.log(question);
        res.json(question);
    }
    else {
        res.json("error in fatching question list")
    }
})
// get qeustions by filder with useid 
router.get('/MyQuestionList/:id/:difficulty/:tag', async (req, res) => {
    // console.log(req.params.difficulty.toString());
    let question = Question();
    if (req.params.difficulty.toString() == "all" && req.params.tag.toString() == "all") question = await Question.find({ userId:  new mongodb.ObjectId(req.params.id.toString())});
    else if (req.params.difficulty.toString() == "all") {
        //only search by tag
        //db.inventory.find( { tags: { $all: ["red", "blank"] } } )
        question = await Question.find({userId:  new mongodb.ObjectId(req.params.id.toString()), tags: req.params.tag.toString() });
    }
    else if (req.params.tag.toString() == "all") {
        question = await Question.find({ userId:  new mongodb.ObjectId(req.params.id.toString()),challengeDifficulty: req.params.difficulty.toString() });
    }
    // if (req.params.difficulty.toString() == "all") question = await Question.find({});
    else
        question = await Question.find({userId:  new mongodb.ObjectId(req.params.id.toString()), challengeDifficulty: req.params.difficulty.toString(), tags: req.params.tag.toString() });
    if (question) {
        // console.log(question);
        res.json(question);
    }
    else {
        res.json("error in fatching question list")
    }
})

// get quesiton
router.get('/:id/', async (req, res) => {
    // id = "61f2b4e2ac3689e63399f9f8";
    let question = await Question.findOne({ _id: req.params.id.toString() });
    if (question) {
        // console.log(question);
        res.json(question);
    }
    else {
        res.json("error in fatching question")
    }
})

// add new question  
router.post('/questionWriter/', (req, res) => {
    const {userId, challengeDifficulty, title, description, inputFormat, outputFormat, sampleInput, sampleOutput, tags } = req.body

    const question = new Question(
        {
            userId:  new mongodb.ObjectId(userId),
            challengeDifficulty: challengeDifficulty,
            title: title, description: description, inputFormat: inputFormat, outputFormat: outputFormat, sampleInput: sampleInput, sampleOutput: sampleOutput, tags: tags
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
//update Question
router.put('/questionEditor/:id', (req, res) => {
    const { challengeDifficulty, title, description, inputFormat, outputFormat, sampleInput, sampleOutput, tags } = req.body
    console.log(req.body);
    Question.updateOne(
        { _id: new mongodb.ObjectId(req.params.id) },
        {
            $set: {
                challengeDifficulty: challengeDifficulty,
                title: title,
                description: description,
                inputFormat: inputFormat,
                outputFormat: outputFormat,
                sampleInput: sampleInput,
                sampleOutput: sampleOutput,
                tags: tags
            }
        }
    ).then(res.send({ message: "Question Updated successfully." })).catch((err)=>console.log(err));
    

});
// delete question using id 
router.delete("/:id", async (req, res) => {
    // console.log(req.params.id);
    const result = await Question.deleteOne({ _id: new mongodb.ObjectId(req.params.id) })
    res.send({ message: "Question deleted successfully." });
})
module.exports = router

