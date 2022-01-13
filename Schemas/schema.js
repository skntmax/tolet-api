module.exports ={

    userDetail:
                        {
                            username:{
                                type:String 
                        } ,
                        name:{
                                type:String , 
                                required:true 
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
                                required:true
                        } ,
                            
                        password: {
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
          
    
        } 
    

    
    

   



