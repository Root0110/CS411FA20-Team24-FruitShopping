module.exports = app => {
  const reviews = require("../controllers/review.controller.js");
  // Retrieve all review for a Products
  app.get("/review_product/:targetProductID", reviews.findById);

  // create new review
  app.post("/review_new", reviews.create);

  // Delete a review with EmailAccount, date, productID
  app.delete("/review_delete/:targetEmailAccount/:targetDate/:targetProductID", reviews.delete);
};
