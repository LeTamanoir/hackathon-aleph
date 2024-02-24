// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/SignatureChecker.sol";
import "forge-std/console.sol";

contract SignatureCheckerScript is Script {
    function run() public {
        SignatureChecker checker = new SignatureChecker();
        address signer = 0x11ed089a9715aDB1e294A73f4e8C40A7a455b6d3;
        address signer_recover = checker.checkSignature(hex"fde1c959e4c44bae30f1f2d4e648a46a8360c195cfebb500bc9d0bc6b76c0e562351620cc2c6a55f862992cc606b45dcf52ff7ae357391e109023ce9790ff5411f", hex"da968b1556056df97bad879a9d45113d9ac3dc912239eb371812791388eb1d97");
        console.log("signer: ");
        console.logAddress(signer);
        console.log("signer_recover: ");
        console.logAddress(signer_recover);
    }
}
