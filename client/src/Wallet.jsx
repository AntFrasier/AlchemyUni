import server from "./server";
import { useState } from "react";

function Wallet({ address, setAddress, balance, setBalance, pKey, setPKey }) {

  async function onChange(evt) {
    const address= evt.target.value;
   //test
    setAddress(address);

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }
  async function onChange2(evt) {
    const pKey= evt.target.value;
   
    
    setPKey(pKey);
   
  }

  return (
    <div className="container wallet">
      <h2>Your Wallet</h2>

      <label>
        Wallet Address
        <input placeholder="Type an address" value={address} onChange={onChange}></input>
      </label>
      {/* <label>
        Wallet Privat Key
        <input placeholder="Type an private Key" value={pKey} onChange={onChange2}></input>
      </label> */}

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
