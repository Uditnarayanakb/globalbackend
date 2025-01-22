const express = require("express");
const secret = "123";
const jwt = require("jsonwebtoken");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/userDetails")
    .then(() => {
        console.log("Mongo Connected");
    })
    .catch(() => {
        console.log("Mongo Not Connected");
    });

const mySchema = mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required:true
    }
});

const user = mongoose.model("user", mySchema);

app.post("/signin", (req, res) => {
    // const username = req.body.username;
    // const pwd = req.body.pwd;
    const {username, password} = req.body.user;
    const details = {
        user: username,
        password: password
    };
    const userDetails = new user(details);
    userDetails.save()
    .then((response) => {
    res.send("Successfully Signed In");
    })
    .catch(()=>{
        res.send("Failed to sign in");
    })
});

app.post("/login", (req, res) => {
    const {username, password} = req.body.user;

    user.findOne({ user: username })
    .then((response)=>{
        if(response.user === username)
        {
            if(response.password === password)
            {
                res.send({ success: true });
            }
            else{
                res.send({ success: false });
            }
        }
    })
    .catch(()=>{
        res.send("User Not Found or the username is invalid");
    })
    // .catch((err)=>{
    //     res.send(err);
    // })
});

app.listen(3000, () => {
    console.log("Server 3000 is running");
});