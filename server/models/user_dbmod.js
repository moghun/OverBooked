const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    name: { type: String, required: false },
    surname: { type: String, required: false },
   
    fav_products: {type: Array, required: false},
    cart: {type: Array, required: false},
    orders: {type: Array, required: false},
    
    

    hasStore: {
      type: Boolean,
      default: false,
    },
    
    store_name: { type: String, required: false },
    rating: {type: Number, required: false},
    current_products: {type: Array, required: false},
    sold_products: {type: Array, required: false},
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
