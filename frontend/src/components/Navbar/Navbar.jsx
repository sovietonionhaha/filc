import React, { useState } from 'react'
import { IoSchool, IoPersonCircleOutline, IoReorderThreeOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuHome, LuCalendar, LuSchool, LuSettings, LuBookMarked } from "react-icons/lu";
import { useNavigate } from "react-router-dom"
import { useNavbarContext } from "./NavbarContext"
import clsx from "clsx"
import { TbClockHour3 } from "react-icons/tb";
import { useAuthContext } from "../../components/AuthContext"

const Navbar = ({ children }) => {
    const navigate = useNavigate()
    const { user, Logout } = useAuthContext()
    const { isOpen, setOpen } = useNavbarContext()

    const menu = [
        {
            title: "Főoldal",
            href: "/",
            icon: LuHome
        },
        {
            title: "Értékelések",
            href: "/grade",
            icon: LuBookMarked
        },
        {
            title: "Órarend",
            href: "/timetable",
            icon: LuCalendar
        },
        user?.tanar?.osztaly && {
            title: "Mulasztások",
            href: "/absence",
            icon: TbClockHour3
        },
        user?.admin && {
            title: "Iskola",
            href: `/school`,
            icon: LuSchool
        },
        {
            title: "Beállítások",
            href: "/settings",
            icon: LuSettings
        },
    ]

    const toggleMenu = () => {
        setOpen(!isOpen)
    }

    return (
        <div className='w-full h-full flex flex-col'>
            <div className='w-full bg-blue-500 sticky top-0 py-4 px-4 flex justify-between z-30'>
                <div className='flex gap-2 items-center text-white text-xl'>
                    <RxHamburgerMenu size={25} className='mr-4 cursor-pointer' onClick={toggleMenu} />
                    <IoSchool size={30} />
                    <h1 className='font-medium'>Filc</h1>
                </div>
                <div className='flex gap-4 items-center'>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-white'>{user?.teljesNev}</h1>
                        {user?.diak && <span className='text-sm text-white'>Diák - {user?.diak?.osztaly?.azonosito}</span>}
                        {user?.tanar && <span className='text-sm text-white'>Tanár {user?.admin && "- Admin"}</span>}
                    </div>
                    <div className="dropdown dropdown-end">
                        <IoPersonCircleOutline size={30} className='cursor-pointer text-white' tabIndex={0} role='button' />
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-black">
                            <li><a onClick={() => Logout()}>Kijelentkezés</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='w-full h-full flex'>
                <div className={clsx('border-r-[1px] py-2', isOpen && "w-72")}>
                    {menu?.map((item, i) => (
                        <div key={i}>
                            {item && (
                                <div key={item.title} className={clsx('flex items-center text-black/70 cursor-pointer py-2 hover:bg-gray-100 rounded-r-box gap-4 pl-6 mr-5 transition-all')} onClick={() => navigate(item.href)}>
                                    <item.icon className='size-6' title={item.title} />
                                    <h1 className={clsx(!isOpen && "hidden", "duration-300 block")}>{item.title}</h1>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {children}
            </div>
        </div>
    )
}

export default Navbar