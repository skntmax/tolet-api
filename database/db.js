require('dotenv').config()
const schema = require('./../Schemas/schema')
const model = require('./../Models/models' )
const mongoose = require('mongoose')
const detaisSchema = require('./../Schemas/detailSchema')

 
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

     
 const genderModel= 
     mongoose.model( model.gender , schema.genderModel)

const typeSingles= 
     mongoose.model( model.type.single, detaisSchema.single)

     const typeDoubles= 
     mongoose.model( model.type.double, detaisSchema.double)

     const typebachelors= 
     mongoose.model( model.type.bachelor, detaisSchema.bachelors)


const allModels = {
     usersDetails , authoritysModel , 
     contactsModel , genderModel , typeSingles , typeDoubles ,typebachelors 
}       





      
module.exports =   allModels