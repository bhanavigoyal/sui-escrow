import { useState } from "react";
import { useLock } from "../utils/lock"
import { Button } from "./Button"

export const NftCard=({key, objectId, name, description, url, type}:{
    key: number,
    objectId:string,
    name:string,
    description:string,
    url:string,
    type:string
})=>{

    const {lock} = useLock();

    const [keyId, setKeyId] = useState<string|null|undefined>("");

    const handleLock= async()=>{
        try {
            const result = await lock(objectId);
            setKeyId(result?.keyId);
        }catch(e){
            console.log(e)
        }
    }

    const handleCopy = ()=>{
        if (keyId) {
            navigator.clipboard.writeText(keyId);
            alert("copied")
        }
    }

    return <div key={key} className="bg-neutral-700 w-72 h-72 flex flex-col border border-neutral-400 rounded-xl p-3 items-center ">
        <div className="font-bold">
            {name}
        </div>
        <div className="text-xs">
            {description}
        </div>
        <img className="p-5" src={url} alt={name} />
        <div className="text-xs">
            {(type==="unlocked")?(
                <Button label="🔒 Lock this NFT" onClick={handleLock}/>
            ):(
                <div className="flex w-64 space-x-1">
                    <Button label="🔐 Unlock"/>
                    <Button label="🔑 Copy Key" onClick={handleCopy}/>
                </div>
            )}
        </div>
    </div>
}