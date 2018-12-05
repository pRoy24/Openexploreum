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
const Web3 = require("web3");
const provider = process.env.WEB3_PROVIDER;
const web3 = new Web3(new Web3.providers.HttpProvider(provider));
var BN = web3.utils.BN;

module.exports = {
  getTransactionDetail: function(txHash) {
    return web3.eth.getBlock("latest").then(function(latestBlock){
    return web3.eth.getTransaction(txHash).then(function(txResponse){
      return web3.eth.getTransactionReceipt(txHash).then(function(txReceipt){
        let numConfirmations = 0;
        if (txReceipt.status) {
           numConfirmations = Number(latestBlock.number) -  txReceipt.blockNumber;
        }
        return {"transaction": txResponse, "receipt": txReceipt, "numConfirmations": numConfirmations};
      })
    })
    }).catch(function(err){
      return {};
    })
  }
}