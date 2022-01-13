const express = require('express')
const app = express()
const port = 5000|| process.env.port
const multer = require('multer');
const path = require('path')
var FormData = require('form-data');
const bodyParser = require('body-parser')

app.use (
        bodyParser.urlencoded({
        extended: true,
       })
);

const middleware = ( name , title , next ) =>{
     console.log("req >> ", name, " title >> " , title);      
     next()
}
 
const userModel = require('./database/db')
app.use(middleware)
app.use(express.json()) 
app.use( userModel )

const imageStorage = multer.diskStorage({
     // Destination to store image     
     destination: 'images/', 
       filename: (req, file, cb) => {
           cb(null, file.fieldname + '_' + Date.now() 
              + path.extname(file.originalname))
             // file.fieldname is name of the field (image)
             // path.extname get the uploaded file extension
     }
 });


 const videoStorage = multer.diskStorage({
     // Destination to store image     
     destination: 'videos/', 
       filename: (req, file, cb) => {
           cb(null, file.fieldname + '_' + Date.now() 
              + path.extname(file.originalname))
             // file.fieldname is name of the field (image)
             // path.extname get the uploaded file extension
     }
 });
  
 const imageUpload = multer({
     storage: imageStorage,
     limits: {
       fileSize: 1000000 // 1000000 Bytes = 1 MB
     },
     fileFilter(req, file, cb) {
       if (!file.originalname.match(/\.(png|jpg|pdf)$/)) { 
          // upload only png and jpg format
          return cb(new Error(' Please upload image or pdf '))
        }
      cb(undefined, true)
   }
}) 
const videoUpload = multer({
     storage: videoStorage,
     limits: {
       fileSize: 100000000// 1000000 Bytes = 1 MB
     },
     fileFilter(req , file , cb ) {
       if (!file.originalname.match(/\.(mp4|avi|mkv)$/)) { 
          // upload only png and jpg format
          //upload only png file and jpeg file with th extension mp4 , avi and mkv format
          return cb(new Error ( 'Please upload image or pdf'))
        }
      cb(undefined, true)
   }
}) 

app.post('/addFile',imageUpload.array('attchment' , 20 ) , (req , res) => {
     console.log("request files  >>>>>>>>"  ,  req.files )
    res.send({status:true , message : "file with data saved "})  
})

app.post('/addVideoFile',videoUpload.single('video') , (req , res) => {     
     console.log("request files  >>>>>>>>>>>>>>>>>>>>>>> "  ,  req.files )
    res.send({status:true , message : "file with data saved "})  
  })



app.get('/' , (req,res)=>{
    console.log("home page")  
})

app.get('/post' , (req,res)=>{
     res.send("Post page")     
})

app.post('/submitform' , (req,res) =>{
     console.log(" body >>>> ", req.body.name  ,    req.body.title )

     res.send({
           name: req.body.name  , 
           title : req.body.title , 
           status:true
         })

        })

// after previous commit  

app.listen(port,()=>{  
     console.log(`service started at http://localhost:${port}/`);
})
 
