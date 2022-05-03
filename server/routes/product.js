const Product = require("../models/product_dbmod");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
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

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
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
    let products_author;
    let products_cat;
//  let products_subcat;

    products = await Product.find(
      {
        name: {
          $regex: new RegExp(q, 'i')
        }
      }
    );

    products_author = await Product.find(
      {
        author: {
          $regex: new RegExp(q, 'i')
        }
      }
    );

    products_cat = await Product.find(
      {
        category: {
          $regex: new RegExp(q, 'i')
        }
      }
    );

    //Subcategory search -- needs sophisticated query since it requires to search with regex
   /*
    products_subcat = await Product.aggregate(
      {
        $match: {
          "subcategories": 
          { 
            $regex: new RegExp(q, 'i')
          }
        }
      }
    );*/
    
    products = products.concat(products_author);
    products = products.concat(products_cat);
//  products = products.concat(products_subcat);

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET ALL PRODUCTS
//DEFINE FILTER W/ SPECIFIC QUERY TYPE
router.get("/", async (req, res) => {
  const qTop = req.query.top;
  const qSale = (req.query.sale === "true");
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
        }
      
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

module.exports = router;