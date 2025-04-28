import { AppBar } from "../components/AppBar"
import { CreateEscrow } from "../components/CreateEscrow"
import { Index } from "../components/Index"

export const Home=()=>{
    return <div className="flex flex-col items-center w-screen">
        <AppBar/>
        <div className="p-5 w-full">
            <CreateEscrow/>
        </div>
        <Index/>
    </div>
}