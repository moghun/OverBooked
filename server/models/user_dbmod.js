const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String, required: false, default: "" },
    surname: { type: String, required: false, default: "" },
    adress: { type: String, required: false, default: "" },
    tax_id: { type: String, required: false, default: "" },

    cart: { type: Array, required: false },
    wishlist: { type: Array, required: false },
    orders: { type: Array, required: false },
    invoices: { type: Array, required: false, default: [] },

    user_role: { type: String, required: true, default: "customer" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
