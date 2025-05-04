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

export const MyEscrows=()=>{
    const [escrows, setEscrows] = useState<SuiObjectResponse[]>();
    const {getMyEscrows} = useAllEscrows();

    useEffect(()=>{
        getMyEscrows().then((data)=>{
            setEscrows(data)
        })
    },[])

    return <div className="flex flex-col min-h-screen bg-neutral-900">
        <AppBar/>
        <div className="flex flex-col space-x-1 items-center p-10">
            <div className="text-2xl font-bold">
                MY ESCROWS
            </div>
            <div className="text-xs">
                the escrows made by me
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
        <div className="mt-auto">
            <Footer/>
        </div>
    </div>
}