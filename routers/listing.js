// projectRouter.js

const express = require('express');
const ProjectDetail=require("../models/projectDetail");
const User=require("../models/users");
const {verifyToken}=require("../middelware")
//const session = require('express-session');
const router = express.Router();


router.get("/",verifyToken,async(req,res)=>{ 
    const {type}=req.body;
    if(type=="News"||type=="Projects"){
        const list=await ProjectDetail.find({type:type});
        res.send(list);
    }else if(type==""){
        const list=await ProjectDetail.find({});
        res.send(list);
    }else{
        return res.status(300).send('Your type is not valid');
    }
   
    
})

module.exports=router