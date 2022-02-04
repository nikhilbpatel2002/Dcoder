const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
    challengeDifficulty :{
        type: String    
    },
    title :{
        type: String    
    },
    description :{
        type: String    
    },
    inputFormat :{
        type: String    
    },
    outputFormat :{
        type: String
    },
    sampleInput :{
        type : String 
    },
    sampleOutput : {
        type : String 
    },
    tags: [{
        type: String
    }]
    
});

const Question = new mongoose.model("Question",QuestionSchema)

module.exports = Question