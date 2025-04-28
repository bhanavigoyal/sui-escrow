export const Dropdown=({option, key}:{
    option: string,
    key: string
})=>{
    return <div>
        <option id={key} className="">
            {option}
        </option>
    </div>
}