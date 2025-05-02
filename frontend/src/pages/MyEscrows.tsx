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

export const MyEscrows=()=>{
    const [escrows, setEscrows] = useState<SuiObjectResponse[]>();
    const {getMyEscrows} = useAllEscrows();

    useEffect(()=>{
        getMyEscrows().then((data)=>{
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
                            id:string,
                        };
                        if (!fields.escrowed_obj?.fields) return null;
                        const nft = fields.escrowed_obj.fields;
                        console.log(nft)
                        console.log("nftname:",nft.name)
                            return <EscrowCard type="sent" mapKey={index.toString()} name={nft.name} url={nft.url} recipient={fields.recipient} objectId={escrow.data.objectId}/>
                    }
                    return null;
                })
            }
        </div>
    </div>
}