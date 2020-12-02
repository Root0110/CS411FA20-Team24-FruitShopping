module.exports = app => {
  const customers = require("../controllers/customer.controller.js");

  // Create a new Customer
  app.post("/customers_create", customers.create);

  // Retrieve all Customers
  app.get("/customers_all", customers.findAll);

  // Retrieve a single Customer with customerId
  app.get("/customers_email/:targetEmailAccount", customers.findOne);
  
  //retrive a user with email and password
  app.get("/customers_verify/:targetEmailAccount/:targetPassword", customers.findByPassword);


  // Update a Customer with customerId
  app.put("/customers/:targetEmailAccount", customers.update);

  // Delete a Customer with customerId
  app.delete("/customers/:targetEmailAccount", customers.delete);

  // delete all users
  app.delete("/customers", customers.deleteAll);
};
