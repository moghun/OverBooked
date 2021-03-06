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

async function increaseStock(id, quantity) {
  const product = await Product.findById(id);

  const weight = product.amount - quantity;
  if (weight >= 0) {
    product.amount += quantity;
  }

  await product.save({ validateBeforeSave: false });
}

async function increaseAmount(idArray, amountArray) {
  for (let i = 0; i < idArray.length; i++) {
    const id = idArray[i];
    const increaseAmount = amountArray[i];

    await increaseStock(id, increaseAmount);
  }
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
router.put("/:id", verifyTokenOrManager, async (req, res) => {
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
router.delete("/delete/:id/:oid", verifyTokenOrManager, async (req, res) => {
  try {
    const deleteOrder = await Order.find({ _id: req.params.oid });
    const books = deleteOrder[0].bought_products;
    const amounts = deleteOrder[0].amounts;

    increaseAmount(books, amounts);
    await Order.findByIdAndDelete(req.params.oid);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//CANCEL
router.put("/cancel/:id/:oid", verifyTokenOrManager, async (req, res) => {
  try {
    const deleteOrder = await Order.find({ _id: req.params.oid });
    const books = deleteOrder[0].bought_products;
    const amounts = deleteOrder[0].amounts;

    increaseAmount(books, amounts);
    const updatedOrder = await Order.findByIdAndUpdate(req.params.oid, {
      $set: {
        status: "Cancelled",
      },
    });
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//RETURN REQUEST
router.put("/requestReturn/:id/:oid", verifyToken, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.oid, {
      $set: {
        status: "Return Requested",
        refundDescription: req.body.refundDescription,
      },
    });
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//RETURN APPROVE
router.put(
  "/approveReturn/:id/:oid",
  verifyTokenAndSalesManager,
  async (req, res) => {
    try {
      const deleteOrder = await Order.find({ _id: req.params.oid });
      const books = deleteOrder[0].bought_products;
      const amounts = deleteOrder[0].amounts;
      increaseAmount(books, amounts);
      const updatedOrder = await Order.findByIdAndUpdate(req.params.oid, {
        $set: {
          status: "Returned",
        },
      });

      client
        .send({
          to: {
            email: deleteOrder[0].buyer_email,
            name: "Customer",
          },
          from: {
            email: "overbookedstore00@gmail.com",
            name: "overbooked",
          },
          templateId: "d-bbc41b8a0b8546b89262224c1e55cc4f",
          dynamicTemplateData: {
            order_id: deleteOrder[0]._id,
            cost: deleteOrder[0].cost,
            card_no: deleteOrder[0].last_four_digit,
          },
        })
        .then();
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//RETURN REJECTE
router.put(
  "/rejectReturn/:id/:oid",
  verifyTokenAndSalesManager,
  async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(req.params.oid, {
        $set: {
          status: "Return Rejected",
        },
      });
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

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
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS MOBILE
router.get("/findM/:email", async (req, res) => {
  try {
    const orders = await Order.find({ buyer_email: req.params.email });
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
          email: "overbookedstore00@gmail.com",
          name: "overbooked",
        },
        templateId: "d-17e49c96ede848c79d9372746ec7f22f",
        dynamicTemplateData: {
          invoice_id: req.body.invoice_id,
          username: req.body.username,
          email: req.body.email,
          cost: req.body.cost,
          products: req.body.products,
          tax_id: req.body.tax_id,
          card_no: req.body.card_no,
        },
      })
      .then();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
