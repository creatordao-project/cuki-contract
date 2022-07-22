// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract Cuki is Initializable, ERC1155Upgradeable, OwnableUpgradeable {
    string public name;
    string public symbol;

    uint256 public wl_id;
    uint256 public wl_amount;

    // used to validate whitelists
    bytes32 public whitelistMerkleRoot;

    function initialize(
        string memory _name,
        string memory _symbol,
        string memory _uri
    ) public initializer {
        name = _name;
        symbol = _symbol;
        __ERC1155_init(_uri);
        __Ownable_init();
    }

    /**
     * @dev validates merkleProof
     */
    modifier isValidMerkleProof(bytes32[] calldata merkleProof, bytes32 root) {
        require(
            MerkleProof.verify(
                merkleProof,
                root,
                keccak256(abi.encodePacked(msg.sender))
            ),
            "Address does not exist in list"
        );
        _;
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    function mintWL(bytes32[] calldata merkleProof)
        public
        isValidMerkleProof(merkleProof, whitelistMerkleRoot)
    {
        _mint(msg.sender, wl_id, 1, "");
    }

    function setWhitelistMerkleRoot(bytes32 merkleRoot) external onlyOwner {
        whitelistMerkleRoot = merkleRoot;
    }

    function setWLId(uint256 id) external onlyOwner {
        wl_id = id;
    }

    function setWLAmount(uint256 amount) external onlyOwner {
        wl_amount = amount;
    }
}
