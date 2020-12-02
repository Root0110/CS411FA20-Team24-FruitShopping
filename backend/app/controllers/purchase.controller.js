const Purchase = require("../models/purchase.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const purchase = new Purchase({
    PurchaseDate: req.body.PurchaseDate,
    EmailAccount: req.body.EmailAccount,
    Quantity: req.body.Quantity,
    ProductID: req.body.ProductID,
    StoreID: req.body.StoreID
  });

  // Save User in the database
  Purchase.create(purchase, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Purchase."
      });
    else res.send(data);
  });
};

exports.updateOne = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const purchase = new Purchase({
    PurchaseDate: req.body.PurchaseDate,
    EmailAccount: req.body.EmailAccount,
    Quantity: req.body.Quantity,
    ProductID: req.body.ProductID,
    StoreID: req.body.StoreID
  });

  Purchase.updateByDateAndProductID(
    purchase,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found purchase with Date ${purchase.PurchaseDate}, EmailAccount ${purchase.EmailAccount}, and ProductID ${purchase.ProductID}.`
          });
        } else {
          res.status(500).send({
            message: `Error updating purchase with Date ${purchase.PurchaseDate}, EmailAccount ${purchase.EmailAccount}, and ProductID ${purchase.ProductID}.`
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Purchase.removeByDateAndProductID(req.params.targetDate, req.params.targetEmailAccount, req.params.targetProductID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found purchase with Date ${req.params.targetDate}, EmailAccount ${req.params.targetEmailAccount}, and ProductID ${req.params.targetProductID}.`
        });
      } else {
        res.status(500).send({
          message: `Error deleting purchase with Date ${req.params.targetDate}, EmailAccount ${req.params.targetEmailAccount}, and ProductID ${req.params.targetProductID}.`
        });
      }
    } else res.send({ message: `Purchase was deleted successfully!` });
  });
};

exports.findByDate = (req, res) => {
  Purchase.findByDate(req.params.targetDate, req.params.targetEmailAccount, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Purchase with Date ${req.params.targetDate} and with EmailAccount ${req.params.targetEmailAccount}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Purchase with Date" + req.params.targetDate + "and with EmailAccount" + req.params.targetEmailAccount
        });
      }
    } else res.send(data);
  });
};
