module.exports = app => {
  const products = require("../controllers/product.controller.js");

  // Create a new Product
  app.post("/products", products.create);

  // Retrieve all Products
  app.get("/products", products.findAll);

  // Retrieve a single Product with ProductId
  app.get("/products_id/:targetProductID", products.findById);

  // Retrieve all Products with a keyword
  app.get("/products_keyword/:targetKeyword", products.findByKeyword);

  // Retrieve all Products with a Store
  app.get("/products_store/:targetStore", products.findByStore);

  app.get("/products_store_keyword/:targetStore/:targetKeyword", products.findByStoreAndKeyword);

};
