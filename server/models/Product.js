const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    src: { type: String, required: true },
    price: { type: Number, required: true },
    content: { type: String, required: true },
    count: { type: Number, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productsSchema);
