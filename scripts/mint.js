const HDWalletProvider = require("truffle-hdwallet-provider")
const zokratesProof = require("../zokrates/code/square/proof.json");
const web3 = require('web3')
const OWNER_ADDRESS = process.env.OWNER_ADDRESS
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
const NETWORK = process.env.NETWORK
const MINT_COUNT = 12
const MNEMONIC = process.env.MNEMONIC
const INFURA_KEY = process.env.INFURA_KEY

if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
    console.error("Please set a mnemonic, infura key, owner, network, and contract address.")
    return
}

const contract = require('../eth-contracts/build/contracts/SolnSquareVerifier.json'); 
const ABI = contract.abi;

async function main() {
    const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/v3/${INFURA_KEY}`)
    const web3Instance = new web3(
        provider
    )

    if (CONTRACT_ADDRESS) {
        const r2token = new web3Instance.eth.Contract(ABI, CONTRACT_ADDRESS, { gasLimit: "1000000" })
        // tokens issued directly to the owner.
        for (let i = 20; i < MINT_COUNT + 20; i++) {
            try {
                let proofs = Object.values(zokratesProof.proof);
                let inputs = zokratesProof.inputs;
                let tx = await r2token.methods.addSolution(OWNER_ADDRESS, i, ...proofs, inputs).send({ from: OWNER_ADDRESS });
                console.log("Solution added. Transaction: " + tx.transactionHash);
                tx = await r2token.methods.mint(OWNER_ADDRESS, i).send({ from: OWNER_ADDRESS });
                console.log("Minted item. Transaction: " + tx.transactionHash);
            } catch (e) {
                console.log(e);
            }
        }
    }
}

main()