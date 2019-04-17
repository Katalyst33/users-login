let fs = require('fs');

const express = require('express');
const router = express.Router();


// Load Chance
let Chance = require('chance');
// Instantiate Chance so it can be used
let chance = new Chance();

// Use Chance here.
var my_random_string = chance.string();

//Login
router.get('/login', (req, res) => res.render('./Login'));


//Login
router.get('/register', (req, res) =>  res.render('Register'));

//register handler
router.post('/register', (req, res) => {


    const { name, email, password, password2} = req.body;

    let errors = [];

    //Check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Please fill in all fields'});
    }

    // Check passwords match
    if(password !== password2) {
        errors.push({ msg: 'Passwords do not match'});
    }

    //check password length
    if(password.length < 6) {
        errors.push({msg: 'password should be a5 least 6 characters'});
    }

    if (errors.length> 0) {
    res.render('register',{
        errors,
        name,
        email,
        password,
        password2
    });
    }else {
        res.send('pass');
    }

});



module.exports = router;
