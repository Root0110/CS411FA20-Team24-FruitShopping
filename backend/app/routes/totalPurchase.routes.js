module.exports = app => {
    const totalPurchase = require("../controllers/totalPurchase.controller.js");

    // Retrieve a single user's total purchase by emailaccount
    app.get("/totalPurchases/dates/:targetEmailAccount", totalPurchase.findDateByEmail);

    // Retrieve single user's total purchase at certain store
    app.get("/totalPurchases/stores/:targetEmailAccount", totalPurchase.findStoreByEmail);

};
