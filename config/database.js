const mongoose = require('mongoose');
require("dotenv").config();

const connectWithDb = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then((console.log("Datbase connecteed sucessfully")))
    .catch((err)=>{
        console.log("Problem While Connect With DB");
        console.log(err)
        process.exit(1);
    })

};

module.exports = connectWithDb;