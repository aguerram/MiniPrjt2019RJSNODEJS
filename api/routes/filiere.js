var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");
const FiliereSchema = require("../models/Filiere");

mongoose.connect("mongodb://localhost:27017/SchoolProject",{useNewUrlParser:true});
let db = mongoose.connection;

db.on("error",(err)=>console.log("Err"));

router.get("/",(req,res)=>{
    res.type('application/json');
    FiliereSchema.find({},{},{sort:{
        code:1
    }},(err,data)=>{
        if(err)res.json(err)
        res.json(data)
    })
})


router.get("/:id",(req,res)=>{
    res.type('application/json');
    FiliereSchema.findOne({_id:req.params.id},(err,data)=>{
        if(err)res.json(err)
        res.json(data)
    })
})
router.delete("/:id",(req,res)=>{
    res.type('application/json');
    FiliereSchema.findByIdAndRemove(req.params.id,(err,data)=>{
        if(err)res.json(err)
        res.json({msg:"Vos données ont été supprimées avec succès"})
    })
})

module.exports = router;
