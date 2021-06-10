pragma solidity 0.6.12;
import {VersionedInitializable} from '../libraries/aave-upgradeability/VersionedInitializable.sol';

/**
 * @title AaveIncentivesVault
 * @notice Stores all the AAVE kept for incentives, just giving approval to the different
 * systems that will pull AAVE funds for their specific use case
 * @author Aave
 **/
contract AaveCollector is VersionedInitializable {
  uint256 public constant REVISION = 1;

  /**
   * @dev returns the revision of the implementation contract
   */
  function getRevision() internal pure override returns (uint256) {
    return REVISION;
  }

  /**
   * @dev initializes the contract upon assignment to the InitializableAdminUpgradeabilityProxy
   */
  function initialize() external initializer {}
}
