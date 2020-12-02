const sql = require("./db.js");



// constructor
const Customer = function(customer) {
  this.EmailAccount = customer.EmailAccount;
  this.Username = customer.Username;
  this.Password = customer.Password;
};

Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO Users SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", {...newCustomer });
    result(null, {...newCustomer });
  });
};

Customer.findById = (targetEmailAccount, result) => {
  sql.query("SELECT * FROM Users WHERE EmailAccount = ?", targetEmailAccount, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};


Customer.findByPassword = (targetEmailAccount, targetPassword, result) => {
  sql.query("SELECT * FROM Users WHERE EmailAccount = ? and Password = ?", [targetEmailAccount, targetPassword], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};


Customer.getAll = result => {
  sql.query("SELECT * FROM Users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Users: ", res);
    result(null, res);
  });
};

Customer.updateById = (targetEmailAccount, customer, result) => {
  sql.query(
    "UPDATE Users SET Username = ?, Password = ? WHERE EmailAccount = ?",
    [customer.Username, customer.Password, targetEmailAccount],
    (err, res) => {
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

      console.log("updated customer: ", { EmailAccount: targetEmailAccount, ...customer });
      result(null, { EmailAccount: targetEmailAccount, ...customer });
    }
  );
};

Customer.remove = (targetEmailAccount, result) => {
  sql.query("DELETE FROM Users WHERE EmailAccount = ?", targetEmailAccount, (err, res) => {
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

    console.log("deleted customer with EmailAccount: ", targetEmailAccount);
    result(null, res);
  });
};

Customer.removeAll = result => {
  sql.query("DELETE FROM Users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Users`);
    result(null, res);
  });
};

module.exports = Customer;
