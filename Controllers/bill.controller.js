const Bill = require("../Models/bill.model");
module.exports = {
    LoadBillByID: async (req, res, idUser) => {
        Bill.find({ iduser: idUser }).lean()
            .then(async (MyBills) => {
            res.render('./Client/bills', {
                    layout: 'client',
                    list: MyBills,
                    User: req.user,
                    Cart: "active",
                    Page: "Bills"
                });
            })
    },
}