import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { SuiObjectResponse } from "@mysten/sui/client";
import { createContext, useContext, useEffect, useState } from "react";
import { Transaction } from '@mysten/sui/transactions';
import { mintToken } from "../utils/mint";

type NftContextType = {
    nfts: SuiObjectResponse[];
    loading: boolean;
};

const NftContext = createContext<NftContextType | null>(null);

export function NftProvider({children}:{
    children:React.ReactNode
}){
    const currentAccount= useCurrentAccount();
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

    const [nfts, setNfts] = useState<SuiObjectResponse[]>([]);
    const [loading, setLoading] = useState(false);

    const client = useSuiClient();


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
            nftNames: ["NFT 1", "NFT 2", "NFT 3", "NFT 4", "NFT 5"],
            nftDescriptions: ["Description 1", "Description 2", "Description 3", "Description 4", "Description 5"],
            nftUrls: ["url1", "url2", "url3", "url4", "url5"]
        };
        
        try{
            for(let i=1; i<=5; i++){
                const nftMetadata = {
                    name: nftDetails.nftNames[i],
                    description: nftDetails.nftDescriptions[i],
                    image_url: nftDetails.nftUrls[i]
                }

                const tx = new Transaction();

                tx.moveCall({ 
                    target: '0x2::devnet_nft::mint', 
                    arguments: [
                        tx.pure.string(nftMetadata.name), 
                        tx.pure.string(nftMetadata.description), 
                        tx.pure.string(nftMetadata.image_url)
                ] })

                signAndExecuteTransaction({
                    transaction: tx
                },
                {
                    onError: (err) => { return err},
                    onSuccess: (result) => { return result},
                })
                
            }
        }catch(e){
            console.error(e)
        }
    }


    useEffect(()=>{
        async function fetchNft(){
            if(!currentAccount?.address) return;
            setLoading(true);

            const objects = await client.getOwnedObjects({
                owner: currentAccount.address,
                options: {
                    showType:true,
                    showContent:true
                }
            });

            const nftObjects = objects.data.filter((obj)=>(
                obj.data?.type?.includes("TestnetNFT")
            ));

            if (nftObjects.length==0){
                mintNfts();
            }

            setNfts(nftObjects);
            setLoading(false)

        }

        fetchNft();
    },[currentAccount])

    return (
        <NftContext.Provider value={{nfts,loading}}>
            {children}
        </NftContext.Provider>
    )
}

export function useNft() {
    return useContext(NftContext);
}