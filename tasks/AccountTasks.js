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

const fs = require("../utils/FSUtils");
const BlockUtils =require('../utils/BlockUtils');
const Web3 = require("web3");
const provider = process.env.WEB3_PROVIDER;
const web3 = new Web3(new Web3.providers.HttpProvider(provider));

module.exports = {
  startAccountTasks: function() {
    const TxHistoryFile = 'data/AccountDayTransactionHistory.json';
    const TokenEntryFile = 'data/AccountAddressEntry.json';
    
    var prevEntry = "";
    
    setInterval(function(){

      if (fs.existsSync(TokenEntryFile)) {
        var newEntry = fs.readFileSync(TokenEntryFile, 'utf8');
        if (newEntry.trim() !== prevEntry.trim() && newEntry !== "") {

          prevEntry = newEntry;
         //queryAccountTasks();
        } else {
            prevEntry = newEntry;
        }
      }
    }, prevEntry, 1000);
  }
}

function queryAccountTasks() {
  fs.readFileAsync("data/AccountAddressEntry.json").then(function(accountEntryResponse){
    if (accountEntryResponse) {
      const accAddress = accountEntryResponse.toString();

      
      var accountTaskList = [];
      var batch = new web3.BatchRequest();
      web3.eth.getBlock("latest").then(function(latestBlockResponse){
      return BlockUtils.getBlockDaysBefore(1).then(function(previousBlockMap){
        const latestBlock = latestBlockResponse.number;
        const previousBlock = Number(previousBlockMap['block']);
        const timestampYesterday = Number(previousBlockMap['timestamp']);

        let internalCounter = 0;
        let blockList = [];

        for (let counter = latestBlock; counter >= previousBlock; counter --) {
          blockList.push(counter);
        }
        getTransactions(blockList).then(function(txList){
          getTransactionDetails(txList.flat(), accAddress).then(function(value){

          })
        })

      });
                  
      }).catch(function(err){
        console.log("Caught error in query accounts");
      })
    }
  })
}

function getTransactions(blockList) {
  return Promise.all(blockList.map(function(block){
    return web3.eth.getBlock(block).then(function(blockResponse){
      return blockResponse.transactions;
    });
  }));
}

function getTransactionDetails(txList, address) {

  return Promise.all(txList.map(function(tx){
    return web3.eth.getTransaction(tx).then(function(txResponse){
      if (txResponse.from.toString() === address|| txResponse.to.toString() === address) {
        return txResponse;
      } else {
        return null;
      }
    })
  }));
}