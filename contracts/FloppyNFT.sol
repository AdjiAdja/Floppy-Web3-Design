// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FloppyNFT is ERC721URIStorage, ERC2981, Ownable {
    uint256 private _nextTokenId;
    uint256 public mintPrice = 0.001 ether;

    event ArtMinted(address indexed creator, uint256 indexed tokenId, string tokenURI);

    constructor(address initialOwner)
        ERC721("Floppy Digital Art", "FLPY")
        Ownable(initialOwner)
    {
        // Default royalti kreator 5% (500 basis points)
        _setDefaultRoyalty(initialOwner, 500);
    }

    function mintArt(string memory uri) external payable returns (uint256) {
        require(msg.value >= mintPrice, "Insufficient ETH for minting");

        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);

        emit ArtMinted(msg.sender, tokenId, uri);
        return tokenId;
    }

    function setMintPrice(uint256 newPrice) external onlyOwner {
        mintPrice = newPrice;
    }

    function withdraw() external onlyOwner {
        (bool success, ) = payable(owner()).call{value: address(this).balance}("");
        require(success, "Withdraw failed");
    }

    // Override wajib untuk kompatibilitas ERC721URIStorage & ERC2981
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
