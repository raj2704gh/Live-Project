const express = require('express');
const bcrypt = require('bcrypt');
const User=require("../models/users");
const router = express.Router();

// Define a POST endpoint for user registration
router.post('/', async (req, res) => {
    try {
      // Extract user data from request body
      const { email, password, name } = req.body;
      // // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
      //store in database
      const newUser=new User({email,password:hashedPassword,name});
      await newUser.save();
  
      // // Send a 200 OK response
      res.status(200).json({ message: "Registration successful" });
  
    } catch (error) {
      // If any error occurs, send a 500 Internal Server Error response
      console.error("Registration Error:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });
  

  module.exports=router;