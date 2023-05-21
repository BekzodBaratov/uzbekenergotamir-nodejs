const cors = require("cors");
const morgan = require("morgan");
const errorMiddleware = require("../middleware/error");
const fileUpload = require("express-fileupload");

const productRoute = require("../routers/products.route");
const newsRoute = require("../routers/news.route");
const partnerRoute = require("../routers/partners.route");
const calculateRoute = require("../routers/calculates.route");
const contactRoute = require("../routers/contacts.route");
const energyProducts = require("../routers/energyProducts.route.js");
const authRoute = require("../controllers/auth.controller");
const usersRoute = require("../routers/users.route");
const dashboardRoute = require("../controllers/dashboard.controller");

module.exports = (app) => {
  app.use(morgan("tiny"));
  app.use(fileUpload({ useTempFiles: true }));
  app.use(cors());

  app.use("/api/v1/login", authRoute);
  app.use("/api/v1/users", usersRoute);
  app.use("/api/v1/products", productRoute);
  app.use("/api/v1/news", newsRoute);
  app.use("/api/v1/partners", partnerRoute);
  app.use("/api/v1/calculates", calculateRoute);
  app.use("/api/v1/contacts", contactRoute);
  app.use("/api/v1/energyProducts", energyProducts);
  app.use("/api/v1/dashboard", dashboardRoute);
  app.use(errorMiddleware);
};
