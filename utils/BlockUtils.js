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
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"));
const fs = require("./FSUtils");

module.exports = {
  // Currently only supports 1 day
  getBlockDaysBefore: function(days) {
   return web3.eth.getBlock("latest").then(function(latestBlock){
        let latestTS = latestBlock.timestamp;

        const tsBefore = latestTS - 24 * 60 * 60 * days;

        return fs.readFileAsync("data/BlockTimestampMap.json", "utf8").then(function(tsMapString){
          const tsMap = JSON.parse(tsMapString);

          if (tsMap[tsBefore]) {
            return {"block": tsMap[tsBefore.toString()], "timestamp": tsBefore.toString()};
          } else {
            let found = false;
            let foundIndex = -1;
            for (var a = tsBefore; a < latestTS; a++){
              let key = a.toString();
              if (tsMap[key]) {
                found = true;
                foundIndex = key;
                break;
              }
            }
            if (found) {
              const tsString = foundIndex.toString();
              console.log("Index at "+tsString);
              return {"block": tsMap[tsString], "timestamp": tsString};
            } else {
              return {};
            }
          }
      });
    });
  }
}

