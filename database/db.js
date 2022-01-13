require('dotenv').config()
const schema = require('./../Schemas/schema')
const model = require('./../Models/models' )
const mongoose = require('mongoose')
 
mongoose.connect(`mongodb://localhost:27017/${process.env.DATABASE_NAME}` , {
     useNewUrlParser:true , 
     useUnifiedTopology: true    
}).then(res=>{
     console.log(`${process.env.DATABASE_NAME} database connected `);
}).catch(err=>{ 
    console.log("Err :" , err);
})

const usersDetails = 
      mongoose.model( model.usersDetail , schema.userDetail)
 
const contactsModel = 
      mongoose.model(model.contact , schema.contactModel)

const authoritysModel = 
 
     mongoose.model( model.authority , schema.authoritysModel)
     const allModels = {
          usersDetails , authoritysModel , contactsModel
     } 
      
module.exports =   allModels