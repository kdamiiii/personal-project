'use client'

import { navButtons, NavButtonType } from "@/constants/nav"
import { capitalizeFirstLetter } from "@/utils/textUtils"
import { usePathname,useRouter } from "next/navigation"
import { useEffect } from "react"

export const NavBar = () =>{
    const router = useRouter();

    const handleOnClick = (navLink: string) => {
        router.push(navLink);
    }

    return (
        <div className="h-[7vh] flex items-center">
            <img className="h-full px-5" src="bsbt.jpg"/>
            {
                navButtons.map(btn=><NavButton key={btn.name} {...btn} handleOnClick={handleOnClick}/>)
            }
        </div>
    )
}

type NavButtonProps = NavButtonType & {
    handleOnClick: (link:string)=> void
}

const NavButton:React.FC<NavButtonProps> = ({name, link, options, icon:Icon, handleOnClick}) => {
    const isSelected = usePathname() === link;

    return (
        <button onClick={()=>{handleOnClick(link)}} className={`px-6 flex items-center gap-2 text-10 font-normal h-full ${options ?? ''} ${isSelected ? 'bg-amber-300 text-white' : 'transition-colors duration-300 hover:bg-amber-200 hover:text-gray-700'}`} type="button">
            {Icon && <Icon />}
            {capitalizeFirstLetter(name)}
        </button>
    )
}