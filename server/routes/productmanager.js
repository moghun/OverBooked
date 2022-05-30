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



//CHANGE THE ORDER STATUS

router.post("/changestatus", verifyTokenAndProductManager, async (req, res) => {
    const o_id = req.body.oid;
    const gstatus = req.body.status;


    try{
        const order = await Order.findById(o_id);
        if(!order){
            return res.status(400).json("There is no order with given ID!");
        }
        order.status = gstatus;
        await order.save();
        return res.status(200).json("Order status saved.");
    } catch (err){
        return res.status(500).json(err);
    }

  });


//CHANGE STOCK

router.post("/changestock",verifyTokenAndProductManager, async(req,res) => {
    const p_id = req.body.product_id;
    const stock = req.body.stock;

    try{
        const product = await Product.findById(p_id);

        if(!product){
            return res.status(400).json("There is no product with given ID!");
        }

        if(!parseInt(stock) || stock < 0)
        {   
            return res.status(400).json("Stock is not integer!");
        }

        product.amount = stock;
        await product.save();
        return res.status(200).json("Stock is updated!");

    }catch(err){
        return res.status(500).json(err);
    }


});

//GET INVOICES
router.get("/getinvoices",verifyTokenAndProductManager,async(req,res)=>{
    try{
        const invoices = await User.find(
            {$nor: [
                {invoices: {$exists: false}},
                {invoices: {$size: 0}},
            ]}
        );        
        return res.status(200).json(invoices);
    } catch (err){
        return res.status(500).json(err);
    }
    
});

//ON DELIVERY
router.get("/ondeliveries",verifyTokenAndProductManager,async(req,res)=>{
    try{
        const orders = await Order.find(
           {status : "Tranship"}
        );
        return res.status(200).json(orders);
    }catch(err){
        return res.status(500).json(err);
    }

});

module.exports = router;