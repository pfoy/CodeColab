var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
var config = require('../config');
var transporter = nodemailer.createTransport(config.mailer);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Code4Share - a platform for sharing code.' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Code4Share - a platform for sharing code.'});
});

router.route('/contact')
  .get(function(req, res, next) {
    res.render('contact', { title: 'Code4Share - a platform for sharing code.'});
  })
  .post(function(req, res, next) {
    req.checkBody('name', 'Empty name').notEmpty();
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('message', 'Empty message').notEmpty();
    var errors = req.validationErrors();

    if(errors) {
      res.render('contact', {
        title: 'Code4Share - a platform for sharing code.',
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        errorMessages: errors
      });
    } else {
      var mailOptions = {
        from: 'Code4Share <no-reply@code4share.com>',
        to: 'peter.foy5@gmail.com',
        subject: 'You got a new message from visitor 💋 😽',
        text: req.body.message
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return console.log(error);
        }
        res.render('thanks', { title: 'Code4Share - a platform for sharing code.'});
      });

    }
  });

router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Login to your account'});
})

router.get('/register', function(req, res, next) {
  res.render('register', {title: 'Register a new account'});
})

module.exports = router;
