const express = require("express");
require("./src/config/connection.js");
const bodyParser = require("body-parser");
const { errors } = require("celebrate");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1", require("./src/routes"));

app.use(errors());

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
