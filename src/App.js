import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Block from './components/Block';
import Address from './components/Address';
import Hash from './components/Hash';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [blockInfo, setBlockInfo] = useState(null);
  const [addressInfo, setAddressInfo] = useState(null);
  const [hashInfo, setHashInfo] = useState(null);

  async function getBlockNumber() {
    setBlockNumber(await alchemy.core.getBlockNumber());
  }

  async function getAddressInfo(address) {
    setAddressInfo()
  }
  async function getHashInfo(hash) {
    setHashInfo(await alchemy.core.getBlockWithTransactions(hash));
  }

  async function getBlockInfo(number) {

    let info = await alchemy.core.getBlock(number)
    console.log(info)
    setBlockInfo(info)
  }

  async function sendRequest(){
    switch (filter){
      case "address":
        getAddressInfo(search);
        break;
      case "hash":
        getHashInfo(search);
        break;
      default:
        getBlockInfo(search);
    }

  }

  useEffect(() => {
    getBlockNumber();
  },[]);

  useEffect( () => {
    async function getBlockInfo() {

    }
    console.log("is this executed ?")
    if (blockNumber){
      getBlockInfo();
    }
  },[blockNumber] )

  return (
    <div className="flex flex-col">
      <header className='flex flex-col p-5  bg-slate-50'>
        <h1 className='text-5xl mt-5'>Alchemy Uni Block explorer</h1>
        <p className='ml-5 mt-3'>This is the week 3 project of Alchemy Uni <a href='https://github.com/AntFrasier/AlchemyBlockExplorer' target='_blanck' rel='nofollow noreferre noopener'>Fork me !</a></p>
          <div className='flex items-end flex-wrap'>
            <div className='bg-white w-[500px] h-[50px] rounded-2xl px-5 py-2 flex flex-row justify-start gap-3 mt-3 ml-auto'>
              <select name='filter' id='filter' onChange={(e) => setFilter(e.value)}>
                <option value={""}>Filters</option>
                <option value={"address"}>Address</option>
                <option value={"block"}>Block</option>
                <option value={"hash"}>TxHash</option>
              </select>
              <input className="w-full" placeholder='Enter an address, a block number, tx hash...' type='text' onChange={(e) => setSearch(e.target.value)}></input>
              <button className='btn-primary rounded-full w-[50px]' onClick={() => sendRequest()}><SearchIcon /></button>
            </div>
            <div className='ml-auto self-end text-sm'>Current Block Number: {blockNumber}</div>
            </div>
      </header>
       <main>
        
        {blockInfo ? <Block block={blockInfo}/>  : null}
        {hashInfo ? <Hash hash={hashInfo}/>  : null}
        {addressInfo ? <Address address={addressInfo}/>  : null}
          
       </main>
    </div>
  )
}

export default App;
