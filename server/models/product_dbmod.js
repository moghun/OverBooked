const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    cost: { type: Number, required: false },
    amount: { type: Number, required: false },
    publisher: { type: String, required: false },
    img: { type: String, required: false, default: "" },
    description: { type: String, required: false, default: "" },
    warranty: { type: Number, required: false, default: -1 },
    author: { type: String, required: false },

    category: { type: String, required: false },
    subcategories: { type: Array, required: false },

    sale: { type: Boolean, required: false, default: false },
    before_sale_price: { type: Number, required: false, default: -1 },
    rating: { type: Array, required: false, default: [] },
    comments: { type: Array, required: false, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productsSchema);
