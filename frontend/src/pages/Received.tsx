import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar"
import { useAllEscrows } from "../utils/allEscrows";
import { SuiObjectResponse } from "@mysten/sui/client";
import { EscrowCard } from "../components/EscrowCard";

type NFTFields = {
	name: string;
	description: string;
	url: string;
}

export const Received=()=>{
    const [escrows, setEscrows] = useState<SuiObjectResponse[]>();
    const {getNeedsActionEscrows} = useAllEscrows();

    useEffect(()=>{
        getNeedsActionEscrows().then((data)=>{
            setEscrows(data)
        })
    },[])

    return <div>
        <AppBar/>
        <div className="p-5 grid grid-cols-4 gap-5 auto-rows-fr">
            { escrows?.map((escrow,index)=>{
                if(escrow.data?.content?.dataType === "moveObject"){
                    const fields = escrow.data.content.fields as {
                        escrowed_obj:{
                            fields?: NFTFields
                        }|null,
                        sender:string,
                        recipient:string,
                    };
                    if (!fields.escrowed_obj?.fields) return null;
                    const nft = fields.escrowed_obj.fields;
                    console.log(nft)
                    console.log("nftname:",nft.name)
                    return <EscrowCard objectId={escrow.data.objectId} type="received" mapKey={index.toString()} name={nft.name} url={nft.url} sender={fields.sender}/>
                    }
                    return null;
                })
            }
        </div>
    </div>
}