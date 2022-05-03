const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    product_id: { type: Number, required: true },
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    amount: { type: Number, required: true },
    publisher: { type: String, required: true },
    img: { type: String, required: false , default: ""},
    description: { type: String, required: true},
    warranty: { type: Number, required: false, default: -1},
    author: { type: String, required: true },

    category: { type: String, required: true },
    subcategories: { type: Array, required: false },

    sale: { type: Boolean, required: false,  default: false},
    after_sale_price: { type: Number, required: false, default: -1},
    rating: { type: Number, required: false, default: -1},
    comments: { type: Array, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productsSchema);
