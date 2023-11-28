const mongoose = require("mongoose");
let bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    auther: {
      type: String,
      default: "",
    },
    genre: {
      type: String,
      default: "",
    },
    year: Number,
  },
  {
    timestamps: true,
  }
);

const Books = mongoose.model("Book", bookSchema);
module.exports = Books;
