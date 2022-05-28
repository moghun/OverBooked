let client = require("@sendgrid/mail");
client.setApiKey(process.env.SENDGRID_API_KEY);

const Order = require("../models/order_dbmod");
const Product = require("../models/product_dbmod");
const {
  verifyToken,
  verifyTokenAndUser,
  verifyTokenOrManager,
  verifyTokenAndManager,
  verifyTokenAndProductManager,
  verifyTokenAndSalesManager,
} = require("./verifyToken");

const router = require("express").Router();

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  const weight = product.amount - quantity;
  if (weight >= 0) {
    product.amount -= quantity;
  }

  await product.save({ validateBeforeSave: false });
}

async function reduceAmount(idArray, amountArray) {
  for (let i = 0; i < idArray.length; i++) {
    const id = idArray[i];
    const reduceAmount = amountArray[i];

    await updateStock(id, reduceAmount);
  }
}

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    const bookArray = savedOrder.bought_products;
    const amountArray = savedOrder.amounts;

    reduceAmount(bookArray, amountArray);

    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndUser, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndUser, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL

router.get("/", verifyTokenAndManager, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/find/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ buyer_email: req.query.buyer_email });
    console.log(req.query.buyer_email);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//SEND RECEPIT
router.post("/sendRecepit", verifyToken, async (req, res) => {
  try {
    client
      .send({
        to: {
          email: req.body.email,
          name: req.body.username,
        },
        from: {
          email: "overbookedstore1@gmail.com",
          name: "overbooked",
        },
        templateId: "d-9eeb7db78dff4ac384f3d2bf511cdf1a",
        dynamicTemplateData: {
          invoice_id: req.body.invoice_id,
          username: req.body.username,
          name: req.body.username,
          surname: req.body.username,
          email: req.body.email,
          cost: req.body.cost,
          products: req.body.products,
        },
      })
      .then();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
