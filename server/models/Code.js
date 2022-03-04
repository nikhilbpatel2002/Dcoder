const mongoose = require('mongoose');
const CodeSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId ,
        ref:'user'
    },
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