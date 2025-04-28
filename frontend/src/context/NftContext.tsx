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
            nftNames: ['NFT 1', "NFT 2", "NFT 3", "NFT 4", "NFT 5"],
            nftDescriptions: ['Description 1', "Description 2", "Description 3", "Description 4", "Description 5"],
            nftUrls: ['https://arweave.net/QW9doLmmWdQ-7t8GZ85HtY8yzutoir8lGEJP9zOPQqA', "", "", "", ""]
        };
        
        try{
            for(let i=0; i<1; i++){
                const nftMetadata = {
                    name: nftDetails.nftNames[i],
                    description: nftDetails.nftDescriptions[i],
                    image_url: nftDetails.nftUrls[i]
                }

                const tx = new Transaction();

                const response = await tx.moveCall({ 
                    target: '0x2::devnet_nft::mint', 
                    arguments: [
                        tx.pure.string(nftMetadata.name), 
                        tx.pure.string(nftMetadata.description), 
                        tx.pure.string(nftMetadata.image_url)
                ] })

                console.log("response of movecall: ", response);

                tx.setGasBudget(1000000);

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
        if(!currentAccount?.address) return [];
        
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



        return nftObjects;
    }


    useEffect(()=>{
        async function fetchNft(){
            if (!currentAccount?.address) return;

            setLoading(true);

            const nftObjects = await getObjects()

            if (nftObjects.length===0){
                console.log("nfts not found")
                await mintNfts();

                const mintedNfts = await getObjects();
                setNfts(mintedNfts)
            }else{
                console.log("nfts found");
                setNfts(nftObjects);
            }

                
            console.log(nftObjects);
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