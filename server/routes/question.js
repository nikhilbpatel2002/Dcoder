const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.get('/question',(req,res)=>res.send("question"));


module.exports = router