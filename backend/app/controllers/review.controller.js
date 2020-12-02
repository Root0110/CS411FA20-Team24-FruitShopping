const Review = require("../models/review.model.js");

exports.create = (req,res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const review  = new Review({
    userAccount: req.body.userAccount,
    productID: Number(req.body.productID) ,
    productDetails: req.body.productDetails ,
    purchaseDate: req.body.purchaseDate
  });

  Review.create(review, (err,data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Review."
      });
    else res.send(data);
  });
};

exports.findById = (req, res) => {
  Review.findById(req.params.targetProductID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found review with ProductID ${req.params.targetProductID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving review with ProductID" + req.params.targetProductID
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Review.remove(req.params.targetEmailAccount,req.params.targetDate,req.params.targetProductID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not such review found with ${req.params.targetEmailAccount}, ${req.params.targetDate}, ${req.params.targetProductID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete the certain reviews"
        });
      }
    } else res.send({ message: `${data} reviews were deleted successfully!` });
  });
};
