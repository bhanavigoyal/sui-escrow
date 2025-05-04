import { AppBar } from "../components/AppBar"
import { CreateEscrow } from "../components/CreateEscrow"
import { Index } from "../components/Index"

export const Home=()=>{
    return <div className="flex flex-col items-center w-screen">
        <AppBar/>
        <div className="p-5 w-full">
            <CreateEscrow/>
        </div>
        <div>
            <div className="text-md font-bold">
                All the active Escrows across the TrustBox
            </div>
            <div>
                <Index/>
            </div>
        </div>
    </div>
}