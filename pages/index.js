import { useState, useEffect } from "react"
import { NFTCard } from "./nftCard"
import Head from "next/head"

const Home = () => {
  const [wallet, setWallet] = useState("")
  const [collection, setCollectionAddress] = useState("")
  const [NFTs, setNFTs] = useState([])
  const [startToken, setStartToken] = useState(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const fetchNFTs = async (isNext) => {
    if(collection.length === 0 && wallet.length === 0) {
      return;
    }

    try {
      const method = collection.length > 0 && wallet.length === 0 ? "getNFTsForCollection" : "getNFTs";
      const api_key = "Lr6dODhu3W1McauR6p4GwxZrnpgZygSI"
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/${method}/`;
      let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      let fetchURL;

      if(collection.length > 0 && wallet.length === 0) {
        fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=true`;
      } else if(!collection.length) {
        fetchURL = `${baseURL}?owner=${wallet}`;
      } else {
        fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      }

      if (isNext && startToken) {
        if (method === "getNFTsForCollection") {
          fetchURL = `${fetchURL}&startToken=${startToken}`;
        } else if (method === "getNFTs") {
          fetchURL = `${fetchURL}&pageKey=${startToken}`;
        }
      } else {
        setStartToken(null);
      }

      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json());

      if(nfts) {
        console.log(nfts.nextToken)
        if(nfts.nfts) {
        if(isNext) {
          setNFTs([...NFTs,...nfts.nfts])
          console.log(NFTs.length)
          console.log("NFTs in collection:", nfts)  
        } else {
        setNFTs(nfts.nfts)
        }
        setStartToken(nfts.nextToken)
      } else if (nfts.ownedNfts) {
        if(isNext) {
          setNFTs([...NFTs, ...nfts.ownedNfts]);
        } else {
          setNFTs(nfts.ownedNfts);
        }
          setStartToken(nfts.pageKey)
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsInitialized(true);
    }
    
  }

  const onKeyPress = (e) => {
    if(e.which === 13) {
      fetchNFTs();
    }
  }

   return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input className="ring-2 ring-slate-300 w-3/5 bg-slate-200 py-3 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
          onChange={(e) => {setWallet(e.target.value)}} 
          value={wallet} 
          type={"text"} 
          placeholder="Add your wallet address"
          onKeyPress={onKeyPress}
        >
        </input>
        <input className="ring-2 ring-slate-300 w-3/5 bg-slate-200 py-3 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
          onChange={(e) => {setCollectionAddress(e.target.value)}} 
          value={collection} 
          type={"text"} 
          placeholder="Add the collection address"
          onKeyPress={onKeyPress}
        >
        </input>
        <button 
          className="disabled:bg-slate-500 text-white bg-blue-700 px-2 py-3 rounded-md w-2/5 hover:bg-blue-800 active:bg-blue-900"
          onClick={ () => {fetchNFTs()}}>
        
          Show NFTs</button>
      </div>
      {isInitialized && (
      <div className="flex flex-wrap gap-y-10 mt-4 w-5/6 gap-x-6 justify-center bg-white rounded-lg">
        {
          NFTs.map((nft, index) => {
            return (
              <NFTCard nft={nft} key={index}></NFTCard>
            )
          })
        }
        
      {startToken ? 
          <button 
            className={"text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 px-4 py-2 mt-6 mb-7 rounded-md w-3/4"}
            onClick={() => {fetchNFTs()}}>
            Show More
          </button>
          : <></> } 
      </div>
      )}
      </div>

  )
}

export default Home