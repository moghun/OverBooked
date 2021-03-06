const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    amount: { type: Number, required: true },
    publisher: { type: String, required: true },
    img: { type: String, required: false, default: "" },
    description: { type: String, required: true, default: "" },
    warranty: { type: Number, required: false, default: -1 },
    author: { type: String, required: true },

    category: { type: String, required: true },
    subcategories: { type: Array, required: false },

    sale: { type: Boolean, required: false, default: false },
    before_sale_price: { type: Number, required: false, default: -1 },
    rating: { type: Array, required: false, default: [] },
    comments: { type: Array, required: false, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productsSchema);
