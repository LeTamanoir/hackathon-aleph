// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract SignatureChecker {

  function signatureSplit(bytes memory signatures, uint256 pos) internal pure returns (uint8 v, bytes32 r, bytes32 s) {
        assembly {
            let signaturePos := mul(0x41, pos)
            r := mload(add(signatures, add(signaturePos, 0x20)))
            s := mload(add(signatures, add(signaturePos, 0x40)))
            v := byte(0, mload(add(signatures, add(signaturePos, 0x60))))
        }
    }
  function checkSignature(
    bytes memory _signature,
    bytes32 _hash
  ) public pure returns (address) {
    (uint256 v, bytes32 r, bytes32 s) = signatureSplit(_signature, 0);
    address owner;
    if (v > 30) {
      owner = ecrecover(keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _hash)), uint8(v - 4), r, s);
    } else {
      owner = ecrecover(_hash, uint8(v), r, s);
    }
    return owner;
  }
}
