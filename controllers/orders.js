
const Cart = require("../models/cart");
const Order = require("../models/order");

const checkoutOrder =  async (req, res) => {
    const cart = await Cart.findOne({
        user: req.user._id,
    }).populate("items.product");

    // 1. Check if cart is empty
    if (!cart || cart.items.length === 0) {
        req.flash("error", "No items in cart to order.");
        return res.redirect("/cart");
    }

    // 2. Check stock availability
    for (let item of cart.items) {
        if (item.product.stock < item.quantity) {
            req.flash(
                "error",
                `${item.product.title} has only ${item.product.stock} item(s) left in stock.`
            );
            return res.redirect("/cart");
        }
    }

    // 3. Create order
    const newOrder = new Order({
        user: req.user._id,
        items: [],
        totalAmount: 0,
    });

    let totalAmount = 0;

    // 4. Copy cart items to order & calculate total
    for (let item of cart.items) {
        newOrder.items.push({
            product: item.product._id,
            quantity: item.quantity,
            priceAtPurchase: item.product.price,
        });

        totalAmount += item.product.price * item.quantity;
    }

    newOrder.totalAmount = totalAmount;

    // 5. Reduce stock
    for (let item of cart.items) {
        item.product.stock -= item.quantity;
        await item.product.save();
    }

    // 6. Save order
    await newOrder.save();

    // 7. Clear cart
    cart.items = [];
    await cart.save();

    // 8. Success
    req.flash("success", "Order placed successfully.");
    res.redirect("/orders");
};


 const getallOrders = async (req,res)=>{
    const orders = await Order.find({user : req.user._id}).populate("items.product");
    res.render("./orders/index.ejs",{orders});
};

 const getOrder =  async (req,res)=>{
    const {id} = req.params;
   const order = await Order.findOne({
    _id: id,
    user: req.user._id,
 }).populate("items.product");
    res.render("./orders/view.ejs",{order});
};


module.exports = {checkoutOrder,getallOrders,getOrder};