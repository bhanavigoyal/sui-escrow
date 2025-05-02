export const Dropdown=({option, index, value}:{
    option: string,
    index: string,
    value?:string
})=>{
    return <option id={index} className="" value={value}>
            {option}
        </option>

}