const sql = require("./db.js");

// constructor
const Product  = function(product) {
  this.ProductName  = product.ProductName;
  this.StoreID  = product.StoreID ;
  this.Unit  = product.Unit ;
  this.UnitPrice   = product.UnitPrice  ;
  this.Availability   = product.Availability  ;
};

Product.create = (newProduct, result) => {
  sql.query("INSERT INTO Products SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", {...newProduct });
    result(null, {...newProduct });
  });
};

Product.getAll = result => {
  sql.query("SELECT * FROM Products", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Products: ", res);
    result(null, res);
  });
};

Product.findById = (targetProductID, result) => {
  sql.query("SELECT * FROM Products NATURAL JOIN Stores  WHERE ProductID = ?", targetProductID, (err,res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "product not_found" }, null);
  });
};

Product.findByName = (targetKeyword, result) => {
  percent_mark1 = "%";
  percent_mark2 = "%";
  sql.query("SELECT * FROM Products NATURAL JOIN Stores WHERE ProductName like ?", percent_mark1.concat(targetKeyword, percent_mark2), (err,res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      var i;
        for (i = 0; i < res.length; i++) {
          console.log("found products: ", res[i]);
        }
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Product.findByStore = (targetStore, result) => {
  percent_mark1 = "%";
  percent_mark2 = "%";
  sql.query("SELECT * FROM Products NATURAL JOIN Stores WHERE StoreName like ?", percent_mark1.concat(targetStore, percent_mark2), (err,res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      var i;
        for (i = 0; i < res.length; i++) {
          console.log("found products: ", res[i]);
        }
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Product.findByStoreAndKeyword = (targetStore,targetKeyword, result) => {
  percent_mark1 = "%";
  percent_mark2 = "%";
  sql.query("SELECT * FROM Products NATURAL JOIN Stores WHERE StoreName like ? and ProductName like ?", [percent_mark1.concat(targetStore, percent_mark2), percent_mark1.concat(targetKeyword, percent_mark2)], (err,res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      var i;
        for (i = 0; i < res.length; i++) {
          console.log("found products: ", res[i]);
        }
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

module.exports = Product;
