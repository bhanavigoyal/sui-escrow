import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";

export function useSwap(){
    const currentAccout = useCurrentAccount();
    const { mutateAsync: signAndExecuteTransaction } = useSignAndExecuteTransaction();
    
    const client = useSuiClient();

    const swap=async(objectId:string, exchangeKey:string)=>{
        if(!currentAccout) return;

        const ownedObject = await client.getOwnedObjects({
            owner:currentAccout.address,
            options: {
                showType: true,
                showContent: true,
            },
        });

        const keyObj = ownedObject.data.find(obj=>{
            return obj.data?.objectId === exchangeKey && obj.data?.type?.includes("::lock::Key");
        })

        const lockedObj = ownedObject.data.find(obj=>{
            if(obj.data?.content?.dataType === "moveObject"){
                const fields = obj.data.content.fields as {
                    key:string
                }
                return fields.key === exchangeKey && obj.data?.type?.includes("::lock::Locked")
            }

            return false;
        })

        if(!keyObj || !lockedObj){
            console.log("keyobj; ",keyObj)
            console.log("lockedobj: ",lockedObj)
            console.error("Key or Locked Obj not found");
            return;
        }

        const tx = new Transaction;

        const [nft] = tx.moveCall({
            target:"0x31b818703f625a7521c1a09d95f5cecddbaa0fe163bb83fe84d3105d86d14062::escrow::swap",
            typeArguments:['0x31b818703f625a7521c1a09d95f5cecddbaa0fe163bb83fe84d3105d86d14062::nft::NFT',
                '0x31b818703f625a7521c1a09d95f5cecddbaa0fe163bb83fe84d3105d86d14062::nft::NFT'
            ],
            arguments:[
                tx.object(objectId),
                tx.object(exchangeKey),
                tx.object(lockedObj.data?.objectId!)
            ]
        });

        tx.transferObjects([nft],tx.pure.address(currentAccout.address));

        await signAndExecuteTransaction({
            transaction:tx
        });

    }

    return {swap}
}