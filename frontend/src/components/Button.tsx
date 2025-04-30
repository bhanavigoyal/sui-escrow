
export const Button=({label, onClick}:{
    label:string,
    onClick?:(e: React.MouseEvent<HTMLButtonElement>) => void
})=>{
    return <div className="w-full py-5">
        <button className="w-full bg-neutral-800 p-2 rounded-xl cursor-pointer hover:bg-neutral-900 active:bg-neutral-700" onClick={onClick}>{label}</button>
    </div>
}