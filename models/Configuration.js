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

const fs = require("../utils/FSUtils.js");

module.exports = {
  getConfiguration: function() {
    return fs.readFileAsync(".env").then(function(configData){
      const configDataString = configData.toString();
      const configArray = configDataString.split("\n");
      const provider = configArray[0].split("WEB3_PROVIDER=")[1];
      const configCreated = configArray[1].split("CONFIG_CREATED=")[1];
      return {provider, configCreated};
    });
  },
  createConfiguration: function(payload) {

    const payloadString = `WEB3_PROVIDER=${payload}\nCONFIG_CREATED=true`
    return fs.writeFileAsync(".env", payloadString).then(function(writeReponse){
      return writeReponse;
    })
  }
}