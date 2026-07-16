const Order = require("../models/order");

const adminPage = (req,res)=>{
    res.render("./admin/index.ejs");
};


const showorders =  async (req, res) => {
    const orders = await Order.find()
        .populate("user")
        .populate("items.product");

    res.render("./admin/orders.ejs", { orders });
};

const showOrder = async(req,res)=>{
    const {id} = req.params;
    const order = await Order.findById(id).populate("user").populate("items.product");
    res.render("./admin/view.ejs",{order});
};


const updateStatus = async (req,res)=>{
    const {id} = req.params;
     await Order.findByIdAndUpdate(id,
        {status : req.body.status}
     );
     req.flash("success","order status updated successfully");
     res.redirect(`/admin/orders/${id}`);
};



module.exports = {adminPage,showorders,showOrder,updateStatus};