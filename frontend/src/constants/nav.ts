import { IconType } from "react-icons"
import { FaRegUser } from "react-icons/fa";

export type NavButtonType = {
    name: string
    link: string
    icon?: IconType
    options?: string
}


export const navButtons: NavButtonType[] = [
    {
        name:"home",
        link:'/'
    },
    {
        name:"courses",
        link:'/courses'
    },
    {
        name:"about",
        link:'/about'
    },
    {
        name:"contact",
        link:'/contact'
    },
    {
        name:'gallery',
        link:'/gallery'
    },
    {
        name:'login',
        link:'/login',
        icon: FaRegUser,
        options:'ml-auto'
    }
]