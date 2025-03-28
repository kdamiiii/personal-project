export type NavButtonType = {
    name: string
    link: string
    icon?: string
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
    }
]