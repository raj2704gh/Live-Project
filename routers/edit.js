const express = require('express');
const router = express.Router();
const multer = require('multer');
const {verifyToken}=require("../middelware")
const upload = multer({ dest: "uploads/" });
const ProjectDetail = require('../models/projectDetail');


// API endpoint to retrieve existing project details
router.get('/edit/show',verifyToken, async (req, res) => {
    try {
        const projectId = req.body.projectId;
        if(!projectId){
          const project=await ProjectDetail.find({});
          res.send(project);
        }else{
             
        const project = await ProjectDetail.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        // Return project details
        return res.status(200).json({ project });
        
        }
    } catch (error) {
        return res.status(500).json({ error: 'Server Error' });
    }
  });

 
// API endpoint to update project details
router.post('/edit', upload.array('attachment'),verifyToken,async (req, res) => {
    try {
       // Extract data from the request body
        let {demo,id}=req.body;
        console.log(id)
        demo=JSON.parse(demo);
        //const projectId = req.params.id;
        let updatedDetails=demo;
        const project = await ProjectDetail.findById(id);
        const existingAttachments = project.attachment || [];
        const newAttachments = req.files.map(file => file.path );
        const combinedAttachments = existingAttachments.concat(newAttachments);

       // Find the project by projectId
        
          if (!project) {
             return res.status(404).json({ error: 'Project not found' });
          }
  
       // Loop through each field in the updated details
          for (const key in demo) {
           // Check if the field is blank
              if (!demo[key]) {
            // If blank, retain the old value
                  demo[key] = project[key];
                }
            }
  
          // Remove 'headline' field from updatedDetails if it exists
         //delete updatedDetails.headline;
         updatedDetails.attachment=combinedAttachments;
         updatedDetails.updatedAt=new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
       // Update project details
          project.set(updatedDetails);
          await project.save();
  
         // Return success message
          return res.status(200).json({ message: 'Project details updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
    }
  });
  
 module.exports = router;
