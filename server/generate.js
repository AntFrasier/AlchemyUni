const secp = require("ethereum-cryptography/secp256k1");


const privateKey = secp.utils.randomPrivateKey();
const publicKey = secp.getPublicKey(privateKey);
const address = publicKey.slice(-20);

console.log ( "private key :", secp.utils.bytesToHex(privateKey));
console.log ( "public key :", secp.utils.bytesToHex(publicKey));
console.log ( "address :", secp.utils.bytesToHex(address));