// Copyright 2018 Tokenplex LLC. https://tokenplex.io. proy24

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
// or implied. See the License for the specific language governing
// permissions and limitations under the License.

var express = require('express');
var router = express.Router();
const AccountStats = require("../models/AccountStats.js");

router.get('/clean_token_data', function(req, res){
    AccountStats.cleanInputData();
    res.send({"message": "success"});
})

module.exports = router;