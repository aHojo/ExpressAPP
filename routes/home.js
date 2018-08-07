const express = require('express');
const router = express.Router();

router.get("/", function(req, res) {
    //Index is defined in views. 
    //Inside the object, we define all the params that will be set in our index.pug file.
    res.render('index', {"title": 'My Express App', "message": "Hello"});
});

module.exports = router;