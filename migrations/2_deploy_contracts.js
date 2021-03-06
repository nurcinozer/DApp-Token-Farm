const TokenFarm = artifacts.require("TokenFarm");
const DappToken = artifacts.require("DappToken");
const DaiToken = artifacts.require("DaiToken");

module.exports = async function(deployer, network, accounts) {
  // deploy mock dai token
  await deployer.deploy(DaiToken);
  const daiToken = await DaiToken.deployed();

  // deploy dapp token
  await deployer.deploy(DappToken);
  const dappToken = await DappToken.deployed();

  // deploy tokenfarm
  await deployer.deploy(TokenFarm, dappToken.address, daiToken.address);
  const tokenFarm = await TokenFarm.deployed();

  // transfer all tokens to tokenfarm (1 million)
  await dappToken.transfer(tokenFarm.address, '1000000000000000000000000');

  // transfer 100 mock dai tokens to investor
  await daiToken.transfer(accounts[1], '1000000000000000000000000');
};
