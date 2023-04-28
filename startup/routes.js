const cors = require("cors");
const morgan = require("morgan");
const errorMiddleware = require("../middleware/error");
const fileUpload = require("express-fileupload");

const productRoute = require("../routers/products.route");
const partnerRoute = require("../routers/partners.route");
const calculateRoute = require("../routers/calculates.route");
const contactRoute = require("../routers/contacts.route");

module.exports = (app) => {
  app.use(morgan("tiny"));
  app.use(fileUpload({ useTempFiles: true }));
  app.use(cors());
  app.use(errorMiddleware);

  app.use("/api/v1/products", productRoute);
  app.use("/api/v1/partners", partnerRoute);
  app.use("/api/v1/calculates", calculateRoute);
  app.use("/api/v1/contacts", contactRoute);
};
