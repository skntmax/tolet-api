const { acceptsCharsets } = require('express/lib/request')
const jwt = require('jsonwebtoken')
const models  = require('./../database/db') 

const authenticate =async (req,res,next)=>{
     
    try{
    
        const cookieToken = req.cookies.jwttoken;
        const varifytoken =  jwt.verify(cookieToken,process.env.JWT_KEY)
         console.log(varifytoken);
         if(varifytoken){
              const rootUser =await  models.usersDetails.findOne({_id:varifytoken._id , jwt:cookieToken})
                if(!rootUser){ throw new Error("user not found ")}
                req.token =cookieToken
                req.currentUser =rootUser
                next();   
         }
          
         else{
        res.status(400).send({message:"User Not found  "})
              
         }
   }
    catch(err){ 
        res.status(401).send({message:"unauthorised user "})

    }

    
}


module.exports = authenticate