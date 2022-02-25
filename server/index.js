const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
//connectToMongo();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

//Database
connectToMongo() ; 




//Routes
app.use('/ide', require('./routes/ide'))
app.use('/upcomingcontest', require('./routes/upcomingcontest'))
app.use('/question', require('./routes/question'))
app.use('/login', require('./routes/login'))
app.use('/register', require('./routes/register'))
app.use('/modifyProfile', require('./routes/modifyProfile'))
app.use('/code', require('./routes/code'))

// Event.find({}, function(err,events)
// {
// 	if(err) console.warn(err);
// 	//var parseBody = JSON.parse(users[]);
// 	//var name = parsedBody['name'];
// 	//app.get("/data",(req,res) => res.send(users));
// 	console.log(events);
// })
// app.get("/",(req,res) => res.send(users));

app.listen(port, () => {
  console.log(`dcoder backend listening at http://localhost:${port}`)
})



