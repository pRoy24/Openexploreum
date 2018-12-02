var MinimumABI = require('../utils/ABIUtils');
const fs = require("../utils/FSUtils");
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"));
var BN = web3.utils.BN;
const BlockUtils =require('../utils/BlockUtils');


module.exports = {
  startTokenTasks: function() {
    // Check for file exists if not query
    const TxHistoryFile = 'data/TokenDayTransactionHistory.json';
    const TokenEntryFile = 'data/entry/TokenQuery.json';

    var prevEntry = "";
    var newEntry = "";
    setInterval(function(){
      if (fs.existsSync(TokenEntryFile)) {
        newEntry = fs.readFileSync(TokenEntryFile, 'utf8').toString();
        if (newEntry.trim() !== prevEntry.trim() && newEntry !== "" && newEntry !== null) {
          prevEntry = newEntry;
          queryTokenTasks();
        } else {
            prevEntry = newEntry;
        }
      }
    }, 100);

    // Refresh the transactions every 30 seconds
    setInterval(function(){
      queryTokenTasks();
    }, 30000);
  }
}

function queryTokenTasks() {
  const tokenAddress = fs.readFileSync("data/entry/TokenQuery.json", "utf8");
  if (tokenAddress) {
    console.log("Querying token transaction entry");
    var MyContract = new web3.eth.Contract(MinimumABI, tokenAddress);
    let txByHour = {}

    BlockUtils.getBlockDaysBefore(1).then(function(previousBlockMap){

    const previousBlock = Number(previousBlockMap['block']);
    const timestampYesterday = Number(previousBlockMap['timestamp']);

   MyContract.getPastEvents("allEvents", {fromBlock: previousBlock,
    toBlock: 'latest'}).then(function(pastEvents){
    
    var batch = new web3.BatchRequest();
    let tokenTxDayHistory = [];
    let counter = 0;
    let gasUsedCounter = 0;
    for (let a = 0; a < pastEvents.length; a ++) {
      const {transactionHash, blockNumber} = pastEvents[a];
      batch.add(
        web3.eth.getBlock(blockNumber).then(function(blockResponse){
          web3.eth.getTransaction(transactionHash).then(function(txDetail){
            web3.eth.getTransactionReceipt(transactionHash).then(function(txReceipt){
              const {timestamp, number} = blockResponse;
              const currentBlockTimestamp = blockResponse.timestamp;

              if (currentBlockTimestamp >= timestampYesterday) {
                let blockTSIndex = Math.ceil((currentBlockTimestamp - timestampYesterday)/(60*60));
                if (txByHour[blockTSIndex]) {
                  txByHour[blockTSIndex]['gasUsed'] +=  blockResponse.gasUsed;
                  txByHour[blockTSIndex]['transactions'] += blockResponse.transactions.length;
                } else {
                   txByHour[blockTSIndex] = {"gasUsed": blockResponse.gasUsed, "transactions": blockResponse.transactions.length}; 
                }
              }
              tokenTxDayHistory.push({"block": {"number": number, "timestamp": timestamp}, "transaction": txDetail, "receipt": txReceipt});
              // If counter save
              counter ++;
              if (counter === pastEvents.length) {
                const txMap = Object.keys(txByHour).map(function(key){
                        let payloadIdx = Number(key) - 1;
                        return Object.assign({}, {'index': payloadIdx}, txByHour[key]);
                })
                fs.writeFileSync("data/TokenDayTransactionHistory.json", JSON.stringify({"address": tokenAddress, "transactions": tokenTxDayHistory}), "utf8");
                fs.writeFileSync("data/TokenHourlyTransactions.json", JSON.stringify({"address": tokenAddress, "transactions": txMap}), 'utf8');
                console.log("Done writing token transaction stats");
              }
            }, counter, gasUsedCounter, txByHour, tokenTxDayHistory).catch(function(err){
          })}, counter, gasUsedCounter, txByHour, tokenTxDayHistory).catch(function(err){
            })}, counter, gasUsedCounter, txByHour, tokenTxDayHistory).catch(function(err){
        }));
    }  
    batch.execute();
  }).catch(function(err){
    
  });

}).catch(function(err){
      console.log("Caught error in token stats execution");
});
  }
}