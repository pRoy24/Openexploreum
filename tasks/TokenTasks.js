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
const BlockUtils =require('../utils/BlockUtils');


module.exports = {
  startTokenTasks: function() {
    // Check for file exists if not query
    const TxHistoryFile = 'data/TokenDayTransactionHistory.json';
    const TokenEntryFile = 'data/entry/TokenQuery.json';

    var prevEntry = "";
    var newEntry = "";
    setInterval(function(){
      if (fs.existsSync(TokenEntryFile)) {
        newEntry = fs.readFileSync(TokenEntryFile, 'utf8').toString();
        if (newEntry.trim() !== prevEntry.trim() && newEntry !== "" && newEntry !== null) {
          prevEntry = newEntry;
          queryTokenTasks();
        } else {
            prevEntry = newEntry;
        }
      }
    }, 100);

  }
}

function queryTokenTasks() {
  const tokenAddress = fs.readFileSync("data/entry/TokenQuery.json", "utf8");
  if (tokenAddress) {
    console.log("Querying token transaction entry");
    var MyContract = new web3.eth.Contract(MinimumABI, tokenAddress);
    let txByHour = {}
    
    web3.eth.getBlock("latest").then(function(blockResponse){
      
    const latestBlockNum = blockResponse.number;
    const latestBlockTS = blockResponse.timestamp;

    const previousBlock = latestBlockNum - 6000;
    const timestampYesterday = latestBlockTS - 24 * 60 * 60;

   MyContract.getPastEvents("allEvents", {fromBlock: previousBlock,
    toBlock: 'latest'}).then(function(pastEvents){
    
    var batch = new web3.BatchRequest();
    let tokenTxDayHistory = [];
    let counter = 0;
    let gasUsedCounter = 0;
    for (let a = 0; a < pastEvents.length; a ++) {
      const {transactionHash, blockNumber} = pastEvents[a];
      batch.add(
        web3.eth.getBlock(blockNumber).then(function(blockResponse){
          web3.eth.getTransaction(transactionHash).then(function(txDetail){
            web3.eth.getTransactionReceipt(transactionHash).then(function(txReceipt){
              const {timestamp, number} = blockResponse;
              const currentBlockTimestamp = blockResponse.timestamp;

              if (currentBlockTimestamp >= timestampYesterday) {
                let blockTSIndex = Math.ceil((currentBlockTimestamp - timestampYesterday)/(60*60));
                if (txByHour[blockTSIndex]) {
                  txByHour[blockTSIndex]['gasUsed'] +=  blockResponse.gasUsed;
                  txByHour[blockTSIndex]['transactions'] += blockResponse.transactions.length;
                } else {
                   txByHour[blockTSIndex] = {"gasUsed": blockResponse.gasUsed, "transactions": blockResponse.transactions.length}; 
                }
              }
              tokenTxDayHistory.push({"block": {"number": number, "timestamp": timestamp}, "transaction": txDetail, "receipt": txReceipt});
              // If counter save
              counter ++;
              if (counter === pastEvents.length) {
                const txMap = Object.keys(txByHour).map(function(key){
                        let payloadIdx = Number(key) - 1;
                        return Object.assign({}, {'index': payloadIdx}, txByHour[key]);
                })
                fs.writeFileSync("data/TokenDayTransactionHistory.json", JSON.stringify({"address": tokenAddress, "transactions": tokenTxDayHistory}), "utf8");
                fs.writeFileSync("data/TokenHourlyTransactions.json", JSON.stringify({"address": tokenAddress, "transactions": txMap}), 'utf8');
                console.log("Done writing token transaction stats");
              }
            }, counter, gasUsedCounter, txByHour, tokenTxDayHistory).catch(function(err){
          })}, counter, gasUsedCounter, txByHour, tokenTxDayHistory).catch(function(err){
            })}, counter, gasUsedCounter, txByHour, tokenTxDayHistory).catch(function(err){
        }));
    }  
    batch.execute();
  }).catch(function(err){
}).catch(function(err){
    console.log(err);
      console.log("Caught error in token stats execution");
});
    });
  }
}