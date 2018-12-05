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

const Web3 = require("web3");
const provider = process.env.WEB3_PROVIDER;
const web3 = new Web3(new Web3.providers.HttpProvider(provider));

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
  getSearchStringType: function(searchString) {
    const digitTest = new RegExp(/^\d+$/);
    if (digitTest.test(searchString)) {
      return web3.eth.getBlockNumber().then(function(currBlockNum){
        if (Number(searchString) <= currBlockNum) {
          return "block";
        } else {
          return "invalid block";
        }
      })
    } else if (!searchString.startsWith("0x")) {
        let lowerSearchString = searchString.toLowerCase();
        return fs.readFileAsync("data/TopTokens.json", 'utf8').then(function(tokenRes){
          const tokenResponseJson = JSON.parse(tokenRes);
          let tokenFoundResponse =  tokenResponseJson.tokens.find(function(item){
            return item.name.toLowerCase() === lowerSearchString || item.symbol.toLowerCase() === lowerSearchString; 
          });
          if (tokenFoundResponse) {
            return "token";
          }
        })   
    } else if (searchString.startsWith("0x")) {
        return web3.eth.getTransaction(searchString).then(function(txResponse){
          if (txResponse) {
            return "transaction";
          }
        }).catch(function(err){
            return web3.eth.getCode(searchString).then(function(res){
              if (res && res.toLowerCase() === "0x"){
                return "account";
              } else {  
                return "contract"; 
              }
          }).catch(function(err){
            return "invalid";
          })
        })


    }
  }
}

function checkIfValIsToken() {
  
}

function checkifValIsContract(searchString) {

}

function checkIfValIsAddress(searchString) {
  
}

