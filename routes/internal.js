var express = require('express');
var router = express.Router();
const AccountStats = require("../models/AccountStats.js");

router.get('/clean_token_data', function(req, res){
    AccountStats.cleanInputData();
    res.send({"message": "success"});
})

module.exports = router;