var mongoose = require('mongoose');
  
var ImageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
  
//Image is a model which has a schema imageSchema
  
const Image = new mongoose.model('Image', ImageSchema)

module.exports = Image