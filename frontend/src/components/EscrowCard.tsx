import { useNft } from "../context/NftContext";
import { useCancel } from "../utils/cancel";
import { useSwap } from "../utils/swap";
import { Button } from "./Button";

export const EscrowCard=({mapKey,exchangeKey, name, url, sender, recipient, type,objectId}:{
    mapKey:string,
    name:string,
    url:string,
    sender?:string,
    recipient?:string,
    type:string,
    objectId:string,
    exchangeKey?:string
})=>{
    const nftContext = useNft();
    if (!nftContext) return;
    const { refreshNfts } = nftContext;

    const {cancel} = useCancel();
    const {swap} = useSwap();


    function shortenAddress(address: string): string {
        if (!address) return "";
        return address.slice(0, 6) + "..." + address.slice(-4);
    }


    const handleCancel=async()=>{
        try{
            const result = await cancel(objectId);
            console.log(result)
            await refreshNfts();
        }catch(e){
            console.error("error while canceling: ",e)
        }
    }

    const handleSwap=async()=>{
        try{
            if(exchangeKey){
                const result = await swap(objectId,exchangeKey);
                console.log(result)
                await refreshNfts();
            }
            console.log("no key")
        }catch(e){
            console.error("error while swaping: ",e)
        }
    }
    
    return <div key={mapKey} className="bg-neutral-700 w-72 flex flex-col border border-neutral-400 rounded-xl p-3 items-center ">
            <div className="font-bold">
                {name}
            </div>
            <img className="p-3 w-40 h-40" src={url} alt={name} />
            <div>
                {sender && <div className="flex text-xs space-x-2">
                    <div className="font-bold">
                        from:
                    </div>
                    <div>
                        {shortenAddress(sender??"")}
                    </div>
                </div>
                } 
            </div>
            {recipient && 
                <div className="text-xs flex space-x-2">
                    <div className="font-bold">
                        To:
                    </div>
                    <div className="text-xs">
                        {shortenAddress(recipient??"")}
                    </div>
            
            </div>

            }
            {type==="sent" && <Button label="Cancel" onClick={handleCancel}/>}
            {type==="received" && <Button label="Swap" onClick={handleSwap}/>}
        </div>
}