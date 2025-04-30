import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";

export function useUnlock(){
    const {mutateAsync: signAndExecuteTransaction} = useSignAndExecuteTransaction();
    const currentAccount = useCurrentAccount();

    const unlock= async (objectId:string, keyId:string)=>{
        if(!currentAccount) return;

        const tx = new Transaction();
        const [nft] = tx.moveCall({
            target: '0xca687af114bdd94fde3df1a2130858e72e72a7e6231f39d4199e49033a859fd5::lock::unlock',
            typeArguments:['0xca687af114bdd94fde3df1a2130858e72e72a7e6231f39d4199e49033a859fd5::nft::NFT'],
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