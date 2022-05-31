const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const JWT_Secret="mysecretvalue";
const JWT_Secret_Refresh="refrehtokenmysecretvalue";


router.get("/refreshToken",(req,res)=>{
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        JWT_Secret_Refresh,
        (err,decoded)=>{
            if (err) return res.sendStatus(403);

            const accessToken=jwt.sign(
                {id: decoded.id, username: decoded.username, role:decoded.role },JWT_Secret,{expiresIn:'1h'}
            );
            res.json({accessToken})
        }
    )
})

module.exports=router;