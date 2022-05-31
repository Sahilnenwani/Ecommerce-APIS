const express=require("express");
const connectToMongo=require("./db");
const cookie_parser=require('cookie-parser');
const app =express();
const Port=5000 || process.env.Port;
const dotenv=require("dotenv");

connectToMongo();

app.use(express.json());
app.use(cookie_parser());
dotenv.config();
app.get("/",(req,res)=>{
    res.send("Express working");
});
app.use("/auth",require("./Router/auth"));
app.use("/token",require("./Router/refreshRoute"));
app.use("/user",require("./Router/userRoute"));
app.use("/orders", require("./Router/orderRoute"));
app.use("/products", require("./Router/productRoute"));
app.use("/ratings",require("./Router/ratingsRoute"));


app.listen(Port,()=>{
    console.log("server is started");
})
