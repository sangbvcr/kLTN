const express = require('express');
// const paypal = require('paypal-rest-sdk');
const router = express.Router();
controllerCart = require('../Controllers/cart.controller');

router.get('/',(req, res)=>{
    var id=req.user._id;;
    controllerCart.LoadCart(req, res, id);
});
router.post('/add/:id',(req, res)=>{
    let idpr = req.params.id;
    var id=req.user._id;
    controllerCart.AddProductToCart(req,res,id,idpr);
});
router.post('/addplus/:id',(req, res)=>{
    let idpr = req.params.id;
    var id=req.user._id;
    controllerCart.AddProductToCartPlus(req,res,id,idpr);
});

router.post('/minus/:id',(req, res)=>{
    let idpr = req.params.id;
    var id=req.user._id;
    controllerCart.MinusProductToCart(req,res,id,idpr);
});

router.post('/delete/:id',(req, res)=>{
    let idpr = req.params.id;
    var id=req.user._id;
    controllerCart.DeleteProductFromCart(req,res,id,idpr);
});
router.post('/edit/:id',(req, res)=>{
    let idpr = req.params.id;
    var id=req.user._id;
    let quantitypr = req.body.quantitypr;
    controllerCart.UpdateProductFromCart(req,res,id,idpr,quantitypr);
});


module.exports = router;