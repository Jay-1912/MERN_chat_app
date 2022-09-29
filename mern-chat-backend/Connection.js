const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  "mongodb+srv://jay_1912:JjAaYy112233@cluster0.bhaqk.mongodb.net/MernChatApp?retryWrites=true&w=majority",
  () => {
    console.log("connected to mongodb");
  }
);
