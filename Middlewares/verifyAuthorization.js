const verifyJWT=require("../Middlewares/verifyJWT");
const userDocument = require("../Models/userSchema");



const verifyAuthorization= async (req,res,next)=>{
    verifyJWT(req,res,()=>{
        const userData= await userDocument.findById(req.params.id);
        if (userData.isAdmin) {
            next();
        }else{
            res.status(403).json("you are not allowed! only Admin is allowed to do changes")
        }
    })
}
module.exports=verifyAuthorization;