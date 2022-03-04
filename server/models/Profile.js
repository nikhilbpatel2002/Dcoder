const mongoose = require('mongoose');
const User = require('./User');
//fName,lName,companyName,collegeName,dateOfBirth,gender,contactNumber,address
const ProfileSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId ,
        ref:'user'
    },
    fName :{
        type: String    
    },
    lName :{
        type: String    
    },
    companyName :{
        type: String    
    },
    collegeName :{
        type: String    
    },
    dateOfBirth :{
        type: Date    
    },
    gender :{
        type: String
    },
    contactNumber :{
        type: String
    },
    address: { 
        type : String
    },
    imageUrl : 
    {
        type:String 
    }
});

const Profile = new mongoose.model("Profile",ProfileSchema)

module.exports = Profile;