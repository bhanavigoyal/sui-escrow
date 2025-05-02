import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";

export function useUnlock(){
    const {mutateAsync: signAndExecuteTransaction} = useSignAndExecuteTransaction();
    const currentAccount = useCurrentAccount();

    const unlock= async (objectId:string, keyId:string)=>{
        if(!currentAccount) return;

        const tx = new Transaction();
        const [nft] = tx.moveCall({
            target: '0x31b818703f625a7521c1a09d95f5cecddbaa0fe163bb83fe84d3105d86d14062::lock::unlock',
            typeArguments:['0x31b818703f625a7521c1a09d95f5cecddbaa0fe163bb83fe84d3105d86d14062::nft::NFT'],
            arguments:[
                tx.object(objectId),
                tx.object(keyId)
            ]
        })

        tx.transferObjects([nft], tx.pure.address(currentAccount.address));

        await signAndExecuteTransaction({
            transaction:tx
        });

    }

    return {unlock}
}