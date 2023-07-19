require("dotenv").config();
require("express-async-errors");
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

require("./startup/db")();
require("./startup/routes")(app);

const port = process.env.PORT || 8080;
app.listen(port, console.log("Server listening on port " + port));
