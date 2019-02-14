var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");
const Notifications = require("../models/Notifications");

mongoose.connect("mongodb://localhost:27017/SchoolProject",{useNewUrlParser:true});
let db = mongoose.connection;

db.on("error",(err)=>console.log("Err"));

router.get("/:id/:fil",(req,res)=>{
    res.type('application/json');
    Notifications.find({
        $or:[
            {target:req.params.id},
            {target:req.params.fil}
        ]
    },{},{sort:{
        at:-1
    }},(err,data)=>{
        if(err)res.json(err)
        res.json(data)
    })
})

module.exports = router;
