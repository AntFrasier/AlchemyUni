const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    const owner = await ethers.provider.getSigner(0);
    const address = await owner.getAddress();

    return { game, address };
  }
  it('should be a winner', async function () {
    const { game ,address} = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    await game.write(address);

    await game.win(address);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
