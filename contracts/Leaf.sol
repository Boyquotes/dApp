// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Leaf is ERC20 {
    constructor() ERC20('Leaf', 'LEAF') {}

    function mint(address to, uint256 ammount) public {
        _mint(to, ammount);
    }
}
