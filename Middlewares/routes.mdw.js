module.exports = (app) => {
    admin = require('../Routes/admin.routes');
    login = require('../Routes/login.routes');
    shop = require('../Routes/shop.routes');
    product = require('../Routes/product.routes');
    category = require('../Routes/category.routes');
    cart = require('../Routes/cart.routes');
    pay = require('../Routes/pay.routes');
    paypal = require('../Routes/paypal.routes');
    bill = require('../Routes/bill.routes');
    restrict = require('../Middlewares/auth.mdw').checkAuthenticated;
    const role = require('../Middlewares/role.mdw');
    const { settingRole, isAdmin, isUser, isTeacher } = role;

    app.use('/login', settingRole, login);
    app.use('/admin', restrict, settingRole, isAdmin, admin);
    app.use('/', settingRole, shop);
    app.use('/product', settingRole, product);
    app.use('/category', settingRole, category);
    app.use('/cart', restrict, settingRole, isUser, cart);
    app.use('/mybills', restrict, settingRole, isUser, bill);
    app.use('/pay', restrict, settingRole, isUser, pay);
    app.use('/paypal', restrict, settingRole, isUser, paypal);
}