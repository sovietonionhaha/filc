import React from 'react'
import { useAuthContext } from '../../../components/AuthContext'
import { LuPhone, LuMail, LuExternalLink } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";

const HomePage = () => {
    const { user } = useAuthContext()
    
    document.title = "Főoldal"

    return (
        <div className='w-full'>
            <div className='container mx-auto py-6 items-start flex flex-col'>
                <h1 className='text-2xl font-semibold'>{user?.iskola?.nev} elérhetőségei</h1>
                <div className='my-4 flex flex-col gap-2'>
                <div className='flex gap-2 items-center'>
                    <LuPhone size={20}/>
                    <h1>{user?.iskola?.telefonszam}</h1>
                </div>
                <div className='flex gap-2 items-center'>
                    <LuMail size={20}/>
                    <h1>{user?.iskola?.email}</h1>
                </div>
                <div className='flex gap-2 items-center'>
                    <GrLocation size={20}/>
                    <h1>{user?.iskola?.cim}</h1>
                </div>
                <div className='flex gap-2 items-center'>
                    <LuExternalLink size={20}/>
                    <h1>{user?.iskola?.weboldal}</h1>
                </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
