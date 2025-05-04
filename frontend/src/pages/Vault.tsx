import { AppBar } from "../components/AppBar"
import { Button } from "../components/Button";
import { NftCard } from "../components/NftCard";
import { useNft } from "../context/NftContext"
import { useEffect } from "react";


type NFTFields = {
	name: string;
	description: string;
	url: string;
};


export const Vault=()=>{
    const nftContext = useNft();
    if(!nftContext) return null;

    const {mintNfts, unlockedNfts, lockedNfts, loading} = nftContext;

    useEffect(()=>{
        if (unlockedNfts.length===0 && lockedNfts.length===0){
            console.log("no nft in the vault")
        }
        else{
            console.log("found nfts in the vault")
            console.log(unlockedNfts)
            console.log(lockedNfts)
        }
        
        unlockedNfts.forEach((nft, index) => {
            console.log(`NFT ${index}: `, nft);
            console.log(`Unlocked NFT Digest: ${nft.data?.digest}`);
            console.log(JSON.stringify(nft))
        });
        lockedNfts.forEach((nft, index) => {
            console.log(`NFT ${index}: `, nft);
            console.log(`locked NFT Digest: ${nft.data?.digest}`);
            console.log(JSON.stringify(nft))
        });

    },[unlockedNfts, lockedNfts])

    return <div className="bg-neutral-900">
        <AppBar/>
        <div className="w-full">
            <div className="flex relative w-full p-4 justify-end items-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
                    MY NFT Collection
                </div>
                <div className="">
                    <Button label="Mint NFTs" onClick={mintNfts} />
                </div>
            </div>
            {loading?(
                <Loading/>
            ):(
                <NFTGrid unlockedNfts={unlockedNfts} lockedNfts={lockedNfts}/>
            )}
        </div>
        </div>

}

const Loading=()=>{
    return <div>
        loading...
    </div>
}

const NFTGrid=({ unlockedNfts, lockedNfts }: { unlockedNfts: any[]; lockedNfts: any[] })=>{
    return <div className="p-5 pt-6 grid grid-cols-4 gap-5 auto-rows-fr">
            {lockedNfts.map((nft, index)=>{
                if (nft.data?.content?.dataType === "moveObject"){
                    console.log("LOCKED DATA TYPE",nft.data.content.type)
                    console.log("LOCKED object id",nft.data.objectId)
                    const lockedFields = nft.data.content.fields as {
                        obj:{
                            fields: NFTFields;
                        }
                        key:string
                    };
                    

                    const objFields = lockedFields.obj.fields

                    return <NftCard type="locked" mapKey={index} keyObjId={lockedFields.key} objectId={nft.data.objectId} name={objFields.name} description={objFields.description} url={objFields.url}/>
                }
                return null;
            })}
            {unlockedNfts.map((nft, index)=>{
                if (nft.data?.content?.dataType === "moveObject"){
                    const fields = nft.data.content.fields as NFTFields;
                    return <NftCard type="unlocked" mapKey={index} objectId={nft.data.objectId} name={fields.name} description={fields.description} url={fields.url}/>
                }
                return null;
            })}
        </div>
}
