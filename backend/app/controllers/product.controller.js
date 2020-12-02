const Product = require("../models/product.model.js");

exports.create = (req,res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const product  = new Product({
    ProductName: req.body.ProductName,
    StoreID: req.body.StoreID ,
    Unit: req.body.Unit ,
    UnitPrice: req.body.UnitPrice  ,
    Availability: req.body.Availability  ,
  });

  Product.create(product, (err,data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Product.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

exports.findById = (req, res) => {
  Product.findById(req.params.targetProductID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with ProductID ${req.params.targetProductID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product with ProductID" + req.params.targetProductID
        });
      }
    } else res.send(data);
  });
};

exports.findByKeyword = (req, res) => {
  Product.findByName(req.params.targetKeyword, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with targetKeyword ${req.params.targetKeyword}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product with targetKeyword" + req.params.targetKeyword
        });
      }
    } else res.send(data);
  });
};

exports.findByStore = (req, res) => {
  Product.findByStore(req.params.targetStore, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with targetStore ${req.params.targetStore}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product with targetStore" + req.params.targetStore
        });
      }
    } else res.send(data);
  });
};

exports.findByStoreAndKeyword = (req, res) => {
  Product.findByStoreAndKeyword(req.params.targetStore, req.params.targetKeyword, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with targetStore ${req.params.targetStore} and targetKeyword ${req.params.targetKeyword}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product with targetStore" + req.params.targetStore + "and with targetKeyword" + req.params.targetKeyword
        });
      }
    } else res.send(data);
  });
};
