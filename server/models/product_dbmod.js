const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true, unique: true },
    
    product_id: { type: Number, required: true },
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    amount: { type: Number, required: true },
    publisher: { type: String, required: true },
    img: { type: String, required: false },
    description: { type: String, required: false },
    warranty: { type: String, required: false },

    category: { type: String, required: true },
    subcategories: { type: Array, required: false },

    sale: { type: Boolean, required: false,  default: false},
    rating: { type: Number, required: false },
    comments: { type: Array, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productsSchema);
