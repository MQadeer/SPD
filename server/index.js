const express=require('express');
const server=express();
const bodyParser=require('body-parser');
const conmectionString=require('./config').dbConnectionString;
const port=process.env.port || 5000;

const loginRoute=require('./routes/login');
const scheduleRouter = require('./routes/schedules');

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
const mongodb=require('mongodb');

mongodb.connect(conmectionString,{ useNewUrlParser: true })
.then(()=>{
    console.log('db working');
}).catch(err=>{
    console.log(err);
});


server.get('/',(req,res)=>{
    res.send("good , it worked ");
});

server.use('/loginRoute',loginRoute);
server.use('/scheduleRoute',scheduleRouter);

server.listen(port,()=>{
    console.log("server is listening on port  3000");
});

