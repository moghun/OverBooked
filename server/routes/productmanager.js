const Product = require("../models/product_dbmod");
const {
  verifyToken,
  verifyTokenAndUser,
  verifyTokenOrManager,
  verifyTokenAndManager,
  verifyTokenAndProductManager,  
} = require("./verifyToken");
const Order = require("../models/order_dbmod");
const router = require("express").Router();



//CHANGE THE ORDER STATUS

router.post("/changestatus", verifyTokenAndProductManager, async (req, res) => {
    const o_id = req.body.oid;
    const gstatus = req.body.status;



    try{
        const order = await Order.findById(o_id);
        if(!order){
            return res.status(401).json("There is no order with given ID!");
        }
        order.status = gstatus;
        await order.save();
        return res.status(200).json("Order status saved.");
    } catch (err){
        return res.status(500).json(err);
    }




  });

  module.exports = router;