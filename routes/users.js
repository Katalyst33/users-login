let fs = require('fs');

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

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


    const {name, email, password, password2} = req.body;

    let errors = [];

    //Check required fields
    if (!name || !email || !password || !password2) {
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
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    // print form detail to console
                    /*  console.log(newUser);
                      res.send('hello');*/

                    //hash password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            //set password to hased
                            newUser.password = hash;
                            //save user
                            newUser.save()
                                .then(user => {
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));

                        }))

                }


                module.exports = router;


