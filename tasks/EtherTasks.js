var Web3 = require("web3");
var fs = require('fs');
const ObjectUtils = require('../utils/ObjectUtils');
const ABIUtils = require('../utils/ABIUtils');
var latestBlockNumber = -1;
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"));
const moment = require('moment');
const BlockUtils = require('../utils/BlockUtils.js');

module.exports = {
    startQueryTasks: function() {

        const etherQueryEntry = "data/entry/EthereumQuery.json";
        var queryEntryValue = fs.readFileSync(etherQueryEntry, "utf8").toString();

        if (queryEntryValue && queryEntryValue !== "") {
            queryDailyTransactions();
            queryLatestBlock(web3, "pending");
            queryLatestBlock(web3, "latest");
        }
        setInterval(function(web3){
           queryEntryValue = fs.readFileSync(etherQueryEntry, "utf8").toString();
            try {  
                if (queryEntryValue && queryEntryValue !== "") {    
                    console.log("Query Ethereum Stats");
                    queryLatestBlock(web3, "pending");
                    queryLatestBlock(web3, "latest");
                }
            } catch (e) {
                
            }
        }, 1000, web3);
    
    // Every 24 hours Refresh the timestamp log file
    setInterval(function(){
        if (queryEntryValue && queryEntryValue !== "") {
            queryDailyTransactions();
        }
    }, 60 * 60* 1000);
    
    }
}

function queryLatestBlock(web3, type) {
    
    web3.eth.getBlock(type).then(function(blockStatsResponse){
        const {transactions, number} = blockStatsResponse;
        const gasUsedString = web3.utils.hexToNumberString(blockStatsResponse.gasUsed).toString();
        const blockStatsPayload = {
            "blockNumber": blockStatsResponse.number,
            "extraData": web3.utils.hexToAscii(blockStatsResponse.extraData),
            "gasUsed": web3.utils.fromWei(gasUsedString, 'gwei'),
            "timestamp": blockStatsResponse.timestamp,
            "miner": blockStatsResponse.miner,
            "numTxns": blockStatsResponse.transactions.length,
            "unclesMined": blockStatsResponse.uncles.length,
            "size": blockStatsResponse.size
        }
        if (number !== latestBlockNumber) {
            latestBlockNumber = number;
            const txnLength = transactions.length;
            let txnRecievedCounter = 0;
            let transactionDataArray = [];
            transactions.forEach(function(tItem, tIdx){
                web3.eth.getTransaction(tItem).then(function(transactionRes){
                    txnRecievedCounter ++;
                    if (ObjectUtils.isNonEmptyObject(transactionRes)) {
                        transactionDataArray.push(transactionRes);
                    }
                    if (txnRecievedCounter === txnLength) {
                        fs.writeFileSync(`data/${type}Block.json`, JSON.stringify(blockStatsPayload), 'utf8');
                        
                        fs.writeFileSync(`data/${type}BlockTransactions.json`, JSON.stringify(transactionDataArray), 'utf8');
                        
                        txnRecievedCounter = 0;
     
                    }
                }, txnRecievedCounter);
            });
        }
    });
}


/**
 * Method to query number of txns for each black
 * This data can be collated to find number of txns per hour
 */
function queryDailyTransactions() {
    web3.eth.getBlock("latest").then(function(response){
        const latestBlock = response.number;
        const latestTimestamp = response.timestamp;
        const timestampYesterday = latestTimestamp - 24 * 60 * 60;
        var batch = new web3.BatchRequest();
        
        let counter = 0;

        let gasUsedCounter = 0;
        const blockDayRange = 6600 ;
        
        let blockRangeMin  = latestBlock - blockDayRange;
        
        let txByHour = {}
        
        for (let a =latestBlock; a > blockRangeMin; a--) {
            batch.add(web3.eth.getBlock(a).then(function(blockRespose){
                const currentBlockTimestamp = blockRespose.timestamp;
                if (currentBlockTimestamp >= timestampYesterday) {
                  let blockTSIndex = Math.ceil((currentBlockTimestamp - timestampYesterday)/(60*60));
                  if (txByHour[blockTSIndex]) {
                    txByHour[blockTSIndex]['gasUsed'] +=  blockRespose.gasUsed;
                    txByHour[blockTSIndex]['transactions'] += blockRespose.transactions.length;
                  } else {
                     txByHour[blockTSIndex] = {"gasUsed": blockRespose.gasUsed, "transactions": blockRespose.transactions.length}; 
                  }
                } 
                counter ++ ;
                if (counter === blockDayRange) {
                    let txPayload = Object.keys(txByHour).map(function(key){
                        let payloadIdx = Number(key) - 1;
                        return Object.assign({}, {'index': payloadIdx}, txByHour[key]);
                    });
                    console.log("Writing Ether hourly transactions");
                    fs.writeFileSync(`data/EtherHourlyTransactions.json`, JSON.stringify(txPayload), 'utf8');
                }
            }, counter, gasUsedCounter, txByHour).catch(function(err){
            }));
        }
        batch.execute();
    }).catch(function(err){
        console.log("Caught error in execution");
    });
}
