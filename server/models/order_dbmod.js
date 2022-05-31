const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    buyer_email: { type: String, required: true },
    status: { type: String, required: true },

    payment_method: { type: String, required: true },
    last_four_digit: {type:Number,required:true},
    cost: { type: Number, required: true },
    date: { type: Date, required: true },

    bought_products: { type: Array, required: true },
    amounts: { type: Array, required: true },

    isRefunded: { type: Boolean, required: true, default: false },
    refundDescription: { type: String, required: false, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
