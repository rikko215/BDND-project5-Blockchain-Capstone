# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

# Project overview
 > In this project you will be minting your own tokens to represent your title to the real estate properties. Before you mint a token, you need to verify your own the property. You will use zk-SNARKs to create a verification system which can prove you have title to the property without revealing that specific information on the property. Once the token has been verified you will place it on a blockchain market place (OpenSea) for others to purchase.
The detail steps of the project is as follows:
- building of the ERC 721 tokens for the real estate homes
- compiling and integrating zokrates into the tokens that is just built

It's important that before somebody can actually list a home in our marketplace, they'll have to ensure that they actually own the property and they'll be doing that do the verification using Zokrates

# How to install, test, and run
Run `npm install` before the test.
Navigate to the `eth-contracts` folder in your repo, and type `truffle test` so that all the following javascript test code will run.
- `TestERC721Mintable.js`
- `TestSquareVerifier.js`
- `TestSolnSquareVerifier.js` : The final test will be the combination of both the ERC721 token and the code that we mixed in Zokrates.
To run each test individually, run `truffle test test/TestERC721Mintable.js`.

### Zokrates
docker run -v /Users/rinatakahashi/Desktop/Development/Udacity/6.Capstone/BDND-project5-Blockchain-Capstone:/home/zokrates/code -ti zokrates/zokrates /bin/bash

### Step 4: Compile the program written in ZoKrates DSL
/path/to/zokrates compile -i <program_name>.code
/home/zokrates/code compile -i square.code

### Step 5: Generate the Trusted Setup
/path/to/zokrates setup

### Step 6: Compute Witness
/path/to/zokrates compute-witness -a <a> <b> ... <n>

### Step 7: Generate Proof
/path/to/zokrates generate-proof

### Step 8: Export Verifier
/path/to/zokrates export-verifier

# Write-up2
- Contract Addresses
- Contract Abi's
- OpenSea MarketPlace Storefront link's

# Versions

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
