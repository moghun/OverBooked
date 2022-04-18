const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    name: { type: String, required: false },
    surname: { type: String, required: false },
    fav_products: {type: Array, required: false},
    cart: {type: Array, required: false},
    orders: {type: Array, required: false},
    
    hasStore: {
      type: Boolean,
      default: false,
    },
    rating: {type: Number, required: false},
    current_products: {type: Array, required: false},
    sold_products: {type: Array, required: false},
    username: { type: String, required: true },

  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
