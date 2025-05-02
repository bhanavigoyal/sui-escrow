import { useEffect, useState } from "react"
import { useEscrow } from "../utils/escrow"
import { Button } from "./Button"
import { Details } from "./Details"
import { Dropdown } from "./Dropdown"
import { InputBox } from "./InputBox"
import { useUnlockedNfts } from "../utils/unlockedNfts"

export const CreateEscrow=()=>{

    const {escrow} = useEscrow();

    const [address, setAddress]  = useState("");
    const [exchangeKey, setExchangeKey] = useState("");
    const [objectId, setObjectId] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const { data: nfts, isLoading, isError } = useUnlockedNfts(showDropdown);

    const handleCreateEscrow=async()=>{
        const result = await escrow(objectId,exchangeKey,address);
        console.log(result)
    }

    const handleDropDownClick=()=>{
        setShowDropdown(true);
    }

    useEffect(() => {
        if (!isLoading && !isError && nfts?.length === 1 && nfts[0]?.data?.objectId) {
            setObjectId(nfts[0].data.objectId);
        }
    }, [nfts, isLoading, isError]);

    return <div className="bg-neutral-700 rounded-3xl items-center grid grid-cols-2 place-items-center">
        <div className="p-5 flex flex-col items-center">
            <img className="w-60 h-60" src="/contract.svg" alt="" />
            <div className="pt-6">
                {/* add the feature to go to locking assets on click here */}
                <Details label="1. 📦 Start a Trade" text="Pick the NFT or token you want to offer and set up the trade."/>
                <Details label="👤 Choose Who to Trade With" text="Enter the wallet address of the person you want to swap with."/>
                <Details label="3. 🔒 They Lock Their Asset" text="The other person locks their item and sends you the key."/>
                <Details label="4. 🚀 Swap and complete" text="The other person accepts and the trade finishes automatically!"/>
            </div>
        </div>
        <div className="w-10/12 p-3 flex flex-col items-center">
                <div className="pb-8 text-xl font-bold">
                    Start a Secure Trade ✨
                </div>
                <InputBox label="Other Person's Wallet Address:" placeholder="The wallet address of the person you want to trade with." onChange={(e)=>{
                    setAddress(e.target.value);
                }}/>
                <InputBox label="Other Person's Asset Key:" placeholder="Ask your friend to lock their item and share the lock key with you." onChange={(e)=>{
                    setExchangeKey(e.target.value);
                }}/>
                <div className="w-full">
                    <div className="text-sm pb-1">
                        Select Your Item to Trade (Make sure it is unlocked!)
                    </div>
                    {/* fetch the unlocked items from blockchain */}
                    <select onClick={handleDropDownClick} onChange={(e) =>{
                        const selected = e.target.value;
                        setObjectId(selected)
                        console.log("object id",selected)
                    }   
                         } className="w-full bg-neutral-500 p-2 rounded-xl focus:outline-0">
                        {isLoading && <Dropdown option="loading" index="1"/>}
                        {isError && <Dropdown option="error loading" index="1"/>}
                        {nfts?.length ?(
                                nfts.map((nft,index)=>{
                                    if (nft.data){
                                        const objectId = nft.data.objectId;
                                        return <Dropdown value={objectId} option={nft.data?.objectId} index={index.toString()}/>
                                        // return <option id={index.toString()} value={objectId}>{objectId}</option>
                                    }
                                    return <option>error</option>
                                })
                            ):(
                                !isLoading && <Dropdown option="select nfts" index="1"/>
                            )
                        }
                    </select>
                </div>
                <Button label="Create Escrow" onClick={handleCreateEscrow}/>
        </div>
    </div>
}