const express = require('express');
const Financial=require("../models/fiananciale");
const jwt = require('jsonwebtoken');
const {verifyToken}=require("../middelware")
console.log(verifyToken)
const router = express.Router();

router.get("/",(req,res)=>{
    res.send(req.body)
})

// Step 2: Create API Endpoint
router.post('/',verifyToken, async (req, res) => {
    try {
        const { otherAgencies } = req.body;
         if (!otherAgencies ) {
             return res.status(400).json({ error: 'Financial data is missing or not an array' });
         }

         const financial = new Financial({
          otherAgencies:otherAgencies
         });
         const info=await financial.save(); 
         return res.status(200).json({ message: 'Financial information added successfully',"financierName":info.otherAgencies.financierName, "financierAddress":info.otherAgencies.financierAddress});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
    }
  });


module.exports=router;