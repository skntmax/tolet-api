const detaisSchema = require('./detailSchema')
module.exports ={


    userDetail:
     
                        {
                            username:{
                                type:String 
                        } ,
                        name:{
                                type:String  
                        } ,
                        email : {
                                type:String ,
                                required:true
                        },
                        createdOn:{ 
                                type:String 
                        } ,
                        mobile:{ 
                                type:Number ,
                        } ,
                            
                        password: {
                            type:String  
                        } ,
                        jwt:{
                            type:String                                   
                        }
                } 
    ,
        contactModel:{
                                phone:{
                                    type:Number 
                                },
                                address:{
                                    type :String 
                                } ,
                                pincode :{ 
                                    type :String 
                                }
                            
                        } 
          , 
    
                authoritysModel :{
                    usrname:{
                        type:String 
                },
                status:{
                        type :Boolean 
                } 


                }
          ,
           

          genderModel :{
               male:{
                   type:Boolean
               },
              female:{
                type:Boolean                   
              }  
          },

          typeModel:{
            single:{
                type:String ,
                details:[
                    detaisSchema.single
                ]
            },
           double:{
             type:String    ,
             details:[
                detaisSchema.double
            ]           
           } ,
           bachelors:{
             type:String ,
             details:[
                detaisSchema.bachelors
            ]                  
           } ,
            
          }
    
        } 
    

    
    

   



