const User = require("../models/user_dbmod");
const Product = require("../models/product_dbmod");
let client = require("@sendgrid/mail");
client.setApiKey(process.env.SENDGRID_API_KEY);
const CryptoJS = require("crypto-js");

const {
  verifyToken,
  verifyTokenAndUser,
  verifyTokenOrManager,
  verifyTokenAndManager,
  verifyTokenAndProductManager,
  verifyTokenAndSalesManager,
} = require("./verifyToken");

const router = require("express").Router();

//UPDATE
router.put("/:id", verifyTokenAndUser, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndUser, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.get("/find/:id", verifyTokenOrManager, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
router.get("/", verifyTokenAndManager, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//ADD TO CART
router.put("/addToCart/:id", verifyToken, async (req, res) => {
  try {
    let product_update = { product_id: req.body.product_id };
    await User.findByIdAndUpdate(req.params.id, {
      $pull: { cart: product_update },
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $push: { cart: req.body },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Remove From Cart
router.put("/removeFromCart/:id", verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { cart: req.body },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Clear CART
router.put("/clearCart/:id", verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: { cart: [] },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//ADD TO Wishlist
router.put("/addToWishlist/:id", verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $push: { wishlist: req.body },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Remove From Wishlist
router.put("/removeFromWishlist/:id", verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { wishlist: req.body },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Clear Wishlist
router.put("/clearWishlist/:id", verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: { wishlist: [] },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER STATS

router.get("/stats", verifyTokenAndManager, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE INVOICE
router.put("/invoice/:id", verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $push: { invoices: req.body },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USERNAME
router.get("/getUsername/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { username, ...others } = user._doc;
    res.status(200).json(username);
  } catch (err) {
    res.status(500).json(err);
  }
});

//NOTIFY USERS FOR SALE
router.get(
  "/saleNotification/:pid",
  verifyTokenAndSalesManager,
  async (req, res) => {
    let inUsers = [];
    let product = {};
    try {
      inUsers = await User.find({
        wishlist: { $elemMatch: { product_id: req.params.pid } },
      });
    } catch (err) {
      res.status(500).json(err);
    }

    try {
      product = await Product.findById(req.params.pid);
    } catch (err) {
      res.status(500).json(err);
    }

    try {
      let p = product.cost / product.before_sale_price;
      let perc = 1 - p;
      inUsers.forEach((user) => {
        client
          .send({
            to: {
              email: user.email,
              name: user.username,
            },
            from: {
              email: "overbookedstore00@gmail.com",
              name: "overbooked",
            },
            templateId: "d-e2a7e2a4fe23416f8f478302a944e4fe",
            dynamicTemplateData: {
              name: product.name,
              before_sale_price: product.before_sale_price,
              cost: product.cost,
              perc: Math.ceil(perc * 100),
            },
          })
          .then();
      });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get("/getInvoices", verifyTokenAndSalesManager, async (req, res) => {
  try {
    const users = await User.find(
      {
        $nor: [{ invoices: { $exists: false } }, { invoices: { $size: 0 } }],
      },
      { invoices: 1 }
    );
    let inv = [];
    users.forEach((us) => {
      if (us.invoices.length !== 0) {
        us.invoices.forEach((i) => {
          inv.push(i);
        });
      }
    });

    res.status(200).json(inv);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getInvoice/:iid", verifyTokenAndSalesManager, async (req, res) => {
  try {
    const users = await User.find({
      invoices: { $elemMatch: { invoice_id: req.params.iid } },
    });

    var invoice = {};

    users[0].invoices.forEach((inv) => {
      if (inv.invoice_id === req.params.iid) {
        invoice = inv;
      }
    });
    res.status(200).json(invoice);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
