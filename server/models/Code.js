const mongoose = require('mongoose');
const CodeSchema = new mongoose.Schema({
    fileName :{
        type: String    
    },
    code :{
        type: String    
    },
    language :{
        type: String    
    }
    //username
});

const Code = new mongoose.model("Code",CodeSchema)

module.exports = Code