const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

describe('Faucet', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const Faucet = await ethers.getContractFactory('Faucet');
    const faucet = await Faucet.deploy({value : ethers.utils.parseUnits('2', 'ether')});

    const [owner] = await ethers.getSigners();

    let withdrawAmount = ethers.utils.parseUnits('1', 'ether');
    

    console.log('Signer 1 address: ', owner.address);
    return { faucet, owner, withdrawAmount };
  }

  it('should deploy and set the owner correctly', async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  it('should block withdraw > 0.1 eth', async function () {
    const { faucet , withdrawAmount} = await loadFixture(deployContractAndSetVariables);

    await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
  });

  it('should allow withdraw < 0.1 eth', async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    await expect( faucet.withdraw(ethers.utils.parseUnits('0.09', 'ether'))).not.to.be.reverted;
  });
});