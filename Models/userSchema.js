const mongoose=require("mongoose");
const {Schema}=mongoose;

const userSchema=new Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   role:{
       type:String,
       default:"user"
   },
   
    // products:[{
    //     type:Schema.Types.ObjectId,
    //     ref:" "
    // }]

},
{timestamps:true}
)

const userDocument=mongoose.model("User",userSchema);

module.exports=userDocument;