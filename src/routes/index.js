const express = require("express");
const router = express.Router();

router.use("/books", require("./booksRoutes"));

module.exports = router;
