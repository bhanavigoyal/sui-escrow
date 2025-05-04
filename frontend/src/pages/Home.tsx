import { AppBar } from "../components/AppBar"
import { CreateEscrow } from "../components/CreateEscrow"
import { Footer } from "../components/Footer"
import { Index } from "../components/Index"

export const Home=()=>{
    return <div className="flex flex-grow flex-col items-center w-screen bg-neutral-900">
        <AppBar/>
        <div className="p-5 w-full">
            <CreateEscrow/>
        </div>
        <div className="flex flex-col items-center">
            <div className="text-md font-bold pb-5">
                All the active Escrows across the TrustBox
            </div>
            <div className="p-4">
                <Index/>
            </div>
        </div>
        <Footer/>
    </div>
}