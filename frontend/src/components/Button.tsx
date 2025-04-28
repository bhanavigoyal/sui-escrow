export const Button=({label}:{
    label:string
})=>{
    return <div className="w-full py-5">
        <button className="w-full bg-neutral-800 p-2 rounded-xl cursor-pointer hover:bg-neutral-900 active:bg-neutral-700">{label}</button>
    </div>
}