const express = require("express");
const router = express.Router();
const { verifyJWT, authRole } = require("../Middlewares/verifyJWT");
const orderDocument = require("../Models/orderSchema");
// const verifyAuthorization=require("../Middlewares/verifyAuthorization")
// const bcrypt = require("bcryptjs");

// Create
router.post("/", verifyJWT, async (req, res) => {
  const newOrder = new orderDocument(req.body);
  try {
    const orderData = await newOrder.save();
    res.status(200).json(orderData);
  } catch (error) {
    res.sendStatus(500);
    console.log("error in the create order route", error);
  }
});

// update
router.put("/:id", verifyJWT, async (req, res) => {
  try {
    const updatedOrder = await orderDocument.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.sendStatus(500);
    console.log("error in the update order route", error);
  }
});

// Delete Product
router.delete("/:id", verifyJWT, async (req, res) => {
  try {
    await orderDocument.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "order is deleted",
    });
  } catch (error) {
    res.sendStatus(500);
    console.log("error in the delete order route", error);
  }
});

//get user cart

router.get("/:userId", verifyJWT, async (req, res) => {
  try {
    const dataOrders=await orderDocument.aggregate([
        {$unwind:{path:"$products"}}
        // {$set:{"productsId":"$productId"}}
    ])
    console.log(".............",dataOrders);

    const order = await orderDocument.find({ userId: req.params.userId }).populate("products.productId");
    res.status(200).json(order);
  } catch (error) {
    res.sendStatus(500);
    console.log("error in the get user orders  route", error);
  }
});

//  Get all carts
router.get(
  "/",
  verifyJWT,
  authRole((role = "admin")),
  async (req, res) => {
    try {
      const orderssData = await orderDocument.find();
      res.status(200).json(orderssData);
    } catch (error) {
      res.sendStatus(500);
      console.log("error in the get all users orders route", error);
    }
  }
);


// router.get("/income",verifyJWT,authRole, async(req,res)=>{

// })



module.exports = router;
