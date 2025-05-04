import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { SuiObjectResponse } from "@mysten/sui/client";
import { createContext, useContext, useEffect, useState } from "react";
import { Transaction } from '@mysten/sui/transactions';
import { mintToken } from "../utils/mint";

type NftContextType = {
    unlockedNfts: SuiObjectResponse[];
    lockedNfts: SuiObjectResponse[];
    loading: boolean;
    refreshNfts: () => Promise<void>;
    mintNfts: () => Promise<void>; // expose for manual triggering
};

const NftContext = createContext<NftContextType | null>(null);

export function NftProvider({ children }: { children: React.ReactNode }) {
    const currentAccount = useCurrentAccount();
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

    const [unlockedNfts, setUnlockedNfts] = useState<SuiObjectResponse[]>([]);
    const [lockedNfts, setLockedNfts] = useState<SuiObjectResponse[]>([]);
    const [loading, setLoading] = useState(false);

    const client = useSuiClient();

    const getObjects = async () => {
        if (!currentAccount?.address) {
            return { unlockedNftObjects: [], lockedNftObjects: [] };
        }

        const objects = await client.getOwnedObjects({
            owner: currentAccount.address,
            options: { showType: true, showContent: true },
        });

        const unlockedNftObjects = objects.data.filter((obj) =>
            obj.data?.type === "0x31b818703f625a7521c1a09d95f5cecddbaa0fe163bb83fe84d3105d86d14062::nft::NFT"
        );

        const lockedNftObjects = objects.data.filter((obj) =>
            obj.data?.type?.startsWith("0x31b818703f625a7521c1a09d95f5cecddbaa0fe163bb83fe84d3105d86d14062::lock::Locked<")
        );

        return { unlockedNftObjects, lockedNftObjects };
    };

    const refreshNfts = async () => {
        if (!currentAccount?.address) return;
        setLoading(true);
        try {
            const { unlockedNftObjects, lockedNftObjects } = await getObjects();
            setUnlockedNfts(unlockedNftObjects);
            setLockedNfts(lockedNftObjects);
        } finally {
            setLoading(false);
        }
    };

    const mintNfts = async () => {
        if (!currentAccount?.address) return;
        setLoading(true);

        const dateSuffix = new Date().toISOString().slice(5, 10).replace("-", "");

        try {
            const balance = await client.getBalance({ owner: currentAccount.address });
            if (balance.totalBalance < "1000000000") {
                await mintToken(currentAccount.address);
            }

            const nftDetails = {
                nftNames: ['Pixel Panda', "Cyber Cactus", "Ghost Byte", "Mecha Mooncat", "Sunset Sorcerer"],
                nftDescriptions: ['A futuristic panda ready to vibe in your digital zoo.', "A futuristic cactus growing in the metaverse.", "A friendly glitch ghost from a forgotten server.", "Half cat, half mech — protector of lunar NFTs.", "A mystical wizard who only appears at digital dusk."],
                nftUrls: [
                    'https://gold-legal-pheasant-428.mypinata.cloud/ipfs/bafybeicryyu3cobi4c7qz2vzkn6rc5c44mb7xkns2zrvwln32kj2uj6wsy',
                    "https://gold-legal-pheasant-428.mypinata.cloud/ipfs/bafybeidn6xtnizww5eqymqu6wzh7qhpchhgzcngm3uwrinzu7ssxzlld4u",
                    "https://gold-legal-pheasant-428.mypinata.cloud/ipfs/bafybeie4pys3vlmhtyeiojaof3vnqga7sulzaeul7k4pt4dhoar52ds64y",
                    "https://gold-legal-pheasant-428.mypinata.cloud/ipfs/bafybeibzh5munbamsrhbr2rkc4jnbblxxqltqgn52jlyg77nf7kc4ndxfe",
                    "https://gold-legal-pheasant-428.mypinata.cloud/ipfs/bafybeihsftzuftcr25coutv5m56vnn565zgk4kdmzmsafqu7apgo7aq5ue"
                ]
            };

            const tx = new Transaction();

            for (let i = 0; i < 5; i++) {
                const name = `${nftDetails.nftNames[i]} #${dateSuffix}${i + 1}`;
                const description = nftDetails.nftDescriptions[i];
                const url = nftDetails.nftUrls[i];

                tx.moveCall({
                    target: "0x31b818703f625a7521c1a09d95f5cecddbaa0fe163bb83fe84d3105d86d14062::nft::mint_to_sender",
                    arguments: [
                        tx.pure.string(name),
                        tx.pure.string(description),
                        tx.pure.string(url)
                    ]
                });
            }

            await signAndExecuteTransaction({ transaction: tx }, {
                onError: (err) => console.error("transaction error:", err),
                onSuccess: async () => {
                    console.log("transaction successful");
                    // await new Promise(res => setTimeout(res, 3000)); // wait for indexing
                    await refreshNfts();
                }
            });
        } catch (e) {
            console.error("Mint failed:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!currentAccount?.address) return;
        refreshNfts();
    }, [currentAccount]);

    return (
        <NftContext.Provider value={{ unlockedNfts, lockedNfts, loading, refreshNfts, mintNfts }}>
            {children}
        </NftContext.Provider>
    );
}

export function useNft() {
    return useContext(NftContext);
}