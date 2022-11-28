import { useState } from "react";
import {sign} from 'ethereum-cryptography/secp256k1';
import { keccak256 } from 'ethereum-cryptography/keccak';
import{ utf8ToBytes, bytesToHex, toHex ,hexToBytes}from "ethereum-cryptography/utils";


function Sign({txToSign, setTxToSign, setBalance}) {
    const [pKey, setPKey] = useState("db86257a9228c640b5e21cbade927772c7ff8a52233cd5a3591620668a68fde4");
    const [loading, setLoading] = useState(false);
    const sender  = txToSign.sender;
    const amount = txToSign.amount;
    const recipient = txToSign.recipient; 

    async function signtx(){
        setLoading(true);
        console.log(sender, amount, recipient);
        const message = JSON.stringify(txToSign);
        const msgHash = keccak256(utf8ToBytes(message))
        const txSigned = await sign(msgHash, pKey);
        console.log("txsigned : ",txSigned) 
    }

    return (
        <div className="signModal">
            {/* <form className="container transfer"> */}
                <h2> Sign The transaction with your private Key</h2>
                    <label> Private Key
                        <input
                            placeholder="Enter your private Key"
                            value={pKey}
                            onChange={(e) => setPKey(e.target.value)}
                        ></input>
                    </label>
                    <button className="button" onClick={() => setTxToSign(null)}>Cancel</button>
                    <button className="button" onClick={signtx}>Sign</button> 
             {/* </form> */}
            
            
          {/* //  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, consequuntur ut voluptates rem, minima nulla excepturi numquam odit, provident cumque nesciunt perferendis harum recusandae soluta inventore ex sapiente repellat suscipit.</p> */}
        </div>
    )
} //

export default Sign; //ttt