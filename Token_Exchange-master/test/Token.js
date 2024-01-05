const {ethers} = require('hardhat')
const {expect} = require('chai')
const tokens =(n)=>{
return ethers.utils.parseUnits(n.toString(),'ether');
}

describe('Token',()=>{
	let token,
		accounts,
		deployer,
		reciever
	beforeEach(async()=>
	{
		const Token = await ethers.getContractFactory('Token');
		 token = await Token.deploy('Avi',
		 							'AVI',
		 							'1000000');
		 accounts=await ethers.getSigners()
		 deployer =accounts[0]
		 reciever=accounts[1]
		 exchange=accounts[2]
	})
	describe('Deployment',()=>{
		const name='Avi'
		const symbol='AVI'
		const decimals='18'
		const totalSupply=tokens('1000000')
		
		it('has correct name',async ()=>{
		expect(await token.name()).to.equal(name)
		})

	it('has correct symbol',async ()=>{
		expect(await token.symbol()).to.equal(symbol)

		})
	it('has correct decimals',async ()=>{
		expect(await token.decimals()).to.equal(decimals)

		})
	it('has correct totalSupply',async ()=>{
		expect(await token.totalSupply()).to.equal(totalSupply)

		 })
	it('assigns total supply to deployer',async ()=>{
		expect(await token.balanceOf(deployer.address)).to.equal(totalSupply)

		 })

	})
describe('Success',()=>
{
describe('Sending Token',()=>
{
		let amount,
			transaction,
			result
		beforeEach(async()=>
		{
		 amount=tokens(100);
		 transaction=await token.connect(deployer).transfer(reciever.address,amount)
		 result=await transaction.wait()
		});
	
				
		it('Transfer Token balances',async ()=>
		{

		 expect(await token.balanceOf(deployer.address)).to.equal(tokens(999900))
		 expect(await token.balanceOf(reciever.address)).to.equal(amount)
	
		})
		it('Emits a Transfer event',async()=>
		{
			//console.log(result)
			const event=result.events[0];
			expect(event.event).to.equal('Transfer');
			const args=event.args;
			//console.log(event.args);
			expect(args.from).to.equal(deployer.address);
			expect(args.to).to.equal(reciever.address);
			expect(args.value).to.equal(amount);


		})
	})
});
describe('Failure',()=>
{
	it('Insufficient balances',async()=>
	{
	 let invalidAmount=tokens(10000000);
	 await expect(token.connect(deployer).transfer(reciever.address,invalidAmount)).to.be.reverted;
	})
	it('Invalid receiver address',async()=>
	{
	 let amount=tokens(100)
	 await expect(token.connect(deployer).transfer('0x0000000000000000000000000000000000000000',amount)).to.be.reverted;


	})

});
describe('Aprroval',()=>
{
	let amount,
		transaction,
		result
		beforeEach(async()=>{
		amount=tokens(100);
		transaction=await token.connect(deployer).approve(exchange.address,amount)
		result=await transaction.wait()
})
	describe('Success',()=>{

	
		it('allowance approval to the spender',async ()=>{

		expect(await token.allowance(deployer.address,exchange.address)).to.equal(amount)
	})
		it('Emits an Aprroval event',async()=>{
			//console.log(result)
			const event=result.events[0];
			expect(event.event).to.equal('Approval');
			const args=event.args;
			//console.log(event.args);
			expect(args.owner).to.equal(deployer.address);
			expect(args.spender).to.equal(exchange.address);
			expect(args.value).to.equal(amount);


		})

		

});
	
describe('Failure',()=>{

	it('rejects inavlid address',async()=>{
		await expect(token.connect(deployer).approve('0x0000000000000000000000000000000000000000',amount)).to.be.reverted;
	})
});

	});

describe('Delegated token transfers',()=>
{
	let  amount,transaction,result
		beforeEach(async()=>
	{
		amount=tokens(100);
		transaction=await token.connect(deployer).approve(exchange.address,amount)
		result=await transaction.wait()
	})
		describe('Success',()=>{

	beforeEach(async()=>
	{
		amount=tokens(100);
		transaction=await token.connect(exchange).transferFrom(deployer.address,reciever.address,amount)
		result=await transaction.wait()
	})
		it('transfer token balances',async ()=>{
		expect(await token.balanceOf(deployer.address)).to.equal(tokens(999900))
		expect(await token.balanceOf(reciever.address)).to.equal(amount)
	})

		it('reset allowance',async ()=>{
		expect(await token.balanceOf(exchange.address)).to.equal(0)
	

	})
		it('emits a Transfer event',async()=>{
			//console.log(result)
			const event=result.events[0];
			expect(event.event).to.equal('Transfer');
			const args=event.args;
			//console.log(event.args);
			expect(args.from).to.equal(deployer.address);
			expect(args.to).to.equal(reciever.address);
			expect(args.value).to.equal(amount);

		})
})

		describe('Failure',()=>{
			const invalidAmount=tokens(10000000)
			it('rejects inavlid amount',async()=>{
				await expect(token.connect(exchange).transferFrom(deployer.address,reciever.address,invalidAmount))
			})
		})
})



});