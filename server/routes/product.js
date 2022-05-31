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

//CREATE

router.post("/", verifyTokenAndProductManager, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndProductManager, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//COMMENT ON PRODUCT
router.put("/comment/:id", verifyToken, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: req.body },
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//RATE PRODUCT
router.put("/rate/:id", verifyToken, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $push: { rating: req.body },
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET COMMENTS OF ITEMS THAT HAVE ONE OR MORE COMMENTS
router.get(
  "/commentApproval",
  verifyTokenAndProductManager,
  async (req, res) => {
    try {
      const products = await Product.find({
        $nor: [{ comments: { $exists: false } }, { comments: { $size: 0 } }],
      });

      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//APPROVE COMMENT
router.put(
  "/commentApproval/:id/:cno",
  verifyTokenAndProductManager,
  async (req, res) => {
    try {
      let comment_update = { comment_id: req.params.cno };
      await Product.findByIdAndUpdate(req.params.id, {
        $pull: { comments: comment_update },
      });

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $push: { comments: req.body },
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//DISAPPROVE COMMENT
router.put(
  "/commentApproval/delete/:id/:cno",
  verifyTokenAndProductManager,
  async (req, res) => {
    try {
      let comment_update = { comment_id: req.params.cno };
      await Product.findByIdAndUpdate(req.params.id, {
        $pull: { comments: comment_update },
      });
      res.status(200).json("Comment is disapproved");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//DELETE
router.delete("/:id", verifyTokenAndProductManager, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET SEARCHED WORD - SEARCH BAR FUNCTIONALITY
router.get("/find", async (req, res) => {
  const q = req.query.q;
  try {
    let products;
    let products_name;
    let products_author;
    let products_pub;
    let products_cat;
    let products_subcat;
    let products_description;

    products_name = await Product.find({
      name: {
        $regex: new RegExp(q, "i"),
      },
    });

    products_author = await Product.find({
      author: {
        $regex: new RegExp(q, "i"),
      },
    });

    products_pub = await Product.find({
      publisher: {
        $regex: new RegExp(q, "i"),
      },
    });

    products_cat = await Product.find({
      category: {
        $regex: new RegExp(q, "i"),
      },
    });

    products_subcat = await Product.find({
      subcategories: {
        $regex: new RegExp(q, "i"),
      },
    });

    products_description = await Product.find({
      description: {
        $regex: new RegExp(q, "i"),
      },
    });

    function removeDuplicates(arrayIn) {
      var dict = {};

      for (var a = 0; a < arrayIn.length; a++) {
        var pid = arrayIn[a]._id;
        dict[pid] = 0;
      }

      var arrayOut = [];
      for (var a = 0; a < arrayIn.length; a++) {
        if (dict[arrayIn[a]._id] == 0) {
          arrayOut.push(arrayIn[a]);
          dict[arrayIn[a]._id] = 1;
        }
      }
      return arrayOut;
    }

    products = products_name.concat(products_author);
    products = products.concat(products_pub);
    products = products.concat(products_cat);
    products = products.concat(products_subcat);
    products = products.concat(products_description);

    products = removeDuplicates(products);

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
//DEFINE FILTER W/ SPECIFIC QUERY TYPE
router.get("/", async (req, res) => {
  const qTop = req.query.top;
  const qSale = req.query.sale === "true";
  const qCategory = req.query.category;
  const qSubCategory = req.query.subcategory;
  try {
    let products;

    if (qTop) {
      products = await Product.find().sort({ createdAt: -1 }).limit(10);
    } else if (qSale) {
      products = await Product.find({
        sale: {
          $eq: qSale,
        },
      });
    } else if (qCategory) {
      products = await Product.find({
        category: {
          $in: [qCategory],
        },
      });
    } else if (qSubCategory) {
      products = await Product.find({
        subcategories: {
          $in: [qSubCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//SET SALE
router.put("/setSale/:id", verifyTokenAndSalesManager, async (req, res) => {
  try {
    perc = req.body.perc;
    curr_price = req.body.cost;
    new_price = (curr_price - curr_price * (perc / 100)).toFixed(2);

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          sale: true,
          before_sale_price: curr_price,
          cost: new_price,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//STOP SALE
router.put("/stopSale/:id", verifyTokenAndSalesManager, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          sale: false,
          oldCost: req.body.before_sale_price,
          before_sale_price: -1,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CHANGE COST
router.put("/setCost/:id", verifyTokenAndSalesManager, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          cost: req.body.newCost,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
