//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Transactions {

  uint256 transactionCounter;

  event Transfert(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

  struct TransfertStruct {
    address from;
    address receiver;
    uint amount;
    string message;
    uint256 timestamp;
    string keyword;
  }

  TransfertStruct[] transactions;

  function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
    transactionCounter += 1;
    transactions.push(TransfertStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

    emit Transfert(msg.sender, receiver, amount, message, block.timestamp, keyword);
  }

  function getAllTransations() public view returns (TransfertStruct[] memory) {
    return transactions;
  }

  function getTransactionCount() public view returns (uint256) {
    return transactionCounter;
  }
}