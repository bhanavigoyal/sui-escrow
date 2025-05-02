import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";

export function useEscrow(){
    const {mutateAsync: signAndExecuteTransaction} = useSignAndExecuteTransaction();
    const currentAccount = useCurrentAccount();

    const escrow= async(objectId:string, exchangeKey:string, recipient:string)=>{
        if(!currentAccount) return;

        const tx = new Transaction();

        tx.moveCall({
            target: '0xca687af114bdd94fde3df1a2130858e72e72a7e6231f39d4199e49033a859fd5::escrow::create_escrow',
            typeArguments:['0xca687af114bdd94fde3df1a2130858e72e72a7e6231f39d4199e49033a859fd5::nft::NFT'],
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