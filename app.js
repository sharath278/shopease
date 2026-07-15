const mongoose = require("mongoose");
const express = require("express");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const Locals = require("./middleware/locals");
const path = require('path');
const app = express();
const passport = require("passport");
const passportLocal = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/user");
const Product = require("./models/products");
const Cart = require("./models/cart");
const Order = require("./models/order");
const users = require("./routes/users");
const products = require("./routes/products");
const orders = require("./routes/orders");
const cart = require("./routes/cart");
const errorHandler = require("./middleware/error");


app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);

const sessionOptions = {
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true
}
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session())

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



main()
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
}

app.use(Locals);





app.get("/", (req, res) => {
    res.render('./home.ejs');
})





app.use("/", users);
app.use("/", products);
app.use("/", cart);
app.use("/",orders);

app.use(errorHandler);






app.get("/test", (req, res) => {

    req.flash("success", "welcome to home page");
    res.redirect("/");
})





app.listen(8080, () => {
    console.log("server is listening..");
})



