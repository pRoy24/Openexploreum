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
const EtherStats = require('../models/EtherStats.js');
const UserInputStats = require('../models/UserInputStats.js');
const TokenStats = require('../models/TokenStats.js');
const BlockStats = require('../models/BlockStats.js');
const TransactionStats = require('../models/TransactionStats.js');
const AccountStats = require("../models/AccountStats.js");
const Configuration = require('../models/Configuration.js');

/* GET home page. */
router.get('/ethereum_stats', function(req, res, next) {
    EtherStats.getStats().then(function(etherDataResponse){
        //console.log(etherDataResponse);
        res.send({"message": "success", "data": etherDataResponse});
    });
});


router.get('/hourly_transaction_stats', function(req, res, next){
   EtherStats.getHourlyTransactionStats().then(function(txDataResponse){
       res.send({"message": "success", "data": txDataResponse});
   }); 
});

router.get('/search_string_type', function(req, res){
    const {search} = req.query;
    UserInputStats.getSearchStringType(search).then(function(inputTypeResponse){
        res.status(200).send({"message": "success", "data": inputTypeResponse});
    })
});

router.get('/token_details', function(req, res){
    const {token} = req.query;

    TokenStats.getTokenContract(token).then(function(tokenContractResponse){
        if (tokenContractResponse) {
            TokenStats.getTokenDetails(tokenContractResponse).then(function(tokenDetails){
                res.send({"message": "success", "data": tokenDetails});
            })
        } else {
            res.status(400).send({"error": "Could not find token with given name", "data": []})
        }
    });
});

router.get('/token_hourly_transaction_stats', function(req, res){
  res.send({"message": "success"});
});

router.get('/token_intro', function(req, res){
    const {token} = req.query;
    TokenStats.getTokenContract(token).then(function(tokenContractResponse){
        if (tokenContractResponse) { 
            TokenStats.getTokenIntro(tokenContractResponse).then(function(introResponse){
                if (introResponse) {
                  res.send({"message": "success", "data": introResponse});      
                }
            })
        }
    });
});

router.get('/block_intro', function(req, res){
  const {search} = req.query;
  BlockStats.getBlockIntro(search).then(function(blockIntroResponse){
      res.send({"data": blockIntroResponse, "message": "success"});
  }).catch(function(err){
     res.status(500).send({"error": "could not fetch block info", data: []}) 
  });
});

router.get('/block_details', function(req, res){
   const {search} = req.query;
   BlockStats.getBlockDetails(search).then(function(blockDetailResponse){
       res.send({"data": blockDetailResponse, "message": "success"});
   }).catch(function(err){
       res.status(500).send({"error": "could not fetch block details", "data": []})
   });
});

router.get('/transaction_details', function(req, res){
    const {search} = req.query;
    TransactionStats.getTransactionDetail(search).then(function(txDetailResponse){
        if (txDetailResponse) {
            res.send({"message": "success", "data": txDetailResponse}); 
        } else {
            res.status(400).send({"message": "invalid tx hash", "data": {}});
        }
    });
});

router.get('/account_details', function(req, res){
    const {search} = req.query;
   AccountStats.getAccountDetails(search).then(function(balanceResponse){
        res.send({"message": "success", "data": balanceResponse.filter(Boolean)}); 
   });    
});

router.get('/account_latest_transactions', function(req, res){
    const {search} = req.query;
   AccountStats.getAccountLatestTransactionDetails(search).then(function(response){
       res.send({"message": "success", data: response})
   }) 
});

router.get('/account_pending_transactions', function(req, res){
   const {search} = req.query;
   AccountStats.getAccountLatestTransactionDetails(search).then(function(response){
       res.send({"message": "success", data: response})
   }) 
});

router.get('/account_transaction_details', function(req, res){
   const {search} = req.query; 
   AccountStats.getAccountTransactionDetails(search).then(function(searchResponse){
       console.log(searchResponse.filter(Boolean));
   });
});

router.get('/query_token_daily_transactions', function(req, res){
  const {search} = req.query;
  TokenStats.createTokenTaskEntry(search).then(function(entryResponse){
    res.send({"message": "success", data: entryResponse});
  });
});

router.get('/stop_query_token_daily_transactions', function(req, res){
  const {search} = req.query;
  TokenStats.removeTokenTaskEntry(search);
  res.send({"message": "success"});
});

router.get('/account_current_transactions', function(req, res){
  const {search} = req.query;
  return AccountStats.getAccountLatestTransactions(search).then(function(currentTransactionResponse){
    return AccountStats.getAccountPendingTransactions(search).then(function(pendingTransactionResponse){
        const payload = {"latest": currentTransactionResponse.filter(Boolean),
                         "pending": pendingTransactionResponse.filter(Boolean)};
        res.send({"message": "success", "data": payload});
    });
  });
});

router.get('/account_daily_transactions', function(req, res){
  res.send({"message": "success"});  
});

router.get('/query_account_day_transactions', function(req, res){
  const {search} = req.query;
  AccountStats.queryAccountDayTransactions(search);
  res.send({"message": "success"});  
});

router.get('/stop_query_account_daily_transactions', function(req, res){
  res.send({"message": "success"});  
});

router.get('/start_query_ethereum_stats', function(req, res){
  EtherStats.startQueryEthereumStats();
  res.send({"message": "success"});  
});

router.get('/stop_query_ethereum_stats', function(req, res){
  EtherStats.stopQueryEthereumStats();
  res.send({"message": "success"});
});

router.get('/configuration', function(req, res){
  Configuration.getConfiguration().then(function(configResponse){
    res.send({"message": "success", "data": configResponse});
  }).catch(function(err){
    res.status(500).send({"message": "failure", "data": "could not fetch configuration"});
  })
});

router.post('/configuration', function(req, res){
  const {provider} = req.body;

  Configuration.createConfiguration(provider).then(function(configResponse){
    res.send({"message": "success", "data": configResponse});
  }).catch(function(err){
    res.status(500).send({"message": "failure", "data": "could not create configuration"});    
  })
});

module.exports = router;
