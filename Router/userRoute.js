const express = require("express");
const router = express.Router();
const { verifyJWT, authRole } = require("../Middlewares/verifyJWT");
const userDocument = require("../Models/userSchema");
// const verifyAuthorization=require("../Middlewares/verifyAuthorization")
const bcrypt = require("bcryptjs");


router.get("/", verifyJWT, authRole(role = "admin"), async (req, res) => {
  const allUsers = await userDocument.find();
  res.json(allUsers);
});

router.put("/update", verifyJWT, async (req, res) => {
  //   const userData = await userDocument.findById(req.params.id);
  //   if (userData.isAdmin) {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }
  try {
    // const updatedUser = await userDocument.findByIdAndUpdate(
    //   req.params.id,
    //   {
    //     $set: req.body,
    //   },
    //   { new: true }
    // );
    // res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500);
    console.log("error in update user", error);
  }
  //   } else {
  //     res
  //       .status(403)
  //       .json("you are not allowed! only Admin is allowed to do changes");
  //   }
});

router.get(
  "/stats",
  verifyJWT,
  authRole(role = "admin"),
  async (req, res) => {
    
    const date = new Date();
    const lastyear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
      const userData = await userDocument.aggregate([
        {
          $match: {
            createdAt: { $gte: lastyear },
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            // will give total number of users which are registered in this month
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(userData);

    } catch (error) {
      res.sendStatus(500);
      console.log("error inside the user stats route", error);
    }
  }
);

module.exports = router;
