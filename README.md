# Run Application

To start project you need [Ganache](https://archive.trufflesuite.com/ganache/) to be started at port ```http://localhost:7545```.

In all folders (app, server) you need to call ```npm install``` to install dependencies.

For deploying smart contract in ``` server/ ``` you can run ```npm run compile:deploy``` this command will compile smart contract (create abi and bytecode) and deploy it on Ganache.
To run ```server/``` just type ```npm run start```.

App is simple React application. You can read docs at [React](https://react.dev/).

## BlockChain settings

The server folder uses contract functions. For them to work correctly use:

  - Solidity Compiler 0.8.18+commit.87f61d96.Emscripten.clang ```npm install solcjs@0.8.18```
  - ERC20 from [@openzeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts) version ```v4.9.3``` ```npm install @openzeppelin/contracts@4.9.3``` 

You can do this in [RemixIDE](https://remix.ethereum.org/)
```solidity
pragma solidity ^0.8.0;
import "@openzeppelin/contracts@v4.9.3/token/ERC20/ERC20.sol";
```


