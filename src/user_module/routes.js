const router= require('express').Router()
const { Router } = require('express')
const constant = require('./../../CONSTANTS')
const express= require('express')
const { model } = require('mongoose')
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken')
const models = require('./../../database/db') 
const authenticate = require('./../../authMiddleware/auth')
var cookieParser = require('cookie-parser');
router.use(cookieParser())


router.use(express.json())
router.use(model)

router.post('/signup' ,async (req,res)=>{
     try{
          const {name , email , password , mobile  } =req.body      
          if(name && email && password && mobile){
           const result = await models.usersDetails.find({ email : email })
             if(result.length==0){
                     const hashPass = await bcrypt.hash(password , 10)
                        const data = new models.usersDetails({
                             name:name , 
                          username:name+Math.floor(Math.random()*100000) , 
                          email:email ,
                           password:hashPass ,
                            mobile : mobile
                        })
                        const savedUser =  await data.save()
                        if(await data.save()){
                          res.send({status:constant.status.success ,data :savedUser , message :"user registred succesfully " , })
                        }
                        else{
                   res.send({status:constant.status.failed , message :"Some error occured while registering user "})
                              
                        }
             }
             else{
                   res.send({status:constant.status.success , message :"user is already registered "})
             }
                }

     } catch(err){
          res.send({status:constant.status.failed , result :err  , message:" some error occured "})

     }
         
})

router.post('/login' , async (req,res)=>{

     try{
          const {email , password , username} = req.body
          if(email && password){
               const result = await models.usersDetails.find({ email : email })
              if(result.length!=0){
                 const ismatch = await bcrypt.compare(password,result[0].password)
                  if(ismatch){
                       const token  = jwt.sign({_id:result[0]._id} , process.env.JWT_KEY)
                       const filter = { _id: result[0]._id };
                       const update = { jwt:token };
                       await models.usersDetails.findOneAndUpdate(filter, update);
                       res.cookie('jwttoken' ,token , {expire : new Date() + 9999} )
                       const updatedResult = await models.usersDetails.find({ email : email }) 
                       res.send({status:constant.status.success , result:updatedResult , message:"logged in succesfully "})                                
                       
                  } else{
                    res.send( {status:constant.status.failed, message :"Invalid credentials "} )   
                 }
     
              }
              else{
                  res.send({status:constant.status.failed , message :"user is not registred please sign up first "})
                    
              }
     
          }

     } catch(err){
          res.send({status:constant.status.failed , result :err  , message:" some error occured "})

     }

})


   // -------------------------------- authnticated routes ---------------------------------------------- 


   router.get('/home' ,authenticate,  (req,res)=>{
      try{
               // console.log("home page  >>> " , req.token , req.currentUser);
                let data = {
                      username : req.currentUser.username ,
                      email:  req.currentUser.email ,
                      mobile:  req.currentUser.mobile 
                }
               res.status(200).send({ 
                    status:constant.status.success , result:data , message:"logged in succesfully "                                 

               }) 
  
      }
      catch(err){
          res.send({status:constant.status.failed , result :err  , message:" Unauthorised user  "})
            
      }

})



   // -------------------------------- authnticated routes ---------------------------------------------- 





module.exports = router