// projectRouter.js

const express = require('express');
const ProjectDetail=require("../models/projectDetail");
const User=require("../models/users");
const Owner=require("../models/owner");
const {verifyToken}=require("../middelware")
//const session = require('express-session');
const router = express.Router();


router.get("/",verifyToken,async(req,res)=>{
    const list=await Owner.find({});
    //const namesArray = list.map(owner => owner.name);
    const ownerDetailsArray = list.map(owner => `name:${owner.name},id:${owner.id}`)

    res.send(ownerDetailsArray);
})

module.exports=router;