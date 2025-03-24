type ContainerType = {
    children: React.ReactNode
    customClasses?: string
    height?: string 
}

export const CenterContainter = ({children, customClasses, height}:ContainerType) =>{
    return (
        <div className={`flex justify-center items-center h-[${height}] ${customClasses ?? ""}`}>
            {children}
        </div>
    )
}

export const FlexContainer = ({children, customClasses, height}:ContainerType) =>{
    return (
        <div className={`w-[100%] ${customClasses ?? ""}`}>
            {children}
        </div>
    )
}