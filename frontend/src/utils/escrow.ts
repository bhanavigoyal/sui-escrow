import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";

export function useEscrow(){
    const {mutateAsync: signAndExecuteTransaction} = useSignAndExecuteTransaction();
    const currentAccount = useCurrentAccount();

    const escrow= async(objectId:string, exchangeKey:string, recipient:string)=>{
        if(!currentAccount) return;

        const tx = new Transaction();

        tx.moveCall({
            target: '0x31b818703f625a7521c1a09d95f5cecddbaa0fe163bb83fe84d3105d86d14062::escrow::create_escrow',
            typeArguments:['0x31b818703f625a7521c1a09d95f5cecddbaa0fe163bb83fe84d3105d86d14062::nft::NFT'],
            arguments:[
                tx.object(objectId),
                tx.object(exchangeKey),
                tx.object(recipient)
            ]
        });

        // tx.setGasBudget(1_000_000);
        await signAndExecuteTransaction({
            transaction:tx
        });
    }

    return {escrow}
}