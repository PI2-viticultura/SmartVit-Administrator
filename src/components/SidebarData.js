import React from "react";
import * as VscIcons from "react-icons/vsc";
import * as BiIcons from "react-icons/bi";
import * as HiIcons from "react-icons/hi";
import * as GiIcons from "react-icons/gi";
import * as GoIcons from "react-icons/go";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
    {
        title: " Home",
        path: "/",
        icon: <BiIcons.BiHomeAlt />,
        cName: "nav-text"
    },
    {
        title: " Vinícola",
        path: "/winerys",
        icon: <GiIcons.GiGrapes />,
        cName: "nav-text"
    },
    {
        title: " Sistemas",
        path: "/systems",
        icon: <VscIcons.VscSettingsGear  />,
        cName: "nav-text"
    },
    {
        title: " Sensor",
        path: "/sensor",
        icon: <RiIcons.RiSensorLine />,
        cName: "nav-text"
    },
    {
        title: " Contratos",
        path: "/contracts",
        icon: <HiIcons.HiDocumentReport />,
        cName: "nav-text"
    },
    {
        title: " Solicitações",
        path: "/orders",
        icon: <GoIcons.GoRequestChanges />,
        cName: "nav-text"
    },
    {
        title: " Suporte",
        path: "/",
        icon: <BiIcons.BiSupport />,
        cName: "nav-text"
    },
    {
        title: " Monitoramento",
        path: "/",
        icon: <VscIcons.VscChecklist />,
        cName: "nav-text"
    },
    {
        title: " Sair",
        path: "/logout",
        icon: <BiIcons.BiExit />,
        cName: "nav-text"
    },


];