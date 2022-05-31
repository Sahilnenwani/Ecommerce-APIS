const express=require("express");
const router= express.Router();
// const bcrypt = require('bcryptjs');


router.get("/",async (req,res)=>{
    res.sendStatus(200);
});

module.exports=router;