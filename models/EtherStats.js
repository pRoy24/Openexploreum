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

var Web3 = require("web3");
const provider = process.env.WEB3_PROVIDER;
const web3 = new Web3(new Web3.providers.HttpProvider(provider));
const moment = require('moment');
var fs = require('fs');

fs.readFileAsync = function(filename) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, function(err, data){
            if (err) 
                reject(err); 
            else 
                resolve(data);
        });
    });
};

module.exports = {
    getStats: function() {
        return fs.readFileAsync("data/latestBlock.json", 'utf8').then(function(latestBlock){
            return fs.readFileAsync("data/latestBlockTransactions.json", 'utf8').then(function(latestBlockTransactions){
                return fs.readFileAsync('data/pendingBlockTransactions.json', 'utf8').then(function(pendingBlockTransactions){
                    return web3.eth.getGasPrice().then(function(gasPrice){
                        latestBlock = JSON.parse(latestBlock);
                        return {
                            "latestBlock": latestBlock,
                            "latestBlockTransactions": JSON.parse(latestBlockTransactions),
                            "pendingBlockTransactions": JSON.parse(pendingBlockTransactions),
                            "top": latestBlock.blockNumber,
                            "gasPrice": gasPrice
                        }       
                    })  
                })
            })
        }).catch(function(err){
            console.log(err);
        });
    },

    getHourlyTransactionStats: function() {
        return fs.readFileAsync("data/EtherHourlyTransactions.json", "utf8").then(function(transactionData){
            return JSON.parse(transactionData);
        })
    },
    
    startQueryEthereumStats: function() {
        fs.writeFileSync("data/entry/EthereumQuery.json", "query", "utf8");
    },
    
    stopQueryEthereumStats: function() {
        fs.writeFileSync("data/entry/EthereumQuery.json", "", "utf8");
    }
}


