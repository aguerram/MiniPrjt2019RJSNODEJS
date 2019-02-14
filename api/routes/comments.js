var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");
const CommentsSchema = require("../models/Comments");
const UserSchema = require("../models/User")
const Notification = require("../models/Notifications")
const Cours = require('../models/Cours')
mongoose.connect("mongodb://localhost:27017/SchoolProject",{useNewUrlParser:true});
let db = mongoose.connection;

db.on("error",(err)=>console.log("Err"));

router.post('/',(req,res)=>{
    res.type('application/json');
    let d = req.body;
    UserSchema.findOne({_id:d.by},(err2,re)=>{
        if(err2)res.json({success:false})
        else{
            if(re)
            {
                console.log(re)
                CommentsSchema.create({
                    'by':d.by,
                    'postid':d.postid,
                    'contenu':d.contenu,
                    'at':Date.now(),
                    'name':re.f_name+" "+re.l_name
                },(err,re2)=>{
                    if(err) res.json({success:false,msg:err})
                    else{
                        Cours.findById(d.postid,(err,res3)=>{
                            if(!err)
                            {
                                Notification.create({
                                    by:d.by,
                                    target:res3.by,
                                    name:re.f_name+" "+re.l_name,
                                    at:Date.now(),
                                    contenu:re.f_name+" "+re.l_name+' a commenté dans votre publication'
                                })
                            }
                        })

                        res.json({success:true})
                    }
                })
            }
            else{
                res.json({success:false})
            }
        }
    })
})

router.get('/:postid',(req,res)=>{
    res.type('application/json');
    CommentsSchema.find({postid:req.params.postid},{},{
        sort:{
            at:-1
        }},(err,data)=>{
            if(err)res.json({success:false})
            else{
                res.json({success:true,data})
            }
    })
})

router.delete("/:id",(req,res)=>{
    res.type('application/json');
    CommentsSchema.findByIdAndRemove(req.params.id,(err,data)=>{
        if(err)res.json(err)
        res.json({msg:"Vos données ont été supprimées avec succès"})
    })
})

module.exports = router;
