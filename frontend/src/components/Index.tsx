import { useEffect, useState } from "react"
import { useAllEscrows } from "../utils/allEscrows"
import { SuiObjectResponse } from "@mysten/sui/client";

export const Index=()=>{
    const [escrows, setEscrows] = useState<SuiObjectResponse[]>();
    const {getAllEscrows} = useAllEscrows();

    useEffect(()=>{
        getAllEscrows().then((data)=>{
            setEscrows(data)
            console.log("escrows: ",data);
        });
    },[])
    return <div>
        {escrows?.map((escrow)=>{
            if(escrow){
                return <div>{escrow.data?.objectId}</div>
            }
            return <></>
        })}
    </div>
}