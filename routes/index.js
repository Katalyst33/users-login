const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');





//home  welcome page
router.get('/', (req,res) => res.render("welcome"));

//Dasboard
router.get('/dashboard', ensureAuthenticated, (req,res) =>
    res.render('dashboard',{
        name: req.user.name
        }));


module.exports = router;
