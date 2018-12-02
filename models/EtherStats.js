var Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io"));
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


