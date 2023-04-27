const mongoose=require('mongoose')
const bannerSchema=mongoose.Schema({
    images:{
        type:String,
        required:true
    },
    heading:{
        type:String,
        required:true
    },
 
})
module.exports=mongoose.model('bannercollection',bannerSchema)