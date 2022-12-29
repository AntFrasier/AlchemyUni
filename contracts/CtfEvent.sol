// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract CtfEvent {
    
    function attack(address toAttack) public {
       (bool s, ) = toAttack.call(abi.encodeWithSignature("attempt()"));
       require (s, "attack failed");
    }
}
