let fs = require('fs');

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//user model
const User = require('../models/User');


// Load Chance
let Chance = require('chance');
// Instantiate Chance so it can be used
let chance = new Chance();

// Use Chance here.
var my_random_string = chance.string();

//Login
router.get('/login', (req, res) => res.render('./Login'));


//Login
router.get('/register', (req, res) => res.render('Register'));

//register handler
router.post('/register', (req, res) => {


    const {name, email, dob, bio,  password, password2} = req.body;

    let errors = [];

    //Check required fields
    if (!name || !email || !dob  || !bio || !password || !password2) {
        errors.push({msg: 'Please fill in all fields'});
    }

    // Check passwords match
    if (password !== password2) {
        errors.push({msg: 'Passwords do not match'});
    }

    //check password length
    if (password.length < 6) {
        errors.push({msg: 'password should be at least 6 characters'});
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            dob,
            bio,
            email,
            password,
            password2
        });
    } else {
        //Validation passed
        User.findOne({email: email})
            .then(user => {
                if (user) {
                    //User exist

                    errors.push({msg: 'Email is already registered'});
                    res.render('register', {
                        errors,
                        name,
                        dob,
                        bio,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        dob,
                        bio,
                        email,
                        password
                    });

                    // print form detail to console
                    /*  console.log(newUser);
                      res.send('hello');*/

                    //hash password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    req.flash('success_msg', 'you are now registered and can login');

                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                        });
                    });
                }
            });
    }
});

//login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});


//logout handle
router.get('/logout', (req, res) =>{
    req.logout();
    req.flash('success_msg','you are logged out');
    res.redirect('/users/login');
});


module.exports = router;


