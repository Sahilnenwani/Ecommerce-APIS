const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const { verifyJWT, authRole } = require("../Middlewares/verifyJWT");
const cartDocument = require("../Models/cartSchema");
// const verifyAuthorization=require("../Middlewares/verifyAuthorization")
// const bcrypt = require("bcryptjs");

// Create
router.post("/create", verifyJWT, async (req, res) => {
  const newCart = new cartDocument(req.body);
  try {
    const cartData = await newCart.save();
    res.status(200).json(cartData);
  } catch (error) {
    res.sendStatus(500);
    console.log("error in the create cart route", error);
  }
});

// update
router.put("/:id", verifyJWT, async (req, res) => {
  try {
    const updatedCart = await cartDocument.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.sendStatus(500);
    console.log("error in the update cart route", error);
  }
});

// Delete Product
router.delete("/:id", verifyJWT, async (req, res) => {
  try {
    await cartDocument.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "This cart is deleted",
    });
  } catch (error) {
    res.sendStatus(500);
    console.log("error in the delete cart route", error);
  }
});

//get user cart

router.get("/:userId", verifyJWT, async (req, res) => {
  try {
    const cart = await cartDocument.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (error) {
    res.sendStatus(500);
    console.log("error in the get user cart  route", error);
  }
});

//  Get all carts
router.get(
  "/",
  verifyJWT,
  authRole((role = "admin")),
  async (req, res) => {
    try {
      const cartsData = await cartDocument.find();
      res.status(200).json(cartsData);
    } catch (error) {
      res.sendStatus(500);
      console.log("error in the get all users cart route", error);
    }
  }
);

module.exports = router;
