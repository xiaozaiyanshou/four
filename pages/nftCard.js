import { useState } from "react"
let copiedTimeoutHandler;

export const NFTCard = ({nft}) => {
    const [copied, setCopied] = useState(false);

    const copy = (address) => {
        navigator.clipboard.writeText(address);
        setCopied(true);

        setTimeout(() => {
            setCopied(false)
        }, 1500);
    };

    return (
           <div className="w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-1/6 mt-10">
            <div className="block transition overflow-hidden rounded-md bg-white">
                <img className="w-full hover:scale-110 transition duration-400" src={nft.media[0].gateway}></img>
            </div>

            <div className="flex flex-col y-gap-2 px-2 py-3 h-110 ">
                <div>
                    <h2 className="text-lg font-bold text-slate-700 text-wrap">{nft.title}</h2>
                    <p className="text-gray-600">ID: {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p>
                    <p className="inline text-gray-600">{`${nft.contract.address.substr(0, 5)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}</p>
 {!copied && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="inline-block ml-2 relative cursor-pointer text-slate-500"
                            height="18"
                            viewBox="0 0 24 24"
                            width="18"
                            onClick={() => copy(nft.contract.address)}
                        >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path
                              fill="currentColor"
                              d="M15 1H4c-1.1 0-2 .9-2 2v13c0 .55.45 1 1 1s1-.45 1-1V4c0-.55.45-1 1-1h10c.55 0 1-.45 1-1s-.45-1-1-1zm4 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z"
                            />
                        </svg>
                    )}
                    {copied && (
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="inline-block ml-2 relative cursor-pointer text-slate-500"
                        >
                            <path fill="none" d="M0 0h24v24H0V0Z"/>
                            <path
                              fill="currentColor"
                              d="M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0 -.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41 -.39-.39-1.02-.39-1.41 0L9 16.17Z"
                            />
                        </svg>
                    )}
            </div>            
            </div>
        </div>
    )
};