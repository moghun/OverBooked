const Product = require("../models/product_dbmod");
const Order = require("../models/order_dbmod");
const User = require("../models/user_dbmod");
const {
  verifyToken,
  verifyTokenAndUser,
  verifyTokenOrManager,
  verifyTokenAndManager,
  verifyTokenAndProductManager,  
} = require("./verifyToken");

const router = require("express").Router();


//GET INVOICE BETWEEN THE DATES
router.get("/betweendates", async (req, res) => {
    try {
        const start_date = req.body.start_date;
        const end_date = req.body.end_date;

        if(!start_date||!end_date){
            return res.status(403).json("Dates can not be empty!");
        }

        const from = new Date(start_date);
        const to = new Date(end_date);
        
        const orders = Order.find({date:{$gt:from,$lt:to}});

        return res.status(200).json(orders);

    } catch (err) {
      return res.status(500).json(err);
    }
  });

  module.exports = router;