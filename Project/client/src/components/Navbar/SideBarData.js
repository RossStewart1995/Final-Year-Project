import React from 'react'
import * as vscIcons from "react-icons/vsc";
import * as mdIcons from "react-icons/md";


export const SidebarData = [
    {
        title: "Home",
        path: "/",
        icon: <vscIcons.VscHome/>,
        cName: "nav-text"
    },
    {
        title: "Account",
        path: "/account",
        icon: <vscIcons.VscAccount/>,
        cName: "nav-text"
    },
    {
        title: "Polls",
        path: "/poll",
        icon: <vscIcons.VscOutput/>,
        cName: "nav-text"
    },
    {
        title: "Create Petition",
        path: "/petition",
        icon: <mdIcons.MdCreate/>,
        cName: "nav-text"
    },
    {
        title: "View Petitions",
        path: "/getpetitions",
        icon: <mdIcons.MdClearAll/>,
        cName: "nav-text"
    },
    {
        title: "Logout",
        path: "/auth",
        icon: <vscIcons.VscSignOut/>,
        cName: "nav-text"
    },
    

]