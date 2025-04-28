import { AppBar } from "../components/AppBar"
import { useNft } from "../context/NftContext"

export const Vault=()=>{
    const nftContext = useNft();
    if(!nftContext) return <div>loading</div>

    const {nfts, loading} = nftContext;

    if (loading) return <div>loading</div>

    return <div>
        <AppBar/>

        <div>
            {nfts.map((nft)=>(
                <div>{nft.data?.objectId}</div>
            ))}
        </div>
    </div>


}