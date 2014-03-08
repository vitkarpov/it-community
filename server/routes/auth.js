'use strict';

var passport = require('passport'),
  GoogleStrategy = require('passport-google').Strategy,
  User = require('../models/user');

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/auth/google/return',
    realm: 'http://localhost:3000/'
  },
  function(identifier, profile, done) {
    User.findOne({
      googleOpenID: identifier
    }, function(err, user) {
      if (err) {
        done(err);
      } else if (!user) {
        var newUser = new User({
          name: profile.name.givenName,
          surname: profile.name.familyName,
          googleOpenID: identifier
        });
        newUser.save(done);
      } else {
        done(null, user);
      }
    });
  }
));

module.exports = function(app) {
  app.get('/auth/google', passport.authenticate('google', {
    failureRedirect: '/login'
  }));

  // GET /auth/google/return
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get('/auth/google/return',
    passport.authenticate('google', {
      failureRedirect: '/login'
    }),
    function(req, res) {
      res.redirect('/');
    });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};