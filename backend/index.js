const express = require("express")
const mongoose = require("mongoose")
var routers = require('./routes/routes');
const bodyParser = require("body-parser")
const app = express()

//Notice
const port = 5000;

const mongodatabaseURL = "mongodb+srv://huyhnguyen:HuyLUT2023.@cluster0.jb9rknk.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongodatabaseURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection


app.listen(port,()=>{
    console.log("Server is running port:" +port);
})


connection.once("open",()=>{
    console.log("MongoDB Connected!")
});


app.use(bodyParser.json());
app.use(routers);