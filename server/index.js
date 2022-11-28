require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const address1 = process.env.ADDRESS1;
const address2 = process.env.ADDRESS2;
const address3 = process.env.ADDRESS3;

console.log(address1)
const balances = {
  [address1]: 100,
  [address2]: 50,
  [address3]: 75,
};
//function signSync(msgHash: Uint8Array, privateKey: Uint8Array, opts?: Options): Uint8Array;
app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 5;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 5;
  }
}
