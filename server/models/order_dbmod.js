const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true, unique: true },

    order_id: { type: Number, required: true },
    seller_email: { type: String, required: true },
    buyer_email: { type: String, required: true },

    cost: { type: Number, required: true },
    date: { type: Date, required: true },
    store_name: { type: String, required: true },
    rating: { type: Number, required: false },
    bought_products: { type: Array, required: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productsSchema);