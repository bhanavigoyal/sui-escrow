import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { SuiObjectResponse } from "@mysten/sui/client";
import { createContext, useContext, useEffect, useState } from "react";
import { Transaction } from '@mysten/sui/transactions';
import { mintToken } from "../utils/mint";

type NftContextType = {
    unlockedNfts: SuiObjectResponse[];
    lockedNfts: SuiObjectResponse[];
    loading: boolean;
    refreshNfts:()=> Promise<void>;
};

const NftContext = createContext<NftContextType | null>(null);

export function NftProvider({children}:{
    children:React.ReactNode
}){
    const currentAccount= useCurrentAccount();
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

    const [unlockedNfts, setUnlockedNfts] = useState<SuiObjectResponse[]>([]);
    const [lockedNfts, setLockedNfts] = useState<SuiObjectResponse[]>([]);
    const [loading, setLoading] = useState(false);

    const client = useSuiClient();

    const refreshNfts=async()=>{
        const { unlockedNftObjects, lockedNftObjects } = await getObjects();
        setUnlockedNfts(unlockedNftObjects);
        setLockedNfts(lockedNftObjects);
    }

    async function mintNfts(){
        if (!currentAccount?.address) return;

        setLoading(true);

        const balance = await client.getBalance({
            owner: currentAccount.address,
        });

        if (balance.totalBalance < "1000000000"){
            await mintToken(currentAccount.address)
        }

        const nftDetails = {
            nftNames: ['NFT 1', "NFT 2", "NFT 3", "NFT 4", "NFT 5"],
            nftDescriptions: ['Description 1', "Description 2", "Description 3", "Description 4", "Description 5"],
            nftUrls: ['https://arweave.net/QW9doLmmWdQ-7t8GZ85HtY8yzutoir8lGEJP9zOPQqA', "", "", "", ""]
        };
        
        try{
            for(let i=0; i<5; i++){
                const nftMetadata = {
                    name: nftDetails.nftNames[i],
                    description: nftDetails.nftDescriptions[i],
                    image_url: nftDetails.nftUrls[i]
                }

                const tx = new Transaction();

                tx.moveCall({ 
                    target: '0x31b818703f625a7521c1a09d95f5cecddbaa0fe163bb83fe84d3105d86d14062::nft::mint_to_sender', 
                    arguments: [
                        tx.pure.string(nftMetadata.name), 
                        tx.pure.string(nftMetadata.description), 
                        tx.pure.string(nftMetadata.image_url)
                ] })

                await signAndExecuteTransaction({
                    transaction: tx
                },
                {
                    onError: (err) => { console.error("transaction error",err)},
                    onSuccess: (result) => {console.log("transaction success: ",result) },
                })

                
            }
        }catch(e){
            console.error(e)
        }
    }

    async function getObjects(){
        if (!currentAccount?.address) {
            return { unlockedNftObjects: [], lockedNftObjects: [] };
        }
        
        const objects = await client.getOwnedObjects({
            owner: currentAccount.address,
            options: {
                showType:true,
                showContent:true
            }
        });

        const unlockedNftObjects = objects.data.filter((obj)=>(
            obj.data?.type === "0x31b818703f625a7521c1a09d95f5cecddbaa0fe163bb83fe84d3105d86d14062::nft::NFT"
        ));

        const lockedNftObjects = objects.data.filter((obj)=>(
            obj.data?.type?.startsWith("0x31b818703f625a7521c1a09d95f5cecddbaa0fe163bb83fe84d3105d86d14062::lock::Locked<")
        ))

        return {unlockedNftObjects, lockedNftObjects};
    }


    useEffect(()=>{
        async function fetchNft(){
            if (!currentAccount?.address) return;

            setLoading(true);

            const { unlockedNftObjects, lockedNftObjects } = await getObjects()

            if (unlockedNftObjects.length===0 && lockedNftObjects.length ===0){
                console.log("nfts not found initial call now minting nfts")
                await mintNfts();

                const mintedNfts = await getObjects();
                setUnlockedNfts(mintedNfts.unlockedNftObjects);
                setLockedNfts(mintedNfts.lockedNftObjects);
            }else{

                console.log("nfts found without minting");
                setUnlockedNfts(unlockedNftObjects);
                setLockedNfts(lockedNftObjects);
            }

            setLoading(false)

        }

        fetchNft();
    },[currentAccount])

    return (
        <NftContext.Provider value={{unlockedNfts, lockedNfts ,loading, refreshNfts}}>
            {children}
        </NftContext.Provider>
    )
}

export function useNft() {
    return useContext(NftContext);
}