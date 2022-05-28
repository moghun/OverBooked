const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    buyer_email: { type: String, required: true },
    status: { type: String, required: true },

    cost: { type: Number, required: true },
    date: { type: Date, required: true },
    bought_products: { type: Array, required: true},
    amounts: { type: Array, required: true},
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
