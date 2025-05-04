import { useState } from "react";
import { useLock } from "../utils/lock"
import { Button } from "./Button"
import { useUnlock } from "../utils/unlock";
import { useNft } from "../context/NftContext";

export const NftCard=({mapKey, keyObjId, objectId, name, description, url, type}:{
    mapKey: number,
    keyObjId?:string,
    objectId:string,
    name:string,
    description:string,
    url:string,
    type:string
})=>{
    const nftContext = useNft();
    if (!nftContext) return;

    const {lock} = useLock();
    const {unlock} = useUnlock();
    const { refreshNfts } = nftContext;

    const [keyId, setKeyId] = useState<string|null|undefined>("");
    const [isCopied, setIsCopied] = useState(false)

    const handleLock= async()=>{
        try {
            const result = await lock(objectId);
            setKeyId(result?.keyId);
            await refreshNfts();
        }catch(e){
            console.log(e)
        }
    }

    const handleUnlock = async()=>{
        try{
            if(!keyObjId){
                return;
            }
            const result = await unlock(objectId,keyObjId);
            console.log(result)
            await refreshNfts();
        }catch(e){
            console.log(e)
        }
    }

    const handleCopy = ()=>{
        if (keyObjId) {
            navigator.clipboard.writeText(keyObjId);
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000);
        }

        if(keyId){
            navigator.clipboard.writeText(keyId);
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000);
        }
    }

    

    return <div key={mapKey} className="bg-neutral-700 w-72 flex flex-col border border-neutral-400 rounded-xl p-3 items-center space-y-2 ">
        <div className="font-bold">
            {name}
        </div>
        <div className="text-xs w-50 text-center">
            {description}
        </div>
        <img className="p-3 w-40 h-40" src={url} alt={name} />
        <div className="text-xs">
            {(type === "locked")?(
                <div className="flex w-64 space-x-1">
                    <Button label="🔐 Unlock" onClick={handleUnlock}/>
                    <Button label={isCopied ? "✅ Copied" : "🔑 Copy Key"} onClick={handleCopy}/>
                </div>
            ):(
                <Button label="🔒 Lock this NFT" onClick={handleLock}/>
            )}
            
        </div>
    </div>
}