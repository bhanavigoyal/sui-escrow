export const Details=({label, text}:{
    label?:string,
    text?:string
})=>{
    return <div className="flex flex-col space-x-1 pb-2">
        <div className="text-xs font-bold text-neutral-50">
            {label}
        </div>
        <div className="text-xs pl-3">
            {text}
        </div>
    </div>
}