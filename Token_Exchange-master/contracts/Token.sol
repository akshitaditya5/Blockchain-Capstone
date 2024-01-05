// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token{

	string public name;
	string public symbol;
	uint256 public decimals=18;
	uint256 public totalSupply ;// 1000000 x 10^18
	mapping(address=>uint256) public balanceOf;
	mapping(address=>mapping(address=>uint256))public allowance;

	constructor(
				string memory _name,
				string memory _symbol,
		    	uint256 _totalSupply)
	{
		name=_name;
		symbol=_symbol;
		totalSupply=_totalSupply*(10**decimals);
		balanceOf[msg.sender]=totalSupply;
	}
	event Transfer( address indexed from,
		address indexed to,
		uint256 value
		);
	event Approval( address indexed owner,
		address indexed spender,
		uint256 value
		);
	function transfer(address to,uint256 value)
	public
	returns (bool success){
		require(balanceOf[msg.sender]>=value);
		_transfer(msg.sender,to,value);
		
		return true;
	
	}
	function _transfer(address from,
		address to,
		uint256 value) 
	internal
	{
	
	require(to!=address(0));
		balanceOf[from]=balanceOf[from] - value;
		balanceOf[to]=balanceOf[to]+ value;	

		emit Transfer(from,to,value); 
	}
	function approve(address spender,uint256 value)public returns(bool success){
		require(spender !=address(0));
		allowance[msg.sender][spender]=value;
		emit Approval(msg.sender,spender,value);
		return true;
	}
	function transferFrom(address from,
		address to,
		uint256 value) 
	public returns (bool success)
	{
	
	
	require(balanceOf[from]>=value);
	require(allowance[from][msg.sender]>=value);
		
		//reset allowance
		allowance[from][msg.sender]=allowance[from][msg.sender]-value;

		_transfer(from,to,value);
		return true;
	}

}

