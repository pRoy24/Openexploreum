const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"));

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

