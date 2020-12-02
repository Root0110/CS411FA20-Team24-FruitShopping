const Customer = require("../models/customer.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const customer = new Customer({
    EmailAccount: req.body.EmailAccount,
    Username: req.body.Username,
    Password: req.body.Password
  });

  // Save User in the database
  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Customer.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

exports.findByPassword = (req, res) => {
  Customer.findByPassword(req.params.targetEmailAccount, req.params.targetPassword, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with EmailAccount ${req.params.targetEmailAccount} or incorrect password.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with EmailAccount" + req.params.targetEmailAccount
        });
      }
    } else res.send(data);
  });
};



exports.findOne = (req, res) => {
  Customer.findById(req.params.targetEmailAccount, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with EmailAccount ${req.params.targetEmailAccount}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with EmailAccount" + req.params.targetEmailAccount
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Customer.updateById(
    req.params.targetEmailAccount,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with EmailAccount ${req.params.targetEmailAccount}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with EmailAccount" + req.params.targetEmailAccount
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Customer.remove(req.params.targetEmailAccount, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with EmailAccount ${req.params.targetEmailAccount}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with EmailAccount" + req.params.targetEmailAccount
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Customer.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};
