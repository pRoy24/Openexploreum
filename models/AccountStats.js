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

var MinimumABI = require('../utils/ABIUtils');
const fs = require("../utils/FSUtils");
const Web3 = require("web3");
const provider = process.env.WEB3_PROVIDER;
const web3 = new Web3(new Web3.providers.HttpProvider(provider));
var BN = web3.utils.BN;

module.exports = {
  getAccountDetails: function(accountAddrress) {
    return fs.readFileAsync("data/TopTokens.json").then(function(dataResponse){
      const tokenData = JSON.parse(dataResponse);
      return Promise.all(tokenData.tokens.map(function(tokenItem){
          const currentContract = new web3.eth.Contract(MinimumABI, tokenItem.address);
          return currentContract.methods.balanceOf(accountAddrress).call().then(function(balanceResponse){
            return {"token": tokenItem, "balance": web3.utils.fromWei(balanceResponse)};
          }).catch(function(err){
            return null;
          });
      }));
    })
  },

  cleanInputData: function() {
    const data = fs.readFileSync("data/TopTokens.json");
    const dataJSON = JSON.parse(data);
    let cleanData = dataJSON.tokens.map(function(item){
      return {"name": item.name, "symbol": item.symbol, "address": item.address};
    })
    let finalString = JSON.stringify({"tokens": cleanData});
    fs.writeFileSync("data/TopTokens.json", finalString);
  },
  
  getAccountLatestTransactions: function(search) {
    return web3.eth.getBlock("latest").then(function(latestBlockResponse){
      return Promise.all(latestBlockResponse.transactions.map(function(latestTransaction){
        return web3.eth.getTransaction(latestTransaction).then(function(latestTransactionResponse){
          if (latestTransactionResponse.from === search || latestTransactionResponse.to === search) {
            return web3.eth.getTransactionReceipt(latestTransaction).then(function(latestTransactionReceiptResponse){
              return {"transaction": latestTransactionResponse, "receipt": latestTransactionReceiptResponse}
            })
          } else {
            return null;
          }
        });
      }));
    });
  },
  
  getAccountPendingTransactions: function(search) {
    return web3.eth.getBlock("pending").then(function(pendingBlockResponse){
      return Promise.all(pendingBlockResponse.transactions.map(function(pendingTransaction){
        return web3.eth.getTransaction(pendingTransaction).then(function(pendingTransactionResponse){
          if (pendingTransactionResponse && 
             (pendingTransactionResponse.from === search || pendingTransactionResponse.to === search)) {
            return {"transaction": pendingTransactionResponse, "receipt": {}};
          } else {
            return null;
          }
        });
      }));    
    });
  },
  
  queryAccountDayTransactions: function(accountAddrress) {
      fs.writeFileSync("data/AccountAddressEntry.json", accountAddrress, "utf8");
      return {"message": "created contract address entry"};
  }
  

}

