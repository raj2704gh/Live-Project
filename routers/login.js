
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
//const session = require('express-session');
const User=require("../models/users");
const router = express.Router();


const f_for_secret=()=>{
  const randomBytes = crypto.randomBytes(32);
  const secretKey = randomBytes.toString('hex');
   return secretKey;
}



router.post("/",async(req,res)=>{
          try {
           // const secretKey=req.session.secretKey;
            const { email, password } = req.body;    

          // Check if user exists in the database
             const user = await User.findOne({ email });
             req.session.user=user
             if (!user) {
              return res.status(400).json({ error: "Invalid email or password" });
             }
            
            // Compare the provided password with the hashed password in the database
             const passwordMatch = await bcrypt.compare(password, user.password);
             if (!passwordMatch) {
               return res.status(400).json({ error: "Invalid email or password" });
             }
             
             // If credentials are valid, generate a JWT
             const secretKey=f_for_secret();
             req.session.secretKey=secretKey;
             const expirationTimestamp=Date.now()+60*60*1000;//(h,m,s,mi)
             const token = jwt.sign({ userId: user._id, email: user.email,exp:expirationTimestamp },secretKey);
              
             // Store token in user session
              req.session.token = token;
                
             // Send the JWT back to the client
              res.status(200).json({ token });
          
          } catch (error) {
             console.error("Login Error:", error);
            res.status(500).json({ error: "Login failed" });
          }
         
        });

module.exports=router;