const express = require("express");
const app = express();
const router = require("express").Router();
const multer = require("multer");
const User = require("../models/User");
app.use("/uploads", express.static("public_html/uploads"));
const path = require("path");

const Storage = multer.diskStorage({
  destination: path.join(__dirname, "../public_html/uploads"),
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
    console.log(file);
  },
});

var upload = multer({
  storage: Storage,
}).single("picture");

//creating user
router.post("/", upload, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const picture = req.file.filename;
    const user = await User.create({ name, email, password, picture });
    res.status(201).json(user);
  } catch (err) {
    let msg;
    if (err.code == 11000) msg = "User already exists";
    else msg = err.message;
    console.log(err);
    res.status(400).json(msg);
  }
});

//login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    user.status = "online";
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
