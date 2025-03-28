
type FormInputType = {
    name?: string
    placeHolder?: string
    type?: string
    row?: boolean
}

export const FormInput = ({name, placeHolder, type = "text" , row = true} : FormInputType) =>{
    return (
        <div className={`flex flex-${row ? "row" : "col"} gap-2`}>
            {name && <p>{name}</p>}
            <input type={type} placeholder={placeHolder ?? ""}/>
        </div>
    ) 
}