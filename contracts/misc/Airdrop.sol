// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.6.12;

import {MerkleProof} from '@openzeppelin/contracts/cryptography/MerkleProof.sol';
import {ERC20} from '../dependencies/openzeppelin/contracts/ERC20.sol';
import {Ownable} from '../dependencies/openzeppelin/contracts/Ownable.sol';
import 'solidity-string-utils/StringUtils.sol';

/// @title Airdrop
/// @author Aave
/// @notice Proxy smart contract to get the price of an asset from a price source, with Chainlink Aggregator
///         smart contracts as primary option
/// - If the returned price by a Chainlink aggregator is <= 0, the call is forwarded to a fallbackOracle
/// - Owned by the Aave governance system, allowed to add sources for assets, replace them
///   and change the fallbackOracle
contract Airdrop is Ownable {
  /// @notice Constructor
  using StringUtils for *;
  ERC20 tokenContract;

  mapping(address => uint256) claimed;
  bytes32 public mkroot;

  constructor(bytes32 _mkroot) public {
    mkroot = _mkroot;
  }

  function claim_token(bytes32[] memory proof, string memory _amount) external returns (bool) {
    require(verify(proof, _amount), 'Invalid claimer');
    require(claimed[msg.sender] < 2, 'Maximun claim');
    if (claimed[msg.sender] == 0) {
      claimed[msg.sender] = 1;
    } else {
      claimed[msg.sender] += 1;
    }
    return true;
  }

  function verify(bytes32[] memory proof, string memory amount) public view returns (bool) {
    bytes32 leaf = keccak256(abi.encodePacked(msg.sender, ' ', amount));
    return MerkleProof.verify(proof, mkroot, leaf);
  }
}
