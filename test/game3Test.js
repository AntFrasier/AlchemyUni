const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require("hardhat");

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();

    
    const [owner, addr1, addr2] = await ethers.getSigners(); //getting an array of signers
    console.log(owner, addr1, addr2)
    

    // you can get that signer's address via .getAddress()
    // this variable is NOT used for Contract 3, just here as an example
    // const address = await signer.getAddress();

    return { game, owner, addr1, addr2 };
  }

  it('should be a winner', async function () {
    const { game, owner, addr1, addr2 } = await loadFixture(deployContractAndSetVariables);

    // you'll need to update the `balances` mapping to win this stage

    // to call a contract as a signer you can use contract.connect
    await game.connect(owner).buy({ value: '10' });
    await game.connect(addr1).buy({ value: '15' });
    await game.connect(addr2).buy({ value: '5' });

    const address1 = await owner.getAddress();
    const address2 = await addr1.getAddress();
    const address3 = await addr2.getAddress();
    // // TODO: win expects three arguments
    // // require(balances[addr3] > 0);
    // // require(balances[addr2] > balances[addr1]);
    // // require(balances[addr1] > balances[addr3]);
    await game.connect(owner).win(address1,address2,address3);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
