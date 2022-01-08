const express = require('express');
const router = express.Router();
// const GovermentScheme = require('../models/GovermentScheme');
const { body, validationResult } = require('express-validator');

router.get('/',(req,res)=>res.send("ide"));


module.exports = router