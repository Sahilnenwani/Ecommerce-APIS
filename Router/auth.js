const express = require("express");
const router = express.Router();
const userDocument = require("../Models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const dotenv=require("dotenv");
const session=require("../Models/session");


const JWT_Secret="mysecretvalue";
const JWT_Secret_Refresh="refrehtokenmysecretvalue";

dotenv.config();
// const JWT_Secret=process.env.ACCESS_TOKEN_SECRETKEY;
// const JWT_Secret_Refresh=  process.env.REFRESH_TOKEN_SECRETKEY;


router.post("/register", async (req, res) => {
  const passwordhash = await bcrypt.hash(req.body.password, 10);
  const newUser = new userDocument({
    username: req.body.username,
    email: req.body.email,
    password: passwordhash,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.sendStatus(500), console.log("creating new user error", error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const User = await userDocument.findOne({ username });
    // console.log("user data in login request",User)

    if (!User) {
      return res.json({ status: "error", error: "invalid username/password" });
    }

    if (await bcrypt.compare(password, User.password)) {
      const token = jwt.sign(
        { id: User._id, username: User.username,role:User.role },
         JWT_Secret,
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign(
        { id: User._id, username: User.username, role:User.role},
      JWT_Secret_Refresh,
        { expiresIn: "1d" }
      );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ status: "ok", accessToken: token });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(500);
    console.log("user login errors",error)
  }
});

router.post("/logout", async (req,res)=>{
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;
    const accessToken = req.headers.authorization;
    if (!accessToken) return res.sendStatus(401);
    // console.log(accessToken)
    const tokenData={
        refreshToken,
        accessToken
    }
    const responce = await session.create(tokenData);
    res.status(200).json({
        "message":"logout success"
    })
})

module.exports = router;
