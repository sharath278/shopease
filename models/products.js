const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

  image: {
  type: String,
  default: "https://unsplash.com/illustrations/online-shopping-flat-cartoon-style-vector-illustration-zy6NnqPsJ4c",
  set: function (value) {
    return value === ""
      ? "https://unsplash.com/illustrations/online-shopping-flat-cartoon-style-vector-illustration-zy6NnqPsJ4c"
      : value;
  }
},

    category: {
      type: String,
      required: true,
      trim: true,
    },

    stock: {
      type: Number,
      default: 0,
      min : 0,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);