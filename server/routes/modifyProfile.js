const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const { body, validationResult } = require('express-validator');
const Profile = require('../models/Profile');

// http://localhost:5000/modifyProfile/
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
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var Image = require('../models/Image');
// router.get('/',(req,res)=>res.send("ide"));
// 

// Step 4 - set up EJS
  
// router.use(bodyParser.urlencoded({ extended: false }))
// router.use(bodyParser.json())

var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });

router.post('uploadimage/', upload.single('image'), (req, res, next) => {
    console.log("UPLOADIMAGE");
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    console.log(obj);
    Image.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });
});
router.get('getimage/', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});

router.put("/", (req, res) => {
    const { userId, fName, lName, companyName, collegeName, dateOfBirth, gender, contactNumber, address ,imageUrl } = req.body
    console.log(req.body);
    Profile.updateOne(
        { userId: new mongodb.ObjectId(userId) },
        {
            $set: {
                userId: userId, fName: fName, lName: lName, companyName: companyName, collegeName: collegeName, dateOfBirth: dateOfBirth, gender: gender, contactNumber: contactNumber, address: address , imageUrl:imageUrl
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