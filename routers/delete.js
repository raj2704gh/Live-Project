const express = require('express');
const router = express.Router();
const {verifyToken}=require("../middelware")
const ProjectDetail = require('../models/projectDetail');


// API endpoint to delete project details
router.delete('/', verifyToken, async (req, res) => {
    try {
        // Extract project IDs from the request body
        const { projectIds } = req.body;
        console.log(projectIds);
        // Check if projectIds is provided
        if (!projectIds || !Array.isArray(projectIds)) {
            return res.status(400).json({ error: 'Invalid input. Project IDs must be provided as an array.' });
        }

        // Delete projects based on provided IDs
        const deletionResults = await ProjectDetail.deleteMany({ _id: { $in:projectIds } });

        // Check if any projects were deleted
        if (deletionResults.deletedCount === 0) {
            return res.status(404).json({ error: 'No projects found with the provided IDs.' });
        }

        // Return success message
        return res.status(200).json({ message: 'Project(s) deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
