const router= require('express').Router()
const express= require('express')
router.use(express.json())

router.post('/signup' , (req,res)=>{
     const {name , email , password  } =req.body 
     if(name && email && password){



        
     }
      
})

module.exports = router