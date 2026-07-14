
const locals = (req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.failureMsg = req.flash("error");
    res.locals.loginuser = req.user;
    next();
}

module.exports = locals;