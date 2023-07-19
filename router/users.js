const express = require('express');
const Category = require('../models/category');
const User = require('../models/users');
const Order = require('../models/order');
const userController = require('../controller/users');
const usersRouter = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
usersRouter.use(passport.initialize());
usersRouter.use(passport.session());

usersRouter.get('/signup', async (req, res) => {
  if (req.session.user) {
    res.redirect('/users/profile');
  } else {
    const errorOccured = false;
    const categories = await Category.find();
    var userAvailable = false;
    res.render('users/signup', {
      pageName: 'Sign up',
      categories,
      errorOccured,
      userAvailable,
    });
  }
});

usersRouter.get('/signin', async (req, res) => {
  if (req.session.user) {
    res.redirect('/users/profile');
  } else {
    const errorOccured = false;
    const categories = await Category.find();
    res.render('users/signin', {
      pageName: 'Sign in',
      categories,
      errorOccured,
      userAvailable: false,
    });
  }
});

usersRouter.get('/profile', async (req, res) => {
  const categories = await Category.find();
  allOrders = await Order.find({ user: req.session.user });
  if (req.session.user) {
    res.render('users/profile', {
      orders: allOrders,
      pageName: 'Profile',
      categories,
      user: req.session.user,
      userAvailable: true,
    });
  } else {
    res.redirect('/users/signin');
  }
});
usersRouter.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/');
});

usersRouter.post('/signin', userController.loginUser);
usersRouter.post('/signup', userController.createUser);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
passport.use(
  new GoogleStrategy(
    {
      clientID:
        '475942947646-5cpf1oju25015ks8a46sin8b25nq0a49.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:8080/users/auth/google/callback',
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const existingUser = await User.findOne({ email: profile.email });
        console.log(profile.email);
        if (existingUser) {
          return cb(null, existingUser);
        } else {
          const newUser = new User({
            username: profile.name.givenName,
            email: profile.email,
          });
          await newUser.save();
          return cb(null, newUser);
        }
      } catch (error) {
        return cb(error);
      }
    }
  )
);

usersRouter.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
usersRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/users/singin' }),
  function (req, res) {
    req.session.user = req.user;
    res.redirect('/users/profile');
  }
);

module.exports = usersRouter;
