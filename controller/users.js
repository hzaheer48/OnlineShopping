const Category = require('../models/category');
const User = require('../models/users');

const createUser = async (req, res) => {
  const categories = await Category.find();
  const user = new User({
    username: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  user
    .save()
    .then(() => {
    req.session.user = user
    res.redirect('/users/profile')
    })
    .catch((error) => {
      const errorOccured = true;
      const errorMsg = 'USER ALREADY EXISTS WITH SAME EMAIL.';
      res.render('users/signup', {
        pageName: 'Sign up',
        categories,
        errorOccured,
        errorMsg,
        userAvailable:false
      });
    });
};

const loginUser = async (req, res) => {
  const categories = await Category.find();
  const validUser = await User.find({
    email: req.body.email,
    password: req.body.password,
  });
  if (validUser.length == 0) {
    const errorOccured = true;
    const errorMsg = 'INVALID LOGIN.';
    res.render('users/signin', {
      pageName: 'Sign up',
      categories,
      errorOccured,
      errorMsg,
      userAvailable:false
    });
  } else {
    req.session.user = validUser[0]
    res.redirect('/users/profile')
  }
};


module.exports = { createUser,loginUser };
