// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.6.12;

import {IPriceOracle} from '../../interfaces/IPriceOracle.sol';
import {SafeMath} from '../../dependencies/openzeppelin/contracts/SafeMath.sol';

contract PriceOracle is IPriceOracle {
  using SafeMath for uint256;
  using SafeMath for uint112;
  mapping(address => uint256) prices;
  uint256 ethPriceUsd;

  address internal _priceAdmin;

  event AssetPriceUpdated(address _asset, uint256 _price, uint256 timestamp);
  event EthPriceUpdated(uint256 _price, uint256 timestamp);
  event NewPriceAdmin(address indexed priceAdmin);

  constructor(address priceController) public {
    _priceAdmin = priceController;
  }

  function getPriceAdmin() external view returns (address) {
    return _priceAdmin;
  }

  modifier onlyPriceAdmin() {
    require(msg.sender == _priceAdmin, 'ONLY_BY_PRICE_ADMIN');
    _;
  }

  function setPriceAdmin(address admin) public onlyPriceAdmin {
    _setPriceAdmin(admin);
  }

  function _setPriceAdmin(address admin) internal {
    _priceAdmin = admin;
    emit NewPriceAdmin(admin);
  }

  function getAssetPrice(address _asset) external view override returns (uint256) {
    return prices[_asset];
  }

  function setAssetPrice(address _asset, uint256 _price) external override onlyPriceAdmin {
    prices[_asset] = _price;
    emit AssetPriceUpdated(_asset, _price, block.timestamp);
  }

  function getEthUsdPrice() external view returns (uint256) {
    return ethPriceUsd;
  }

  function setEthUsdPrice(uint256 _price) external onlyPriceAdmin {
    ethPriceUsd = _price;
    emit EthPriceUpdated(_price, block.timestamp);
  }
}
