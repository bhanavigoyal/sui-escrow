import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";

export function useLock(){
    const currentAccout = useCurrentAccount();
    const { mutateAsync: signAndExecuteTransaction } = useSignAndExecuteTransaction();

    const client = useSuiClient();

    const lock = async (objectId: string)=>{

        if (!currentAccout) return;

        const tx = new Transaction();
    
        const [locked, key]=tx.moveCall({
            target: '0xca687af114bdd94fde3df1a2130858e72e72a7e6231f39d4199e49033a859fd5::lock::lock',
            typeArguments:['0xca687af114bdd94fde3df1a2130858e72e72a7e6231f39d4199e49033a859fd5::nft::NFT'],
            arguments:[tx.object(objectId)]
        })

        tx.transferObjects([locked], tx.pure.address(currentAccout.address));
        tx.transferObjects([key], tx.pure.address(currentAccout.address));
    
    
        try{
            const result = await signAndExecuteTransaction({
                transaction:tx
            });

            const digest = result.digest;
            const txnResult = await client.getTransactionBlock({digest, options: { showEffects: true, showObjectChanges: true }});

            const created = txnResult.objectChanges?.filter((change)=>(
                change.type === "created"
            ));

            const lockId = created?.[0].objectId;
            const keyId = created?.[1].objectId;

            console.log("lockid; ",lockId)
            console.log(keyId)

            return {
                lockId, keyId
            }
        }catch(e){
            return {
                keyId:null
            }
        }

    }

    return {lock};

}