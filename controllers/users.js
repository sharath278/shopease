const User = require("../models/user");

const signupForm = (req,res)=>{
    res.render("./users/signup");
}


const signup = async (req,res)=>{
    const newuser = new User({
        username : req.body.username,
        email : req.body.email,
    })
     const data = await User.register(newuser,req.body.password);
     req.login(newuser,(err)=>{
        if(err){
            next(err);
        }
           req.flash("success","welcome to the ShopEase");
          res.redirect("/");
     })
   
}

const loginForm = (req,res)=>{
    res.render("./users/login");
}


const login = (req,res)=>{
     res.redirect("/");
}

const logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","user logout successfully");
        res.redirect("/");
    })
}

module.exports = {signupForm,signup,loginForm,login,logout}



