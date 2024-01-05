async function main() {
  //Fetch the contract to deploy
  const Token=await ethers.getContractFactory('Token');
  const Exchange=await ethers.getContractFactory('Exchange');
  
  const accounts=await ethers.getSigners()

  console.log(`Accounts fetched\n${accounts[0].address}\n${accounts[1].address}\n`)
  

  const avi = await Token.deploy(
                  'Avi',
                  'AVI',
                  '1000000');
  await avi.deployed()
  console.log(`AVI deployed to :  ${avi.address}`)
  
  const mETH = await Token.deploy(
                  'mETH',
                  'mETH',
                  '1000000');
  await mETH.deployed()
  console.log(`mETH deployed to :  ${mETH.address}`)
  
  const mDAI = await Token.deploy(
    'DAI',
    'mDAI',
    '1000000');
await mDAI.deployed()
console.log(`mDAI deployed to :  ${mDAI.address}`)

  const exchange=await Exchange.deploy(accounts[1].address,10)
  await exchange.deployed()
  console.log(`Exchange deployed to :  ${exchange.address}`)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});