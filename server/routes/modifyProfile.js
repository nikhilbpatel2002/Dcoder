const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/Profile');


router.post("/", (req, res) => {
    const { userId, fName, lName, companyName, collegeName, dateOfBirth, gender, contactNumber, address } = req.body

    User.findOne({ userId: "61fd2059c2a7c553c6eeb819" }, (err, profile) => {
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