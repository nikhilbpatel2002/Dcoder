const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.get('/',(req,res)=>res.send("ide"));


module.exports = router