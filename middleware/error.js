module.exports = (err,req,res,next)=>{
    let{status=500,message} = err;
    res.status(status).render("./error.ejs",{message});
    
}