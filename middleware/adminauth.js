const islogout=(req,res,next)=>{
    try{
        if(req.session.admin_id){
            
            res.redirect('/admin/home')
            
        }else{
        
        next()
    }
}
    catch(error){
        console.log(error);
    }
}
module.exports={islogout}