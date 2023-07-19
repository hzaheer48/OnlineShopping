const Category = require('../models/category');
const Product = require('../models/products');
const express = require('express');
const path = require('path')
var moment = require("moment");
const productRouter = express();



productRouter.get('/', async (req, res) => {
  const categories = await Category.find();
  const products = await Product.find();
  const allproducts = true
  const heading = 'PRODUCTS'
  var userAvailable = false
  if(req.session.user){
    userAvailable = true
  }
  res.render('shop/products', { pageName: 'All products', categories , products , allproducts , heading,userAvailable});

});


productRouter.get('/search',async(req,res)=>{
  const categories = await Category.find();
  const products = await Product.find({
    title: { $regex: req.query.search, $options: "i" },
  }).sort("-createdAt")
  const allproducts = true
  const heading = 'Results'
  var userAvailable = false
  if(req.session.user){
    userAvailable = true
  }

  res.render('shop/products', { pageName: 'Search Results', categories , products , allproducts , heading,userAvailable});

})


productRouter.get('/:category', async (req, res) => {
    var findingCategory = req.params.category
    findingCategory = findingCategory.toLowerCase()
    const categories = await Category.find();
    const specifiCategories = await Category.find({title:findingCategory},{_id:1})
    const products = await Product.find({category:specifiCategories});
    const allproducts = true
    const heading = findingCategory.toUpperCase()
    var userAvailable = false
    if(req.session.user){
      userAvailable = true
    }
    res.render('shop/products', { pageName: heading, categories , products , allproducts , heading,userAvailable});
  
});



productRouter.get('/:category/:id', async (req, res) => {
    const product = await Product.findById(req.params.id).populate("category");
    const categories = await Category.find();
    const allproducts = false
    const heading = product.title
    var userAvailable = false
    const successMsg = req.flash("success")[0];
    if(req.session.user){
      userAvailable = true
    }
    res.render('shop/products', { pageName: heading, categories , allproducts , heading,product, moment:moment,userAvailable,successMsg});
  
});




module.exports = productRouter;
