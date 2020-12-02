const Total = require("../models/totalPurchase.model.js");


// Find a single user's total purchase by date
exports.findDateByEmail = (req, res) => {
    Total.findDateByEmail(req.params.targetEmailAccount, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found purchase account of user ${req.params.targetEmailAccount}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving purchase account of user " + req.params.targetEmailAccount
                });
            }
        } else res.send(data);
    });
};

exports.findStoreByEmail = (req, res) => {
    Total.findStoreByEmail(req.params.targetEmailAccount, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found purchase account of user ${req.params.targetEmailAccount} 's purchase records at every store.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving purchase account of user " + req.params.targetEmailAccount +"s purchase records at every store."
                });
            }
        } else res.send(data);
    });
}
