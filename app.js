const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/admitkard");

/* Create a new user. Or update an existing one. */
app.post("/create-user", async (req, res) => {
  if (req.body === undefined)
    return res.status(400).json({ message: "Please provide body." });

  let user = await UserModel.findOne({ email: req.body.email });
  if (user === null) {
    /* create new user */
    try {
      const reqData = req.body;
      user = await UserModel.create(reqData);
      return res.status(201).json(user);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  } else {
    user.name = req.body.name;
    user.email = req.body.email;
    user.contactNumber = req.body.contactNumber;
    user.courseLevel = req.body.courseLevel;
    user.countryPreference = req.body.countryPreference;
    if (req.body.dob != null) {
      user.dob = req.body.dob;
    }
    try {
      const updatedUser = await user.save();
      return res.status(200).json(updatedUser);
    } catch (e) {
      return res.status(404).json({ message: e.message });
    }
  }
});

app.get("/find-user/:email", async (req, res) => {
  let userEmail = req.params.email;
  if (!userEmail.includes("@"))
    return res
      .status(400)
      .json({ message: "Provide some valid email address." });

  user = await UserModel.find({ email: req.params.email });

  if (user.length === 0) {
    return res.json({ message: "No user found!" });
  } else {
    return res.status(200).json(user);
  }
});

app.listen(process.env.PORT || 5000);
