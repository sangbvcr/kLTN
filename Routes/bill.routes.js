const express = require('express');
// const paypal = require('paypal-rest-sdk');
const router = express.Router();
controllerBill = require('../Controllers/bill.controller');
router.get('/',(req, res)=>{
    var id=req.user._id;;
    controllerBill.LoadBillByID(req, res, id);
});
module.exports = router;