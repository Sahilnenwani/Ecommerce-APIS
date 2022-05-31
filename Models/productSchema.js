const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    img: {},
    // products:[{
    //     type:Schema.Types.ObjectId,
    //     ref:" "
    // }]
  },
  { timestamps: true }
);

const productDocument = mongoose.model("Products", productSchema);

module.exports = productDocument;
