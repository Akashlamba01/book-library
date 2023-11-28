const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/BookLibrary")
  .then(() => {
    console.log("DB Connected Successfully!");
  })
  .catch((e) => {
    console.log("db not conncete!", e);
  });
