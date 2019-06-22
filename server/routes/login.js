const express=require('express');
const loginRoute=express.Router();
const mongoClient=require('mongodb').MongoClient;   
const connectionString=require('../config').dbConnectionString;


loginRoute.post('/tchLogin',(req,res)=>{
    const info=req.body;
    mongoClient.connect(connectionString,{useNewUrlParser: true}).then((response)=>{
        const db=response.db('FinalYearProject');
        db.collection('Professor').findOne({prof_id:info.body.tchId},(err,response)=>{
            response==null ? res.json(response) : res.json(response);
        })
    })
});

loginRoute.post('/signup',(req,res)=>{
    const info=req.body;
    mongoClient.connect(connectionString,{useNewUrlParser: true}).then((response)=>{
        const db=response.db('FinalYearProject');
        db.collection('Professor').find({prof_id:info.prof_id}).toArray((err,data)=>{
            data.length!=0 ? console.log("professor exists") : db.collection('Professor').insertOne(info,(err,data)=>{
                console.log("professor added");
            }) 
        })

    })
    console.log("signup done ");
});

loginRoute.post('/stdLogin',(req,res)=>{
    const info=req.body;
    mongoClient.connect(connectionString,{useNewUrlParser: true}).then((response)=>{
        const db=response.db('FinalYearProject');
        db.collection('Students').findOne({std_id:info.agno},(err,response)=>{
            console.log("student checked");
            err ? console.log(err) : db.collection('Professor').find().toArray((error,response)=>{
                res.json(response);
            });
        })
    })
});

module.exports=loginRoute;