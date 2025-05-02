export const EscrowList=({mapKey,name,url,sender, recipient}:{
    mapKey:string,
    name:string,
    url:string,
    sender:string,
    recipient:string
})=>{
    return <div key={mapKey} className="bg-neutral-700 w-full flex border border-neutral-400 rounded-xl p-3 items-center text-xs space-x-5">
            <div className="font-bold">
                {name}
            </div>
            <img className="p-3 w-15 h-15" src={url} alt={name} />
            <div className="flex flex-col">
                <div className="flex space-x-1">
                    <div className="font-bold">
                        Escrow From :
                    </div>
                    <div className="">
                        {sender}
                    </div>
                </div>
                <div className="flex space-x-1">
                    <div className="font-bold">
                        To :
                    </div>
                    <div className="text-xs">
                        {recipient}
                    </div>
                </div>
            </div>
        </div>
}