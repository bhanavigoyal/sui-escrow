import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar"
import { useAllEscrows } from "../utils/allEscrows";
import { SuiObjectResponse } from "@mysten/sui/client";

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
        { escrows?.map((escrow)=>{
                if(escrow){
                    return <div>{escrow.data?.objectId}</div>
                }
            })
        }
    </div>
}