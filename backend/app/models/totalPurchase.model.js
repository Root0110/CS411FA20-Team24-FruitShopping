const sql = require("./db.js");

//constructor
const Total = function(total) {
    this.EmailAccount = total.EmailAccount;
};

Total.findDateByEmail = (targetEmailAccount, result) => {
    sql.query("SELECT PurchaseDate, SUM(UnitPrice*Quantity) AS TotalPurchase FROM Purchases pu LEFT JOIN Products pr ON pu.ProductID=pr.ProductID WHERE EmailAccount = ? GROUP BY PurchaseDate ",[targetEmailAccount], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            var i;
            for (i = 0; i < res.length; i++) {
                console.log("found purchase: ", res[i]);
            }
            result(null, res);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Total.findStoreByEmail = (targetEmailAccount, result) => {
    sql.query("SELECT pu.StoreID, SUM(UnitPrice*Quantity) AS TotalPurchase FROM Purchases pu LEFT JOIN Products pr ON pu.ProductID=pr.ProductID  WHERE EmailAccount = ?  GROUP BY pu.StoreID ",[targetEmailAccount], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            var i;
            for (i = 0; i < res.length; i++) {
                console.log("found purchase at store: ", res[i]);
            }
            result(null, res);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

module.exports = Total;
