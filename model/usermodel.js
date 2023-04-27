const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    images:{
        type:String,
        
    },
    address:[{
        firstName:{
            type:String,
         }, 
         LastName:{
            type:String,
         },
         emailaddress:{
            type:String,
         },
        phonenumber:{
            type:Number,
         },
         country:{
            type:String,
         },
         addressn:{
            type:String,
         },
         district:{
            type:String,
         },
         town:{
            type:String,
         },
         state:{
            type:String,
         },
         pincode:{
            type:Number,
         },
        
    }],
    is_admin:{
        type:Number,
    },
    is_verified:{
        type:Number,
        default:0
    },
    is_blocked:{
        type:Boolean,
        default:false
    },
    wallet:{
        type:Number,
        default:0
    },
})
module.exports=mongoose.model('usercollection',userSchema)