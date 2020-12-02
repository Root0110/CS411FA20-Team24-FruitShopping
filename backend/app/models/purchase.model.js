const sql = require("./db.js");

// constructor
const Purchase = function(purchase) {
  this.PurchaseDate  = purchase.PurchaseDate ;
  this.Quantity   = purchase.Quantity  ;
  this.EmailAccount   = purchase.EmailAccount  ;
  this.ProductID   = purchase.ProductID  ;
  this.StoreID   = purchase.StoreID  ;
};

Purchase.create = (newPurchase, result) => {
  sql.query("INSERT INTO Purchases SET ?", newPurchase, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created purchase: ", {...newPurchase });
    result(null, {...newPurchase });
  });
};

Purchase.updateByDateAndProductID = (newPurchase, result) => {
  sql.query("UPDATE Purchases SET Quantity = ? where PurchaseDate = ? and EmailAccount = ? and ProductID = ?", [newPurchase.Quantity,newPurchase.PurchaseDate, newPurchase.EmailAccount, newPurchase.ProductID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("updated purchase: ", {...newPurchase });
    result(null, {...newPurchase });
  });
};

Purchase.removeByDateAndProductID = (targetDate, targetEmailAccount, targetProductID, result) => {
  console.log([targetEmailAccount, targetDate, targetProductID]);
  sql.query("DELETE FROM Purchases WHERE EmailAccount = ? and PurchaseDate = ? and ProductID =?", [targetEmailAccount, targetDate, targetProductID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted purchase with EmailAccount, PurchaseDate, ProductID: ", targetEmailAccount, targetDate, targetProductID);
    result(null, res);
  });
};

Purchase.findByDate = (targetDate, targetEmailAccount, result) => {
  sql.query("SELECT * FROM (Purchases NATURAL JOIN Products) NATURAL JOIN Stores WHERE PurchaseDate = ? and EmailAccount = ?", [targetDate, targetEmailAccount], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      var i;
        for (i = 0; i < res.length; i++) {
          console.log("found purchase history: ", res[i]);
        }
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Purchase;
