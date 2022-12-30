const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    const signers = await ethers.getSigners();
    

    return { game, signers};
  }
  it('should be a winner', async function () {
    const { game, signers } = await loadFixture(deployContractAndSetVariables);
    const threshold = ethers.BigNumber.from("0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf") ;
    let win = false;
    let watchDog = 10000; // to avoid an infinite loop
    while (!win && watchDog>0) {
      let wallet =  ethers.Wallet.createRandom();
      let signer = wallet.connect(ethers.provider);
      await signers[0].sendTransaction({to: signer.address, value: ethers.utils.parseEther("0.3")}) //to signer to pay gas
      let number = ethers.BigNumber.from(signer.address)
      console.log( "Try : " ,signer.address)
      if (number.lt(threshold) ) {
        console.log(signer.address, " You Win")
        await game.connect(signer).win();
        win = true;

      }
      watchDog--;
    }

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
