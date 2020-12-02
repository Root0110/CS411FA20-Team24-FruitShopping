module.exports = app => {
  const purchases = require("../controllers/purchase.controller.js");

  // Create a new Customer
  app.post("/purchases", purchases.create);

  // Retrieve a single Customer with customerId
  app.get("/purchases_date/:targetDate/:targetEmailAccount", purchases.findByDate);

  //update one row
  app.put("/purchases_update", purchases.updateOne);

  //delete on row
  app.delete("/purchases_delete/:targetDate/:targetEmailAccount/:targetProductID", purchases.delete);

};
