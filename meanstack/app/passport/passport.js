var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
var session = require('express-session');

module.exports=function(app, passport)
{

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { secure: false }}));

  passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

	passport.use(new FacebookStrategy({
    clientID: '976856405785162',
    clientSecret: '95a18a100a0048da333a8598269d74ef',
    callbackURL: "http://localhost:8080/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
    done(null,profile);
  }
 ));

	app.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/login' }));
	app.get('/auth/facebook/',passport.authenticate('facebook',{scope:'email'}));
	return passport;
}
