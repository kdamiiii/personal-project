'use client'

import { navButtons, NavButtonType } from "@/constants/nav"
import { capitalizeFirstLetter } from "@/utils/textUtils"
import { usePathname } from "next/navigation"

export const NavBar = () =>{
    return (
        <div className="h-[7vh] flex items-center">
            <img className="h-full px-5" src="bsbt.jpg"/>
            {
                navButtons.map(btn=><NavButton key={btn.name} {...btn}/>)
            }
        </div>
    )
}

const NavButton = ({name, link}:NavButtonType) => {
    const isSelected = usePathname() === link;

    const handleOnClick = (navLink: string) => {
        alert(navLink);
    }
    
    return (
        <button onClick={()=>{handleOnClick(link)}} className={`px-6 text-10 font-normal h-full ${isSelected && 'bg-amber-300 text-white'}`} type="button">
            {capitalizeFirstLetter(name)}
        </button>
    )
}