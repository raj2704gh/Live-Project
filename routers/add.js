const express = require('express');
const multer = require('multer');
const ProjectDetail=require("../models/projectDetail");
const upload = multer({ dest: "uploads/" });
const User=require("../models/users");
const {verifyToken,validateListing}=require("../middelware");
const router = express.Router();


// Define your routes using router methods like get, post, put, delete, etc.
router.post('/', upload.array('attachment'),verifyToken,validateListing, async(req, res) => {
   try {  
       
       const user=await User.findById(req.session.user._id);  
        
     // Extract data from the request body
       let {demo}=req.body;
       demo=JSON.parse(demo);
       const {type,headline,details,phase,locations,contacts,period,ownerAgency}=demo;
       const attachments = req.files.map(file => file.path );
      
       //extract data
      const {contacDetail,projectCost,projectCategory}=contacts;
    
      // Extract period details
       const { startDate, endDate, months,days  } = period;


      // Extract owner/agency details
        const { ownerName, source, otherAgency } = ownerAgency;


     // Create a new project detail instance
    const projectDetail = new ProjectDetail({
      type,
      headline,
      details,
      attachment:attachments,
      phase,
      locations: locations,
      contacts:{ contacDetail,projectCost,projectCategory},
      period: { startDate, endDate, months,days },
      ownerAgency: { ownerName, source,otherAgency },
      userDetail:user
    });

      // Save project detail to the database
       await projectDetail.save();

      // Send success response
       return res.status(200).send('Project detail saved successfully');
  
   } catch (error) {
     console.error(error);
     return res.status(500).json({ error: 'Server Error' });
  }
});

// Export the router so that it can be used in other files
module.exports=router;

