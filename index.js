const express = require("express");
const cors = require("cors");
const boderParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
const Insurance = require("./models/insurance");

const app = express();

app.use(boderParser.json());
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Signup new User
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }).then((user) => {
    if (user) {
      res.send({ message: "username already exists" });
    } else {
      const user = new User({
        username,
        password,
      });
      user.save().then((user) => {
        res.send({ message: "User Created Successfully" });
      });
    }
  });
});

// Login User
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username, password: password }).then((user) => {
    if (user) {
      res.send(user);
    } else {
      res.send({ message: "Invalid Credentials" });
    }
  });
});

// Add insurance data
app.post("/admin/addinsurance", (req, res) => {
  const {
    userId,
    name,
    policyHolder,
    policyNo,
    address,
    paymentTillDate,
    totalPayment,
  } = req.body;
  const insurance = new Insurance({
    userId,
    name,
    policyHolder,
    policyNo,
    address,
    paymentTillDate,
    totalPayment,
  });
  insurance
    .save()
    .then(() => {
      res.send({ message: "Successfully Added Insurance" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get insurance data
app.get("/admin/getinsurance/:userid", (req, res) => {
  const { userid } = req.params;
  Insurance.find({ userId: userid }).then((insurance) => {
    res.send(insurance);
  });
});

// Connecting to MongoDB
mongoose
  .connect("mongodb+srv://shaam:shaam777@cluster0.bps2guq.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3001);
  })
  .catch((err) => console.log(err));

module.exports = app;
