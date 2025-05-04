import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar"
import { useAllEscrows } from "../utils/allEscrows";
import { SuiObjectResponse } from "@mysten/sui/client";
import { EscrowCard } from "../components/EscrowCard";
import { Footer } from "../components/Footer";

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

    return <div className="min-h-screen flex flex-col bg-neutral-900">
        <AppBar/>
        <div className="flex flex-col space-x-1 items-center p-10">
            <div className="text-2xl font-bold">
                RECIEVED ESCROWS
            </div>
            <div className="text-xs">
                the escrows sent to me
            </div>
        </div>
        <div className="p-5 grid grid-cols-4 gap-5 auto-rows-fr">
            { escrows?.map((escrow,index)=>{
                if(escrow.data?.content?.dataType === "moveObject"){
                    const fields = escrow.data.content.fields as {
                        escrowed_obj:{
                            fields?: NFTFields
                        }|null,
                        sender:string,
                        recipient:string,
                        exchange_key:string
                    };
                    if (!fields.escrowed_obj?.fields) return null;
                    const nft = fields.escrowed_obj.fields;
                    console.log(nft)
                    console.log("nftname:",nft.name)
                    return <EscrowCard exchangeKey={fields.exchange_key} objectId={escrow.data.objectId} type="received" mapKey={index.toString()} name={nft.name} url={nft.url} sender={fields.sender}/>
                    }
                    return null;
                })
            }
        </div>
        <div className="mt-auto">
            <Footer/>
        </div>
    </div>
}