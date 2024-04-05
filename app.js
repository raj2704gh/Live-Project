const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const session = require('express-session');

const projectDetailsRouter=require("./routers/add");
const loginRouter=require("./routers/login")
const financialInfoRouter=require("./routers/financialinfo");
const ownerRouter=require("./routers/owner");
const listingRouter=require("./routers/listing");
const registerRouter=require("./routers/register");
const editRouter=require("./routers/edit");
const ownerNameRouter=require("./routers/owner_name");
const deleteRouter=require("./routers/delete");

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Choose the port for your server


 // Configure express-session middleware
 app.use(session({
  secret: 'hello_word', // Change this to a long, random string for security
  resave: false,
  saveUninitialized: false,
  cookie:{
    expires:Date.now()+60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
}
}));


main()
.then(()=>{
    console.log("connection sucssesfuol");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/new_project');
}



app.use("/api/login",loginRouter);
app.use("/api/project-details",projectDetailsRouter);
app.use("/api/ownername",ownerNameRouter);
app.use("/api/financial-info",financialInfoRouter)
app.use("/api/owner",ownerRouter);
app.use("/api/listing",listingRouter);
app.use("/register",registerRouter)
app.use("/api",editRouter);
app.use("/api/delete",deleteRouter);


// let financialData = [];
// // Route to add financial data
// app.post("/add_data",(req,res)=>{
//   let {financierName,financierAddress}=req.body;
//   financialData.push({financierName,financierAddress});
//   return res.status(400).json({ financialData });
// })


// app.post("/submit_data",async(req,res)=>{
//   console.log("hii",req.body);
//   try {
//     console.log(req.headers.authorization);
//     token_without_bearer = req.headers.authorization.replace("Bearer", "")
    
//     //if(token_without_bearer==req.session.token){
        
//     const { type,financialData } = req.body;
//     console.log(financialData)
//      if (!financialData ) {
//          return res.status(400).json({ error: 'Financial data is missing or not an array' });
//      }

//      const financial = new Financial({
//       type:type,
//       financialInfo:financialData
//      });
//      const info=await financial.save();
//      console.log(info.financialInfo.financierName);
      

//      return res.status(200).json({ message: 'Financial information added successfully',"financierName":info.financialInfo.financierName, "financierAddress":info.financialInfo.financierAddress});

//     // }else{
//     //     return res.status(303).json({error:"token is not valid"})
//     // }
// } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Server Error' });
// }

// })

app.use((err,req,res,next)=>{
  let {statusCode=500,message="somthing went wrong"}=err;
  res.status(statusCode).send(message)
})


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});
