module.exports = app => {
  const stores = require("../controllers/store.controller.js");

  app.post("/stores", stores.create);

  app.get("/stores", stores.findAll);

};
