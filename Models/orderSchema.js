const mongoose=require("mongoose");
const {Schema}=mongoose;

const orderSchema=new Schema({
    userId:{
        type:String,
        required:true,
    },
    products:[{
       productId:{
           type:Schema.Types.ObjectId,
           ref:"Products"
       },
       quantity:{
           type:Number,
           default:1
       }
    }],
    amount:{type:Number, required:true},
    // address:{type:Object, required:true},
    status:{type:String, default:"pending"}

},
{timestamps:true});

const orderDocument=mongoose.model("Orders",orderSchema);

module.exports=orderDocument;