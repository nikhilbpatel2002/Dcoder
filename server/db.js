const mon = require("mongoose")

function connectToDB(){
    mon.connect("mongodb+srv://fad1105:fad1105@cluster0.s7ct1.mongodb.net/Dcoder?retryWrites=true&w=majority",
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.warn("DB is now connected");
    })
};

module.exports = connectToDB ; 