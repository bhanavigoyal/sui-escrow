import { AppBar } from "../components/AppBar"
import { useNft } from "../context/NftContext"
import { useEffect } from "react";

export const Vault=()=>{
    const nftContext = useNft();
    if(!nftContext) return <div>loading</div>

    const {nfts, loading} = nftContext;

    if (loading) return <div>loading</div>
    

    useEffect(()=>{
        if (nfts.length===0){
            console.log("no nft")
        }
        else{
            console.log("found nfts")
            console.log(nfts)
        }
        
        nfts.forEach((nft, index) => {
            console.log(`NFT ${index}: `, nft);
            console.log(`NFT Digest: ${nft.data?.digest}`);
        });

    },[nfts])

    return <div>
        <AppBar/>

        <div>
            {nfts.map((nft)=>(
                <div>{nft.data?.digest}</div>
            ))}
        </div>
    </div>


}