const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const { body, validationResult } = require('express-validator');
const Profile = require('../models/Profile');

/* 
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
 */
router.put("/", (req, res) => {
    const { userId, fName, lName, companyName, collegeName, dateOfBirth, gender, contactNumber, address } = req.body
    console.log(req.body);
    Profile.updateOne(
        { userId: new mongodb.ObjectId(userId) },
        {
            $set: {
                userId: userId, fName: fName, lName: lName, companyName: companyName, collegeName: collegeName, dateOfBirth: dateOfBirth, gender: gender, contactNumber: contactNumber, address: address
            }
        }
    ).then(res.send({ message: "Profile Updated successfully." })).catch((err)=>console.log(err));
})
router.get("/:id", async (req, res) => {
    let profile = await Profile.findOne({ userId: req.params.id.toString() });
    if (profile) {
        // console.log(question);
        res.json(profile);
    }
    else {
        res.json("error in fatching user data")
    }
})
// router.post("/", (req, res) => {
//     const { userId, fName, lName, companyName, collegeName, dateOfBirth, gender, contactNumber, address } = req.body

//     User.findOne({ userId: "61fd2059c2a7c553c6eeb819" }, (err, profile) => {
//         if (profile) {
//             if (fName)
//                 profile.fName = fName;
//             if (lName)
//                 profile.lName = lName;
//             if (companyName)
//                 profile.companyName = companyName;
//             if (collegeName)
//                 profile.collegeName = collegeName;
//             if (dateOfBirth)
//                 profile.dateOfBirth = dateOfBirth;
//             if (gender)
//                 profile.gender = gender;
//             if (contactNumber)
//                 profile.contactNumber = contactNumber;
//             if (address)
//                 profile.address = address;
//             profile.save() ; 
//         }
//         else if (err) {
//             res.send(err)
//         }
//         else {
//             res.send({ message: "User not registered" })
//         }
//     })
//     console.log(req.body);
// })


module.exports = router 