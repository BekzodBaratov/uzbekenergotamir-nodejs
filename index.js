require("dotenv").config();
require("express-async-errors");
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./startup/db")();
require("./startup/routes")(app);

const port = process.env.PORT || 80;
app.listen(port, console.log("Server listening on port " + port));
