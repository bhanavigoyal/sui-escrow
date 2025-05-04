import { useEffect, useState } from "react"
import { useAllEscrows } from "../utils/allEscrows"
import { SuiObjectResponse } from "@mysten/sui/client";
import { EscrowList } from "./EscrowList";

type NFTFields = {
	name: string;
	description: string;
	url: string;
}

export const Index=()=>{
    const [escrows, setEscrows] = useState<SuiObjectResponse[]>();
    const {getAllEscrows} = useAllEscrows();

    useEffect(()=>{
        getAllEscrows().then((data)=>{
            setEscrows(data)
            console.log("escrows: ",data);
        });
    },[])
    return <div className="">
        {escrows?.map((escrow,index)=>{
            if(escrow.data?.content?.dataType === "moveObject"){
                const fields = escrow.data.content.fields as {
                    escrowed_obj:{
                        fields?: NFTFields
                    }|null,
                    sender:string,
                    recipient:string
                };
                if (!fields.escrowed_obj?.fields) return null;
                const nft = fields.escrowed_obj.fields;
                console.log(nft)
                console.log("nftname:",nft.name)
                return <EscrowList mapKey={index.toString()} name={nft.name} url={nft.url} sender={fields.sender} recipient={fields.recipient} />
            }
            return null;
        })}
    </div>
}