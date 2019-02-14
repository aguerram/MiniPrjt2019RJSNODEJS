var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");
const UserModel = require("../models/User");

mongoose.connect("mongodb://localhost:27017/SchoolProject",{useNewUrlParser:true});
let db = mongoose.connection;

db.on("error",(err)=>console.log("Err"));

router.post('/login', function(req, res, next) {
  let {email,password,type} = req.body;
  let success = false;
  res.type('application/json');
  UserModel.find({email:email.trim(),password:password,type},(err,data)=>{
    if(err)
      return res.json({success:false});
    else{
      if(data.length>0)
      {
        if(data[0].confirmed)
        {
          console.log(data);
          return res.json({
            success:true,
            _id:data[0]._id,
            'name':data[0].f_name+' '+data[0].l_name,
            'ms':data[0].isAdmin,
            'f':data[0].filiere,
            't':data[0].type
          });
        }
        else{
          return res.json({success:false,'msg':'Votre compte n\'est pas encore confirmé'});
        }
      }
      return res.json({success:false});
    }    
  });
});
router.post("/signup",(req,res)=>{
  res.type('application/json');
  let da = req.body;
  UserModel.find({'email':da.email},(err,doc)=>{
    if(err) res.send({"success":false,"msg":'Error survenu'})
    else{
      if(doc.length>0)
      {
        res.send({"success":false,"msg":`${da.email} exist déja`})
      }
      else{
        UserModel.create({
          'email':da.email,
          'f_name':da.f_name,
          'l_name':da.l_name,
          password:da.password,
          type:da.type,
          filiere:da.filiere,
          isAdmin:da.firstTime,
          confirmed:da.firstTime,
          },(err,data)=>{
            if(err) res.send({"success":false,"msg":'Error survenu'})
            else {
              if(!da.firstTime)
              {
                res.json({"success":true,"msg":"Votre compte a été créé avec succès, en attente de la validation de l'administration"})

              }
              else
                 res.json({"success":true,"msg":"Votre compte admin a été créé avec succès, connecter en tant que professeur"})
            }
          });
      }
      /**/
    }
  })
})

//
router.get("/teachers",(req,res)=>{
  res.type('application/json');
  UserModel.find({type:2},{},{
    sort:{
      f_name:1
    }
  },(err,data)=>{
    if(err) res.json({success:false})
    else
    res.json({success:true,data})
  })
})
router.get("/:id",(req,res)=>{
  res.type('application/json');
  UserModel.findOne({_id:req.params.id},(err,data)=>{
    if(err) res.json({success:false})
    else
    res.json({success:true,data})
  })
})
router.get("/students/:filiere",(req,res)=>{
  res.type('application/json');
  UserModel.find({type:1,filiere:req.params.filiere},{},{
    sort:{
      f_name:1
    }
  },(err,data)=>{
    if(err) res.json({success:false})
    else
    res.json({success:true,data})
  })
})
router.put("/student/c/",(req,res)=>{
  res.type('application/json');
  UserModel.findOne({_id:req.body.id},(err,data)=>{
    if(err)res.json({success:false})
    else{
      data.confirmed = true;
      data.save((err)=>{
        if(err)res.json({success:false})
        else
        {
          res.json({success:true})
        }
      })

    }
  })
})

router.delete("/:id",(req,res)=>{
  res.type('application/json');
  UserModel.findByIdAndRemove(req.params.id,(err,data)=>{
    if(err)res.json({success:false})
    else{
      res.json({success:true,data})
    }
  })
})

module.exports = router;
