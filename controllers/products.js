const Product = require("../models/products");
const jProductSchema = require("../Schema");
const MyError = require("../utils/error")

const getProducts = async (req,res)=>{
      const allproducts = await Product.find();
      res.render("./products/index.ejs",{allproducts});
}

const newproductForm = (req,res)=>{
   res.render("./products/new.ejs");
};


const addProducts = async(req,res)=>{
   
    const newproduct = new Product({
       title : req.body.title,
       description : req.body.description,
       price : req.body.price,
       image : req.body.image,
       category: req.body.category,
       stock : req.body.stock,
       seller : req.user._id,      
    });
    const data = await newproduct.save();
    req.flash("success","product added Successfully");
    res.redirect("/products");
};


const viewProduct = async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id).populate("seller");
    res.render("./products/view.ejs",{product});
};


const editForm = async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render("./products/edit.ejs",{product});
}

const editProduct = async (req,res)=>{
    const {id} = req.params;
    const editedproduct = await Product.findByIdAndUpdate(
        id,
        {
            title : req.body.title,
            description : req.body.description,
            price : req.body.price,
            image : req.body.image,
            category : req.body.category,
            stock : req.body.stock,
        }
    )
    req.flash("success","product edited Successfully");
    res.redirect(`/products/${id}`)
};


const deleteProduct = async (req,res)=>{
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    req.flash("success","product deleted Successfully");
    res.redirect("/products");
};



module.exports = {getProducts,newproductForm,addProducts,viewProduct,editForm,editProduct,deleteProduct};