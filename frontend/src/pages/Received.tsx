import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar"
import { useAllEscrows } from "../utils/allEscrows";
import { SuiObjectResponse } from "@mysten/sui/client";

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
        { escrows?.map((escrow)=>{
                if(escrow){
                    return <div>{escrow.data?.objectId}</div>
                }
            })
        }
    </div>
}