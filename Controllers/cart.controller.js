const Cart = require("../Models/cart.model");
const Product = require("../Models/product.model");
module.exports = {
    LoadCart: async (req, res, idUser) => {
        Cart.findOne({ iduser: idUser }).lean()
            .then(async (MyCart) => {
                let TotalPrice = 0;
                let listproduct = await Promise.all(MyCart.idproducts.map(async idproduct => {
                    let product = await Product.findById(idproduct.idproduct).lean();
                    TotalPrice += product.price * (1 - product.discount)*idproduct.quantity;
                    return ({...product, discountpercent: product.discount*100, quantity: idproduct.quantity});
                    
                }));
                Cart.findByIdAndUpdate(MyCart._id, { totalprice: TotalPrice }, function (err, result) { });
                res.render('./Client/shop-cart', {
                    layout: 'client',
                    total: TotalPrice,
                    list: listproduct,
                    User: req.user,
                    Cart: "active",
                    Page: "Cart"
                });
            })
    },

    AddProductToCart: async (req, res, id, idpr) =>//id: id của cart, vì mỗi user có 1 cart nên lấy id cart. Thêm 1 giá trị vào hàm là cmt để lưu giá trị comment
    {
        Cart.findOne({ iduser: id }).lean()//tìm đến giỏ hàng của người có id = id
            .then((cart) => {
                var check = 0;
                var quantity_temp = 0;
                cart.idproducts.forEach(element => {
                    if (element.idproduct == idpr) {
                        check += 1;
                        quantity_temp = element.quantity +1;
                    }
                });
                if(check==0)
                {
                    var product_temp = {idproduct:idpr,quantity:1};
                    cart.idproducts.push(product_temp);
                    Product.findById(idpr)//tìm đến product vừa thêm vào giỏ để lấy price(giá trị) để tính tổng tiền
                        .then((pr) => {

                            var newtotal = cart.totalprice + pr.price;
                            Cart.findOneAndUpdate({ iduser: id }, { totalprice: newtotal, idproducts: cart.idproducts }, function (err, result) { })
                        })
                }
                else
                {
                    //const newListProduct = cart.idproducts.filter(item => item.idproduct !== idpr);
                    //var product_temp = {idproduct:idpr,quantity:quantity_temp};
                    //newListProduct.push(product_temp);
                    Product.findById(idpr)
                    .then((pr) => {
                        var newtotal = cart.totalprice + pr.price;
                        Cart.findOneAndUpdate({ iduser: id, "idproducts.idproduct":idpr }, { totalprice: newtotal, "idproducts.$.quantity": quantity_temp }, function (err, result) { })
                    })
                }
            })
            
            .catch((err) => console.log(err))
},
AddProductToCartPlus: async (req, res, id, idpr) =>//id: id của cart, vì mỗi user có 1 cart nên lấy id cart. Thêm 1 giá trị vào hàm là cmt để lưu giá trị comment
    {
        Cart.findOne({ iduser: id }).lean()//tìm đến giỏ hàng của người có id = id
            .then((cart) => {
                var check = 0;
                var quantity_temp = 0;
                cart.idproducts.forEach(element => {
                    if (element.idproduct == idpr) {
                        check += 1;
                        quantity_temp = element.quantity +1;
                    }
                });
                if(check==0)
                {
                    var product_temp = {idproduct:idpr,quantity:1};
                    cart.idproducts.push(product_temp);
                    Product.findById(idpr)//tìm đến product vừa thêm vào giỏ để lấy price(giá trị) để tính tổng tiền
                        .then((pr) => {

                            var newtotal = cart.totalprice + pr.price;
                            Cart.findOneAndUpdate({ iduser: id }, { totalprice: newtotal, idproducts: cart.idproducts }, function (err, result) { })
                        })
                }
                else
                {
                    //const newListProduct = cart.idproducts.filter(item => item.idproduct !== idpr);
                    //var product_temp = {idproduct:idpr,quantity:quantity_temp};
                    //newListProduct.push(product_temp);
                    Product.findById(idpr)
                    .then((pr) => {
                        var newtotal = cart.totalprice + pr.price;
                        Cart.findOneAndUpdate({ iduser: id, "idproducts.idproduct":idpr }, { totalprice: newtotal, "idproducts.$.quantity": quantity_temp }, function (err, result) { })
                    })
                }
            req.flash('success','Product added');
            res.redirect('back'); 
            })
            
            
            .catch((err) => console.log(err))
},
MinusProductToCart: async (req, res, id, idpr) =>//id: id của cart, vì mỗi user có 1 cart nên lấy id cart. Thêm 1 giá trị vào hàm là cmt để lưu giá trị comment
    {
        Cart.findOne({ iduser: id }).lean()//tìm đến giỏ hàng của người có id = id
            .then((cart) => {
                var check = 0;
                var quantity_temp = 0;
                cart.idproducts.forEach(element => {
                    if (element.idproduct == idpr) {
                        check += 1;
                        quantity_temp = element.quantity -1;
                    }
                });
                if(quantity_temp==0)
                {
                    Cart.findOne({ iduser: id }).lean()
                    .then((cart) => {
                        const newListProduct = cart.idproducts.filter(item => item.idproduct !== idpr);
                        Product.findById(idpr)
                            .then((pr) => {
                                var newtotal = cart.totalprice - pr.price;
                                Cart.findOneAndUpdate({ iduser: id }, { totalprice: newtotal, idproducts: newListProduct }, function (err, result) { })
                            })
                    })
                }
                else
                {
                    //const newListProduct = cart.idproducts.filter(item => item.idproduct !== idpr);
                    //var product_temp = {idproduct:idpr,quantity:quantity_temp};
                    //newListProduct.push(product_temp);
                    Product.findById(idpr)
                    .then((pr) => {
                        var newtotal = cart.totalprice - pr.price;
                        Cart.findOneAndUpdate({ iduser: id, "idproducts.idproduct":idpr }, { totalprice: newtotal, "idproducts.$.quantity": quantity_temp }, function (err, result) { })
                    })
                }
            req.flash('success','Product added');
            res.redirect('back'); 
            })
            
            
            .catch((err) => console.log(err))
},


    DeleteProductFromCart: async (req, res, id, idpr) => {
        Cart.findOne({ iduser: id }).lean()
            .then((cart) => {
                const newListProduct = cart.idproducts.filter(item => item.idproduct !== idpr);
                Product.findById(idpr)
                    .then((pr) => {
                        var newtotal = cart.totalprice - pr.price;
                        Cart.findOneAndUpdate({ iduser: id }, { totalprice: newtotal, idproducts: newListProduct }, function (err, result) { })
                    })
            })
            .catch((err) => console.log(err))
    },
    UpdateProductFromCart: async (req, res, id, idpr, quantitypr) => {
        Cart.findOne({ iduser: id }).lean()
            .then((cart) => {
                Product.findById(idpr)
                    .then((pr) => {
                        var newtotal = cart.totalprice - pr.price;
                        Cart.findOneAndUpdate({ iduser: id, idproducts:{idproduct:idpr}}, { idproducts:{quantity:quantitypr}}, function (err, result) { })
                    })
                
            })
            .catch((err) => console.log(err))
    },
    GetTotalPrice: async (req, res, idUser) => {
        let cart = await Cart.findOne({iduser:idUser}).lean();
        return Math.round(cart.totalprice);
    },
}