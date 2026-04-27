const express = require('express');
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

// SSSSSSSSSSSSSSSSS

// middleware
app.use(express.json());

const blog = require("./routes/blog");

// mount the route
app.use("/api/v1",blog);

// connect database
const connectWithDb = require("./config/database");
connectWithDb();

app.listen(PORT,()=>{
    console.log(`App is running on Port no ${PORT}`);
})




app.get("/",(req,res)=>{
    res.send("This is Home page")
});
