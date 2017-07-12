var express = require('express');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var port = 3000;

//initializing express app
var app = express();

app.use(session({ secret: 'un secreto' }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  clientID: "1705193259784054",
  clientSecret: "1525c57cc6402c3fcd748c0b08f8c308",
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
}, function (token, refreshToken, profile, done) {
  //this is where to start referencing site db table
  done(null, profile);
}))

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/me',
  failureRedirect: '/auth/facebook'
}))

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/me', function (req, res) {
  res.send(req.user)
})


app.listen(port, function() {
  console.log('listening on port: ', port)
});
