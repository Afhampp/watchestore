const bannerdb=require("../model/bannermodel")



const getbannertable=async(req,res)=>{
    try{
       
            const getbanner= await bannerdb.find()
            if(getbanner){
                res.render('admin/adminbanner',{adminheadlink:true,adminheader:true,getbanner,adminfooter:true})            
            }
        
        
    }
    catch(error){
        console.log(error);
        res.render("error");
    }
}
const geteditbanner=async(req,res)=>{
    try{
        const id=req.query.id
        const findedit=await bannerdb.findOne({_id:id})
        res.render('admin/editbanner',{adminheadlink:true,adminheader:true,findedit,adminfooter:true}) 
        }
    catch(error){
        console.log(error);
        res.render("error");
    }
}
const posteditbanner=async(req,res)=>{
    try{
        console.log(req.file,req.body.heading)
          if(req.file) {
            await bannerdb.findOneAndUpdate({_id:req.query.id},{$set:{heading:req.body.heading,images:req.file.filename}})
        res.redirect('/admin/getbannerpage')  
          }
          else{
            await bannerdb.findOneAndUpdate({_id:req.query.id},{$set:{heading:req.body.heading}})
        res.redirect('/admin/getbannerpage') 
          }
              
        
        
        
    }
    catch(error){
        console.log(error);
        res.render("error");
    }
}



const getaddbanner=async(req,res)=>{
    try{
       
          
     res.render('admin/banneradd',{adminheadlink:true,adminheader:true,gadminfooter:true})            
        
        
        
    }
    catch(error){
        console.log(error);
        res.render("error");
    }
}
const postaddbanner=async(req,res)=>{
    try{
        data={
            heading:req.body.heading,images:req.file.filename
        }
        await bannerdb.insertMany([data])
        res.redirect('/admin/getbannerpage')
        
        
    }
    catch(error){
        console.log(error);
        res.render("error");
    }
}

module.exports={
    getbannertable,
    getaddbanner,
    geteditbanner,
    postaddbanner,
    posteditbanner
}