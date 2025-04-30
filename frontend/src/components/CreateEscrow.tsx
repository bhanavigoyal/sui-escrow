import { Button } from "./Button"
import { Details } from "./Details"
// import { Dropdown } from "./Dropdown"
import { InputBox } from "./InputBox"

export const CreateEscrow=()=>{
    return <div className="bg-neutral-700 rounded-3xl items-center grid grid-cols-2 place-items-center">
        <div className="p-5 flex flex-col items-center">
            <img className="w-60 h-60" src="/contract.svg" alt="" />
            <div className="pt-6">
                {/* add the feature to go to locking assets on click here */}
                <Details label="1. 📦 Start a Trade" text="Pick the NFT or token you want to offer and set up the trade."/>
                <Details label="👤 Choose Who to Trade With" text="Enter the wallet address of the person you want to swap with."/>
                <Details label="3. 🔒 They Lock Their Asset" text="The other person locks their item and sends you the key."/>
                <Details label="4. 🚀 Swap and complete" text="The other person accepts and the trade finishes automatically!"/>
            </div>
        </div>
        <div className="w-10/12 p-3 flex flex-col items-center">
                <div className="pb-8 text-xl font-bold">
                    Start a Secure Trade ✨
                </div>
                <InputBox label="Other Person's Wallet Address:" placeholder="The wallet address of the person you want to trade with."/>
                <InputBox label="Other Person's Asset Key:" placeholder="Ask your friend to lock their item and share the lock key with you."/>
                <div className="w-full">
                    <div className="text-sm">
                        Select Your Item to Trade (Make sure it is locked!)
                    </div>
                    {/* fetch the locked items from blockchain */}
                    <select>
                        {/* {lockedItems.map((item)=>(
                            <Dropdown option={item} key={item.id}/>
                        ))} */}
                    </select>
                </div>
                <Button label="Create Escrow"/>
        </div>
    </div>
}