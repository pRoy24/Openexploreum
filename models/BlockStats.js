var MinimumABI = require('../utils/ABIUtils');
const fs = require("../utils/FSUtils");
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"));
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