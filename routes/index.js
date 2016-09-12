var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

module.exports = function(passport){

	router.get('/', function(req, res) {
		res.render('index', { title: 'Toddle', message: req.flash('message') });
	});

	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true
	}));

	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true
	}));

	router.get('/add-child', isAuthenticated, function(req, res){
		res.render('add-child', { user: req.user });
	});

	router.get('/user-profile', isAuthenticated, function(req, res){
		res.render('user-profile', { user: req.user });
	});

	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	router.get('/toddler-keyboard', isAuthenticated, function(req, res, next) {
	  res.render('toddler-keyboard', { user: req.user, title: 'Toddle - Toddler Keyboard' });
	});

	router.get('/color-match', isAuthenticated, function(req, res, next) {
	  res.render('color-match', { user: req.user, title: 'Toddle - Color Match' });
	});

	router.get('/match-game', isAuthenticated, function(req, res, next) {
	  res.render('match-game', { user: req.user, title: 'Toddle - Match Game' });
	});

	router.get('/signout', isAuthenticated, function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}
