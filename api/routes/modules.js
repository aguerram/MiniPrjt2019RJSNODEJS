var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");
const ModuleSchema = require("../models/Module");

mongoose.connect("mongodb://localhost:27017/SchoolProject",{useNewUrlParser:true});
let db = mongoose.connection;

db.on("error",(err)=>console.log("Err"));

router.post('/',(req,res)=>{
    res.type('application/json');
    let d = req.body;
    console.log(d)
    ModuleSchema.create({
        'code':d.code,
        'title':d.title,
        'filiere':d.filiere
    },(err,re)=>{
        if(err) res.json({success:false,msg:err})
        else{
            res.json({success:true})
        }
    })
})
router.get('/',(req,res)=>{
    res.type('application/json');
    ModuleSchema.find({},{},{
        sort:{
            code:1
        }},(err,data)=>{
            if(err)res.json({success:false})
            else{
                res.json({success:true,data})
            }
    })
})

/*router.get("/",(req,res)=>{
  res.type('application/json');
  FiliereSchema.find({},{},{sort:{
      code:1
  }},(err,data)=>{
      if(err)res.json(err)
      res.json(data)
  })
})*/
router.delete("/:id",(req,res)=>{
    res.type('application/json');
    ModuleSchema.findByIdAndRemove(req.params.id,(err,data)=>{
        if(err)res.json(err)
        res.json({msg:"Vos données ont été supprimées avec succès"})
    })
})

module.exports = router;
