// SPDX-

pragma solidity ^0.8.0;

contract MyShop {
  address public owner;

  constructor() {
    owner = msg.sender;
    
  }
}