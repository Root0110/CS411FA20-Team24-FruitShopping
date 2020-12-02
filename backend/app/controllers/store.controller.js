const Store = require("../models/store.model.js")

exports.create = (req, res) =>{
  //check if data provided
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //create a Store
  const store = new Store({
    StoreID: req.body.StoreID,
    StoreName: req.body.StoreName,
    StoreLocation: req.body.StoreLocation
  });

  // save to db
  Store.create(store, (err,data) =>{
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Store."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Store.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Store."
      });
    else res.send(data);
  });
};
