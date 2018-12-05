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
  getBlockDetails: function(blockNumber) {
    return web3.eth.getBlock(blockNumber).then(function(blockDetailResponse){
      const {transactions} = blockDetailResponse;
      if (transactions.length > 0) {
        return getTransactionDetails(transactions).then(function(bdResponse){
          return {"block": blockDetailResponse, "transactionDetails": bdResponse};
        })
      } else {
        return {"block": blockDetailResponse};
      }
    });    
  },
  getBlockIntro: function(blockNumber) {
    return web3.eth.getBlock(blockNumber).then(function(blockStatsResponse){
        const blockStatsPayload = {
            "blockNumber": blockStatsResponse.number,
            "extraData": web3.utils.hexToAscii(blockStatsResponse.extraData),
            "gasUsed": web3.utils.fromWei(web3.utils.hexToNumberString(blockStatsResponse.gasUsed), 'gwei'),
            "gasLimit": web3.utils.fromWei(web3.utils.hexToNumberString(blockStatsResponse.gasLimit), 'gwei'),
            "timestamp": blockStatsResponse.timestamp,
            "miner": blockStatsResponse.miner,
            "numTxns": blockStatsResponse.transactions.length,
            "unclesMined": blockStatsResponse.uncles.length,
            "size": blockStatsResponse.size,
            "nonce": blockStatsResponse.nonce,
            "difficulty": blockStatsResponse.difficulty,
            "parentHash": blockStatsResponse.parentHash
        }
      return blockStatsPayload;  
    });
  }
}

function getTransactionDetails(transactionHashList){
   return Promise.all(transactionHashList.map(function(txHash, hIdx){
     return web3.eth.getTransaction(txHash).then(function(txResponse){
      return web3.eth.getTransactionReceipt(txHash).then(function(txReceipt){
        return Object.assign({}, {"transaction": txResponse}, {"receipt": txReceipt});
      });
    });
  }));
}