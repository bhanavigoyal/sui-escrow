import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";

export function useCancel(){
    const currentAccout = useCurrentAccount();
    const { mutateAsync: signAndExecuteTransaction } = useSignAndExecuteTransaction();
    

    const cancel=async(objectId:string)=>{

        if(!currentAccout) return;

        const tx = new Transaction;

        const [nft] = tx.moveCall({
            target:"0x31b818703f625a7521c1a09d95f5cecddbaa0fe163bb83fe84d3105d86d14062::escrow::return_to_sender",
            typeArguments:['0x31b818703f625a7521c1a09d95f5cecddbaa0fe163bb83fe84d3105d86d14062::nft::NFT'],
            arguments:[tx.object(objectId)]
        });

        tx.transferObjects([nft],tx.pure.address(currentAccout.address));

        await signAndExecuteTransaction({
            transaction:tx
        });

    }

    return {cancel}
}