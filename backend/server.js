const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());
app.use(cors());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to zzhu31 application." });
});

require("./app/routes/customer.routes.js")(app);
require("./app/routes/store.routes.js")(app);
require("./app/routes/product.routes.js")(app);
require("./app/routes/purchase.routes.js")(app);
require("./app/routes/review.routes.js")(app);
require("./app/routes/totalPurchase.routes.js")(app);

// set port, listen for requests
app.listen();
