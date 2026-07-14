const Product = require("../models/products");
const Cart = require("../models/cart");


const addtocart = async (req, res) => {
    const eproduct = await Product.findById(req.params.id);
    if (eproduct.seller.equals(req.user._id)) {
        req.flash("error", "You cannot add your own product to the cart.");
        return res.redirect(`/products/${product._id}`);
    }
    const cart = await Cart.findOne({ user: req.user._id });
    if(!cart){
        const newCart = new Cart({
            user : req.user._id,
            items :[
                {  
                product : eproduct._id,
                quantity : 1,
                }
            ]
        });
         await newCart.save();
    }
    else{
        const item = cart.items.find((item)=>{
           return  item.product.equals(eproduct._id);
        });
        if(item){
           item.quantity++;
        }
        else{
            cart.items.push({
                
                    product:eproduct._id,
                    quantity : 1,
                
            })
        }
        await cart.save();
    }
     req.flash("success","Product Added Successfully");
    res.redirect("/products");
}


const showcart = async (req,res)=>{
    const curruser = req.user._id;
    const cart = await Cart.findOne({user : curruser}).populate("items.product");
    res.render("./cart/view.ejs",{cart});  
}




const increaseQuantity = async (req,res)=>{
    const {productid} = req.params;
     const cart = await Cart.findOne({user : req.user._id});
     const item = await cart.items.find((item)=>{
        return item.product.equals(productid);
     });
     item.quantity++;
     await cart.save();
    res.redirect("/cart");
};



const decreaseQuantity =  async (req, res) => {
    const { productid } = req.params;

    const cart = await Cart.findOne({
        user: req.user._id,
    });

    const item = cart.items.find((item) => {
        return item.product.equals(productid);
    });

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart.items = cart.items.filter((item) => {
            return !item.product.equals(productid);
        });
    }

    await cart.save();
    res.redirect("/cart");
};


const removeItem = async (req,res)=>{
    let {productid} = req.params;
    let cart = await Cart.findOne({user : req.user._id});
     cart.items = cart.items.filter((item) => {
            return !item.product.equals(productid);
        });
       await cart.save();
    res.redirect("/cart");
};


module.exports = { addtocart ,showcart,increaseQuantity,decreaseQuantity,removeItem};
