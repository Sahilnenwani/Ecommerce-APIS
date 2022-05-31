const express = require("express");
const router = express.Router();
const { verifyJWT, authRole } = require("../Middlewares/verifyJWT");
const productDocument = require("../Models/productSchema");
// const verifyAuthorization=require("../Middlewares/verifyAuthorization")
// const bcrypt = require("bcryptjs");

// Create New product
router.post(
  "/create",
  verifyJWT,
  authRole((role = "admin")),
  async (req, res) => {
    const newProduct = new productDocument(req.body);
    try {
      const product = await newProduct.save();
      res.status(200).json(product);
    } catch (error) {
      res.sendStatus(500);
      console.log("error in the create product route", error);
    }
  }
);

// update the product
router.put("/:id", verifyJWT, authRole((role = "admin")), async (req, res) => {
  try {
    const updatedProduct = await productDocument.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.sendStatus(500);
    console.log("error in the update product route", error);
  }
});

// Delete Product
router.delete(
  "/:id",
  verifyJWT,
  authRole((role = "admin")),
  async (req, res) => {
    try {
      await productDocument.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "This product is deleted",
      });
    } catch (error) {
      res.sendStatus(500);
      console.log("error in the delete product route", error);
    }
  }
);

router.get("/", verifyJWT, async (req, res) => {
  const qNew = req.query.new;
  const qCateg = req.query.category;

  try {
    let product;
    if (qNew) {
      product = await product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCateg) {
      product = await product.find({
        categories: {
          $in: [qCateg],
        },
      });
    } else {
     product =await productDocument.find();
    }
    res.status(200).json(product);
  } catch (error) {
    res.sendStatus(500);
    console.log("error in the get all product route", error);
  }
});

module.exports = router;
