const express = require('express');
const router = express.Router();




//home page
router.get('/', (req,res) => res.render("welcome"));

//Dasboard

module.exports = router;
