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
    tags: [{
        type: String
    }]
    
});

const Question = new mongoose.model("Question",QuestionSchema)

module.exports = Question;