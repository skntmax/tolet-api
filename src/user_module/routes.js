const router= require('express').Router()
const { Router } = require('express')
const e = require('express')
const express= require('express')
const { model } = require('mongoose')
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken')
const models = require('./../../database/db') 
router.use(express.json())
router.use(model)

router.post('/signup' ,async (req,res)=>{
     const {name , email , password , mobile  } =req.body 
     
     
    if(name && email && password && mobile){
          
     const result = await models.usersDetails.find({ email : email })
     
       if(result.length==0){
               const hashPass = await bcrypt.hash(password , 10)
                  const data = new models.usersDetails({
                    username:name+Math.floor(Math.random()*100000) , 
                    email:email ,
                     password:hashPass ,
                      mobile : mobile
                  })
                  const savedUser =  await data.save()
                  if(await data.save()){
                    res.send({status:1 ,data :savedUser , message :"user registred succesfully " , })
                  }
                  else{
             res.send({status:0 , message :"Some error occured while registering user "})
                        
                  }
       }
       else{
             res.send({status:0 , message :"user is already registered "})
       }
          }    
})

router.post('/login' , async (req,res)=>{
     const {email , password , username} = req.body
     if(email && password){
          const result = await models.usersDetails.find({ email : email })
         if(result.length!=0){
            const ismatch = await bcrypt.compare(password,result[0].password)
             if(ismatch){
                  const token  = jwt.sign({_id:result[0]._id} , process.env.JWT_KEY)
                  const filter = { _id: result[0]._id };
                  const update = { jwt:token };
                  let updatedToken = await models.usersDetails.findOneAndUpdate(filter, update);
               const updatedResult = await models.usersDetails.find({ email : email })
                  
                  res.send({
                         status:1 , result:updatedResult , message:"logged in succesfully "
                   })                                
                  
             } else{
               res.send({status:0 , message :"Invalid credentials "})

             }




         }
         else{
             res.send({status:0 , message :"user is not registred please sign up first "})
               
         }

     }

})


module.exports = router