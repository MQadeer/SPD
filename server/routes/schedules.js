const express = require('express');
const scheduleRouter =express.Router();
const connectionString=require('../config').dbConnectionString;
const mongoClient=require('mongodb').MongoClient;


scheduleRouter.get('/getSchedule',(req,res)=>{
    mongoClient.connect(connectionString,{useNewUrlParser: true}).then((response)=>{
        const db=response.db('FinalYearProject');
        db.collection('Professor').findOne({prof_id:info.prof_id},(err,response)=>{
            err ? console.log(err) : console.log(response.schedule);
        })
    })
});

scheduleRouter.post('/saveSchedule',(req,res)=>{
    const info=req.body;
    mongoClient.connect(connectionString,{useNewUrlParser: true}).then((response)=>{
        const db=response.db('FinalYearProject');
        db.collection('Professor').updateOne({prof_id:info.body.teacherId},
            {$set:{place:info.body.place,schedule:info.body.dateAndtime}}).then((respons)=>{
            res.json(true);
        }).catch(err=>{
            console.log(err);
        })
    })
});

module.exports = scheduleRouter;