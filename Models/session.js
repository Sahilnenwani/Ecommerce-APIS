const mongoose=require("mongoose");
const {Schema}=mongoose;

const sessionSchema=new Schema({
  
    refreshToken:{
        type:String,
        unique:true,
    },
    accessToken:{
        type:String,
        unique:true,
    }
    
})

const session=mongoose.model("session",sessionSchema);
// session.createIndexes();
module.exports=session;