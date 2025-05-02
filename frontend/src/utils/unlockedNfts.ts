import { useQuery } from "@tanstack/react-query";
import { useNft } from "../context/NftContext";

export function useUnlockedNfts(enabled:boolean){
    const nftContext = useNft();

    return useQuery({
        queryKey: ['udnlockedNfts'],
        queryFn: async()=>{
            if (!nftContext) throw new Error("nft context not available");

            return nftContext.unlockedNfts;
        },
        enabled
    })
}