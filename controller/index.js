const Category = require('../models/category');
const Product = require('../models/products')
const Order = require('../models/order')
const Cart = require('../models/cart')
const addToCart = async (req,res)=>{
    let productId = req.params.id;
  if (req.session.user) {
    let user_cart;
    user_cart = await Cart.findOne({ user: req.session.user._id });
    let cart;
    if (!user_cart) {
      cart = new Cart({});
    } else {
      cart = user_cart;
    }
    const product = await Product.findById(productId);
    const itemIndex = cart.items.findIndex((p) => p.productId == productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].qty++;
      cart.items[itemIndex].price = cart.items[itemIndex].qty * product.price;
      cart.totalQty++;
      cart.totalCost += product.price;
    } else {
      cart.items.push({
        productId: productId,
        qty: 1,
        price: product.price,
        title: product.title,
        productCode: product.productCode,
      });
      cart.totalQty++;
      cart.totalCost += product.price;
    }
    cart.user = req.session.user._id;
    await cart.save();
    req.flash('success', 'Item added to the shopping cart');
    res.redirect(req.headers.referer);
  } else {
    res.redirect('/users/signin');
  }
}

const removeFromCart = async (req,res)=>{
    const productId = req.params.id;
    let cart;
    try {
      cart = await Cart.findOne({ user: req.session.user._id });
      let itemIndex = cart.items.findIndex((p) => p.productId == productId);
      if (itemIndex > -1) {
        const product = await Product.findById(productId);
        cart.items[itemIndex].qty--;
        cart.items[itemIndex].price -= product.price;
        cart.totalQty--;
        cart.totalCost -= product.price;
        if (cart.items[itemIndex].qty <= 0) {
          await cart.items.remove({ _id: cart.items[itemIndex]._id });
        }
        await cart.save();
        if (cart.totalQty <= 0) {
          await Cart.findByIdAndRemove(cart._id);
        }
      }
      res.redirect(req.headers.referer);
    } catch (err) {
      console.log(err.message);
      res.redirect('/');
    }
}

const performCheckOut = async (req,res)=>{
    let cart = await Cart.findOne({ user: req.session.user._id });
  const order = new Order({
    user: req.session.user,
    cart: {
      totalQty: cart.totalQty,
      totalCost: cart.totalCost,
      items: cart.items,
    },
    address: req.body.address,
    contact : req.body.contact,
  });
  order.save(async (err, newOrder) => {
    if (err) {
      console.log(err);
      return res.redirect('/checkout');
    }
    await cart.save();
    await Cart.findByIdAndDelete(cart._id);
    req.flash('success', 'Successfully purchased');
    res.redirect('/users/profile');
  });
}

module.exports = {addToCart,removeFromCart,performCheckOut}