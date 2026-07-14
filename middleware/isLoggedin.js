const isLoggedin = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","User must login first");
    res.redirect("/login");
}

module.exports = isLoggedin;