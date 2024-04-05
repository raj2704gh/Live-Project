const express=require("express");
const Owner=require("../models/owner");
const ProjectDetail=require("../models/projectDetail");
const { projectDetailSchema } = require("../validation");
const {verifyToken}=require("../middelware")
const router = express.Router();
const jwt = require('jsonwebtoken');

  
// Route for adding owner information
router.post('/',verifyToken, async (req, res) => {
    try { 
         const { name, address, city, state, country, phone, email, abbreviation } = req.body;
            
       // Validate required fields
         if (!name || !address || !city || !state || !country || !phone || !email || !abbreviation) {
             return res.status(400).json({ error: 'All fields are required' });
            }
      
            // Create a new owner instance
            const owner = new Owner({
                name,
                address,
                city,
                state,
                country,
                phone,
                email,
                abbreviation
            });
      
            // Save owner information to the database
            await owner.save();
      
            // Send success response
            return res.status(200).send('Owner information added successfully');
         
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
    }
  });

module.exports=router;