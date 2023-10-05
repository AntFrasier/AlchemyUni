import React from 'react'
import { useEffect } from 'react'
// hash	string	32 Bytes - hash of the block. null when its pending block.
// parentHash	string	32 Bytes - hash of the parent block.
// number	number	The block number. null when its pending block.
// timestamp	number	The unix timestamp for when the block was collated.
// nonce	string	A nonce is a value that represents the number of transactions sent by the sender's address, ensuring the transactions are processed in order and preventing replay attacks.
// difficulty	number	Integer of the difficulty for this block.
// gasLimit	BigNumber	The maximum gas allowed in this block.
// gasUsed	BigNumber	The total used gas by all transactions in this block.
// miner	string	20 Bytes - the address of the beneficiary to whom the mining rewards were given.
// transactions

const Block = ({block}) => {
 useEffect( ()=>{
    console.log(block, "in block commponent")
 },[])
  return (
    <div className='p-5'>
        <h2 className='text-xl font-500 my-5'>Block informations : </h2>
        <div className='flex flex-col g-5 w-sm bg-base-300'>
            <div>
                Block : #{block?.number}
            </div>
            <table>
                <tbody>
                <tr>
                    <td>
                        Block Hash:
                    </td>
                    <td>
                        {block?.hash}
                    </td>
                </tr>
                <tr>
                    <td>
                        Timestamp:
                    </td>
                    <td>
                        {block?.timestamp}
                    </td>
                </tr>
                <tr>
                    <td>
                        Miner:
                    </td>
                    <td>
                        {block?.miner}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Block