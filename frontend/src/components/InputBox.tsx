export const InputBox=({label, placeholder}:{
    label?:string,
    placeholder:string
})=>{
    return <div className="w-full pb-3 space-y-1">
        <div className="text-sm">
            {label}
        </div>
        <div className="">
            <input className="w-full p-2 text-xs border border-amber-50 text-neutral-50 rounded-xl focus:outline-0" type="text" placeholder={placeholder}/>
        </div>
    </div>
}