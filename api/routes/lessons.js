var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");
const CoursSchema = require("../models/Cours");
const Notification = require("../models/Notifications")
mongoose.connect("mongodb://localhost:27017/SchoolProject",{useNewUrlParser:true});
let db = mongoose.connection;

db.on("error",(err)=>console.log("Err"));

router.post("/",(req,res)=>{
    res.type('application/json');
    
    let d = req.body;
    CoursSchema.create({
        by:d.by,
        at:Date.now(),
        type:d.type,
        module:d.module,
        title:d.title,
        contenu:d.contenu,
        filiere:d.filiere
    },(err,data)=>{
        if(err)res.json({success:false})
        else{
            let type = "cours"
            if(d.type == 2)
                type = "exercice"
            Notification.create({
                by:d.by,
                target:d.filiere,
                name:d.name,
                at:Date.now(),
                contenu:d.name+' a posté un nouvel '+type+` (${d.title})`
            })
            res.json({success:true,data})
        }
    })
})
router.get('/get/:filiere',(req,res)=>{
    res.type('application/json');
    CoursSchema.find({filiere:req.params.filiere},{},{
        sort:{
            at:-1,
        }
    },(err,data)=>{
        if(err)res.json({success:false})
        else{
            res.json({success:true,data})
        }
    })
})
router.get('/:by',(req,res)=>{
    res.type('application/json');
    CoursSchema.find({by:req.params.by},{},{
        sort:{
            at:-1,
        }
    },(err,data)=>{
        if(err)res.json({success:false})
        else{
            res.json({success:true,data})
        }
    })
})
router.get('/view/:id',(req,res)=>{
    res.type('application/json');
    CoursSchema.findOne({_id:req.params.id},(err,data)=>{
        if(err)res.json({success:false})
        else{
            res.json({success:true,data})
        }
    })
})

router.delete("/:id",(req,res)=>{
    res.type('application/json');
    CoursSchema.findByIdAndRemove(req.params.id,(err,data)=>{
        if(err)res.json(err)
        res.json({msg:"Vos données ont été supprimées avec succès"})
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
})


router.get("/:id",(req,res)=>{
    res.type('application/json');
    FiliereSchema.find({_id:req.params.id},(err,data)=>{
        if(err)res.json(err)
        res.json(data)
    })
})

*/
module.exports = router;
