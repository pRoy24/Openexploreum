var MinimumABI = require('../utils/ABIUtils');
const fs = require("../utils/FSUtils");
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"));
var BN = web3.utils.BN;
const BlockUtils = require('../utils/BlockUtils');
const UserInputStats = require('./UserInputStats');

module.exports = {
  getTokenContract: function(token) {
    return UserInputStats.getSearchStringType(token).then(function(response){
      if (response === "contract") {
        return token;
      } else {
        const tokenNorm = token.toLowerCase();
        return fs.readFileAsync("data/TopTokens.json").then(function(tokenData){
          const tokenDataJSON = JSON.parse(tokenData);
          const currentToken = tokenDataJSON.tokens.find(function(item, idx){
            return item.name.toLowerCase() === tokenNorm || item.symbol.toLowerCase() === tokenNorm;
          });
          if (currentToken) {
            return currentToken.address;
          } else {
            return null;
          }
        })
      }
    })

  },
  
  getTokenIntro: function(tokenContractAddress) {
    console.log(tokenContractAddress);
    var CurrentContract = new web3.eth.Contract(MinimumABI, tokenContractAddress);
    return CurrentContract.methods.totalSupply().call().then(function(totalSupply){
      return CurrentContract.methods.decimals().call().then(function(decimals){
        return CurrentContract.methods.symbol().call().then(function(symbol) {
          return CurrentContract.methods.name().call().then(function(name){
            const result = {"name": name, "symbol": symbol,
                          "totalSupply": totalSupply, "decimals": decimals, "contract": tokenContractAddress};
            return result;                
          })
        })
      });
    }).catch(function(err){
      return {};
    })
  },
  
  getTokenDetails: function(tokenContractAddress) {
    return fs.readFileAsync("data/TokenDayTransactionHistory.json").then(function(response){
      const responseJSON = JSON.parse(response);
      const tokenAddress = responseJSON.address;
      console.log(tokenAddress);
      if (tokenAddress === tokenContractAddress) {
      return fs.readFileAsync("data/TokenHourlyTransactions.json").then(function(txPerHourResponse){
      const txPerHourJson = JSON.parse(txPerHourResponse);



      const tokenDetailResponse = responseJSON.transactions;
      const numTopics = 0;
      const totalTxns = tokenDetailResponse.length;
      let verifiedTxns = 0;
      let logs = 0;
      let totalGasUsed = 0;
      tokenDetailResponse.forEach(function(item){
        logs += item.receipt && item.receipt.logs ? item.receipt.logs.length : 0;
        verifiedTxns += item.receipt && item.receipt.status ? 1 : 0;
        totalGasUsed += item.receipt && item.receipt.gasUsed ? item.receipt.gasUsed : 0;
      })

      return {"payload": tokenDetailResponse, "totalTransactions": totalTxns, "verifiedTransactions": verifiedTxns,
              "totalLogs": logs, "totalGasUsed": totalGasUsed, "txPerHour": txPerHourJson};
    
      });
      } else {

        return {};
      }
      });
  },
  
  createTokenTaskEntry: function(tokenSymbol) {
    return UserInputStats.getSearchStringType(tokenSymbol).then(function(response){
      if (response === "contract") {
        fs.writeFileSync("data/entry/TokenQuery.json", tokenSymbol, "utf8");
        return {"message": "created contract address entry"};
      } else {  
   return getTokenContractAddress(tokenSymbol).then(function(tokenAddress){
      fs.writeFileSync("data/entry/TokenQuery.json", tokenAddress, "utf8");
      return {"message": "created contract address entry"};
    });
      }
      });
  },
  removeTokenTaskEntry: function(tokenSymbol) {
    fs.writeFileSync("data/entry/TokenQuery.json", "", "utf8");
    // fs.unlinkSync("data/TokenDayTransactionHistory.json");
  }
}


function getTokenContractAddress(symbol) {
    const tokenNorm = symbol.toLowerCase();
    return fs.readFileAsync("data/TopTokens.json").then(function(tokenData){
      const tokenDataJSON = JSON.parse(tokenData);
      const currentToken = tokenDataJSON.tokens.find(function(item, idx){
        return item.name.toLowerCase() === tokenNorm || item.symbol.toLowerCase() === tokenNorm;
      });
      if (currentToken) {
        return currentToken.address;
      } else {
        return null;
      }
    })
}