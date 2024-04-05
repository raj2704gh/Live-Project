const express=require("express");
const {projectDetailSchema}=require("./validation");
const ExpressError=require("./utils/ExpressError")
const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
module.exports.verifyToken=(req, res, next)=>{

  // Extract the JWT token from the request headers
  const token= req.headers.authorization.replace("Bearer ", "");

  // Check if token exists
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }
   
  // Verify the token's authenticity using the secret key
    jwt.verify(token, req.session.secretKey, (err, decoded) => {

      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }

    // You can access the decoded payload here (e.g., user ID, email)
      const { exp, userId } = decoded;
    
      if (Date.now() >= exp ) {
        return res.status(401).json({ error: 'Token expired' });
      }
      req.user = decoded; // Add decoded token payload to the request object for further processing
     
      next(); // Proceed to the next middleware or route handler
  });
}



module.exports.validateListing=(req,res,next)=>{
  let {demo}=req.body;
  demo=JSON.parse(demo);
  const {error}=projectDetailSchema.validate(demo);
  if(error){
      let errMsg=error.details.map((el)=>el.message).join(",");
      throw new ExpressError(404,errMsg);
  }else{
      next();
  }
}







