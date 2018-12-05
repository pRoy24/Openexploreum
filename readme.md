# What is Openexploreum
Openexploreum is a light-weight Ethereum and ERC explorer which can be connected to a local Ethereum node or one in your private VPC 
and run in airgapped mode without any client-side internet connection.
The executable creates views entirely through vanilla Web3 requests to your specified node and it does not make any requests to the public internet. (That is unless you choose to use an external provider such as Infura)

## What can you do with it?
- View and Monitor Transactions on the Ethereum blockchain.
- View Wallet balances with public address in a private manner without making any external web-service requests.
- View Gas Prices, Block-propogration, Transaction Receipts etc and most other use-case you can do with a centralized Blockchain explorers.
- Build your own personal API server and support cool applications on top of it by extending the existing API framework provided with the source.
- Extend the UI to build your own graphs, visualizations and custom views.

## What can't you do with it?
- ### You cannot view FIAT prices. 
The blockchain does not have any knowledge of how much a token is trading for at a given exchange. While it would be trivial to integrate FIAT prices by simply integrating an API query, keep in mind that every API request you send leaks data about you
beyond which it becomes trivial to link your blockchain queries to a profile and bombard you with targeted advertisements.
The other option in a pseudo-anonymous, decentralized way is through Oracles, but Oracle requests aren't free. That's because Writes on the blockchain cost money and the services providers pass the costs down to consumers. The only free price discovery Oracles today update very infrequently and stale FIAT prices are worse than no prices. Therefore in the interest of keeping the base version of the product completely free, FIAT price views are not included.

- ### You cannot make Trades.
Openexploreum is not an exchange.

- ### You cannot store Ether or tokens.
OpenExploreum is not a wallet.

- ### You cannot run it in a SAAS setting. 
Openexploreum is not intended to support multiple concurrent users on the same installation by design. Therefore every individual user must run their own installation.
The priority is to have minimal software or hardware dependancies and as such it runs on just two threads with 1 thread responding to requests sent by the UI and the other running tasks in the background depending on which view you are in (Landing, Token, Account, Transaction etc.) 
Furthermore writes are made to your local filesystem to remove any database dependancies so a task query of a particular type will overwrite another task of the same type.

## Screenshots

![](https://lh4.googleusercontent.com/BlouO4kgM91m4Os6ZKoSfZhX7YZOx5EMUSQPld0DJ-XRfD8z3vH36bq21PLp09fCzj7-mOSdGTH3HQ=w1440-h715)

## How to run in airgap mode
By default the app uses Infura web3 endpoint as the provider.
To switch to a local node or one in your private VPC, click on the provider text in top right navbar.
![](https://lh4.googleusercontent.com/4LWcivSxu4EBfnaAUWIqRLAHg0QGhvKfe6LBkHnt-OUkZDSLexzw0pCphqdUG_v8XEGCoEk6lvC51g=w1440-h715)

# Ok but why is it a big-deal?
Remember when they said that the blockchain is pseudo-anonymous and decentralized, well technically it's true but the visualization layer isn't. Everytime you check your balance at Etherscan you are sending an HTTP request and information about you such as public IP, location, system info etc.
As such linking a wallet to a user simply becomes a matter of running a SQL query to create a profile and start the vicious cycle of targeted advertising once again.


# Manifesto

1. The blockchain is decentralized, it's narrative should be as well.
2. SAAS models are convenient but a slippery slope towards centralization and concentration of power.
3. Your browsing data belongs to you and your privacy is your choice to make.
4. Privacy comes at a cost. Some choose to sacrifice privacy for convenience and speed, for others refer to point three.

# Who is it for-
- Miners who want to view streaming blockchain statistics to make decisions regarding mining oppurtunities.
- Privacy focused users who are not ok with the fact that someone is making money by harvesting your browsing data and then shoving ads in your face.
- Developers who are looking for a base layer over the Web3 interface consisting of useful APIs and helper functions.
- Analysts who want to monitor the blockchain and create reports etc.

# Running the executable
The release contain as-is builds for the product including both UI and the middleware.

Depending on your platform choose your executable.
Linux - OpenExploreum-linux
Mac OSX - OpenExploreum-macos
Windows - OpenExploreum-win.exe

Then browse to http://localhost:3000/ to view the app in action.

# Building from Source
Clone the repo from the URL.
Browse to the directory.
To run middleware do npm install and npm start
Middleware code runs at http://localhost:3000
To run the UI server in development mode 
Browse to project_source/client.
npm install 
npm start
The UI development server runs in http://localhost:3001 by default.

Note: If you change the port of the middleware server, be sure to change the proxy settings in client/package.json to the chosen port.

# License
The project is distributed freely under terms governed by Apachev2.0 license.

# Enquiries
Donations are welcome. Ethereum Address - 0x5BBD077cbb260Dd08743CdD7056244c8Ad1C8a66
If you or your team are working on a project through which you hope to disrupt existing sectors or create new ones, we provide full-stack development and system design contributions and are avaiable to work on project contracts.
Business enquiries can be sent to info@tokenplex.io or roy@tokenplex.io

