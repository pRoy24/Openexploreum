const express = require('express');
const path = require('path');
const cluster = require('cluster');
const EtherTasks = require('./tasks/EtherTasks');
const TokenTasks = require('./tasks/TokenTasks');
const AccountTasks = require("./tasks/AccountTasks");


if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    cluster.fork()
        .on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
        });
    cluster.fork()
        .on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
        });

} else if (cluster.worker.id === 1) {
    const app = express();
    var apiRouter = require('./routes/api');
    // Serve the static files from the React app
    
    app.use(express.static(path.join(__dirname, 'client/build')));
    
    // An api endpoint that returns a short list of items
    app.get('/api/getList', (req,res) => {
        var list = ["item1", "item2", "item3"];
        res.json(list);
        console.log('Sent list of items');
    });
    
    app.use('/api', apiRouter);
    
    // Handles any requests that don't match the ones above
    app.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname+'/client/build/index.html'));
    });
    
    const port = process.env.PORT || 3000;
    app.listen(port);
    
    console.log('App is listening on port ' + port);
    
} else {
    EtherTasks.startQueryTasks();
    TokenTasks.startTokenTasks();
    // Account Transaction queries currently take a long time 
    // and memory on a single thread and hence current implementation is not suitable in a standalone way
    // AccountTasks.startAccountTasks();
}


