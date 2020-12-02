const sql = require("./db.js");

//constructor
const Store = function(store){
  this.StoreID = store.StoreID;
  this.StoreName = store.StoreName;
  this.StoreLocation  = store.StoreLocation;
};

Store.create = (newStore, result) =>{
  sql.query("INSERT INTO Stores SET ?", newStore, (err,res) => {
    if (err){
      console.log("error: ", err);
      result(err,null);
      return;
    }

    console.log("create store: ", {...newStore});
    result(null, {...newStore})
  });
};

Store.getAll = result => {
  sql.query("SELECT * from Stores", (err,res) => {
    if (err){
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("User: ", res);
    result(null, res);
  });
};

module.exports = Store;
