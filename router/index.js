const Category = require('../models/category');
const Product = require('../models/products');
const Cart = require('../models/cart');
const Order = require('../models/order')
const express = require('express');
const indexController = require('../controller/index')
const indexRouter = express();

indexRouter.get(['/', '/home', '/index'], async (req, res) => {
  const categories = await Category.find();
  const products = await Product.find();
  var userAvailable = false;
  if (req.session.user) {
    userAvailable = true;
  }
  res.render('shop/index', {
    pageName: 'Home',
    categories,
    products,
    userAvailable,
  });
});

indexRouter.get('/pages/about-us', async (req, res) => {
  const categories = await Category.find();
  const products = await Product.find();
  var userAvailable = false;
  if (req.session.user) {
    userAvailable = true;
  }
  res.render('pages/about-us', {
    pageName: 'About Us',
    categories,
    products,
    userAvailable,
  });
});

indexRouter.get('/pages/contact-us', async (req, res) => {
  const categories = await Category.find();
  const products = await Product.find();
  var userAvailable = false;
  if (req.session.user) {
    userAvailable = true;
  }
  res.render('pages/contact-us', {
    pageName: 'Contact Us',
    categories,
    products,
    userAvailable,
  });
});

indexRouter.get('/shopping-cart', async (req, res) => {
  const categories = await Category.find();
  if (req.session.user) {
    let cart_user = await Cart.findOne({ user: req.session.user._id });
    if (cart_user) {
      return res.render('shop/shopping-cart', {
        cart: cart_user,
        pageName: 'Shopping Cart',
        products: await productsFromCart(cart_user),
        categories,
        userAvailable: true,
      });
    } else {
      return res.render('shop/shopping-cart', {
        cart: null,
        pageName: 'Shopping Cart',
        products: null,
        categories,
        userAvailable: true,
      });
    }
  } else {
    res.redirect('/users/signin');
  }
});

indexRouter.get('/checkout', async (req, res) => {
  const categories = await Category.find();
  if (!req.session.user) {
    return res.redirect('/users/signin');
  }
  let cart = await Cart.findOne({ user: req.session.user._id });
  if (!cart) {
    return res.redirect('/');
  }
  res.render('shop/checkout', {
    total: cart.totalCost,
    pageName: 'Checkout',
    categories,
    userAvailable: true,
  });
});

indexRouter.get('/add-to-cart/:id',indexController.addToCart)
indexRouter.get('/reduce/:id', indexController.removeFromCart)
indexRouter.post('/checkout',indexController.performCheckOut)

async function productsFromCart(cart) {
  let products = []; // array of objects
  for (const item of cart.items) {
    let foundProduct = (await Product.findById(item.productId)).toObject();
    foundProduct['qty'] = item.qty;
    foundProduct['totalPrice'] = item.price;
    products.push(foundProduct);
  }
  return products;
}

module.exports = indexRouter;
