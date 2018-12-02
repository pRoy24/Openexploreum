
const fs = require("../utils/FSUtils");
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"));
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