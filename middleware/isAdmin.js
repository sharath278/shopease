const isAdmin =  (req,res,next)=>{
    if(req.user.role === "admin"){
       return  next();
    }
    req.flash("error","you dont have permission to perform this action");
    res.redirect("/products");
}
module.exports = isAdmin;