import React, { useMemo, useState } from 'react'
import moment from 'moment'
import AbsenceItem from './components/AbsenceItem'
import axios from 'axios'
import { useAuthContext } from '../../components/AuthContext'
import useEnv from '../../../utils/useEnv'

const TeacherAbsencePage = () => {
    const { user, token } = useAuthContext()

    const [absences, setAbsences] = useState()

    const { backend } = useEnv()

    useMemo(() => {
        axios.post(`${backend}/absence/getAbsence`, { osztalyId: user?.tanar?.osztaly?.id }, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(res => {
                setAbsences(res.data)
            })
    }, [])

    return (
        <div className='container mx-auto flex flex-col items-center py-6'>
            <h1 className='text-2xl font-semibold'>{user?.tanar?.osztaly?.azonosito} osztály hiányzásai</h1>
            <div className='py-3 flex flex-col gap-4 w-full items-center'>
                {absences?.length > 0 ? absences.filter((x, index) =>
                    absences.indexOf(absences.find(y => moment(x.createdAt).format("MMM Do YY") == moment(y.createdAt).format("MMM Do YY") && y.diakId === x.diakId) || absences[0]) == index)
                    .map(absence => (
                        <AbsenceItem key={absence.id} absence={absence} absences={absences.filter(a => a.diakId === absence.diakId)} />
                    )) : <h1>Nincs rögzítve mulasztás</h1>}
            </div>
        </div>
    )
}

const StudentAbsencePage = () => {
    const [absences, setAbsences] = useState([])
    const { user, token } = useAuthContext()

    const { backend } = useEnv()

    useMemo(() => {
        axios.post(`${backend}/absence/getStudentAbsence`, { diakId: user?.diak?.id }, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(res => {
                setAbsences(res.data)
            })
    }, [])

    return (
        <div className='container mx-auto py-6'>
            <div className='py-3 flex flex-col gap-4 w-full items-center'>
                <h1 className='text-2xl font-semibold'>Mulasztások</h1>
                {absences.length > 0 ? absences.filter((x, index) =>
                    absences.indexOf(absences.find(y => moment(x.createdAt).format("MMM Do YY") == moment(y.createdAt).format("MMM Do YY")) || absences[0]) == index)
                    .map(absence => (
                        <div key={absence.id} className='w-full flex flex-col max-w-3xl'>
                            <div className='bg-slate-300 p-4 w-full flex justify-between rounded-t-lg'>
                                <h1 className='text-slate-800'>{absence.createdAt == new Date() ? "Ma" : (
                                    `${(new Date(absence.createdAt).getUTCMonth() + 1).toString().padStart(2, "0")}.${new Date(absence.createdAt).getDate().toString().padStart(2, "0")}`
                                )}</h1>
                            </div>
                            <div className='bg-slate-200 w-full p-4 flex flex-col gap-2 rounded-b-lg'>
                                {absences?.filter(x => moment(x?.createdAt).format("MMM Do YY") == moment(absence.createdAt).format("MMM Do YY")).map((a, index) => (
                                    <div className='text-sm text-slate-700 flex justify-between items-center' key={a.id}>
                                        <h1>{a.tanora.orarend?.ora.ora}. óra {a?.tanora?.orarend?.oktatas?.tantargy?.nev}</h1>
                                        {a.tipus == 0 && <h1>Igazolatlan</h1>}
                                        {a.tipus == 1 && <h1>Orvosi igazolt</h1>}
                                        {a.tipus == 2 && <h1>Szülői igazolt</h1>}
                                        {a.tipus == 3 && <h1>Iskolai igazolt</h1>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )) : <h1>Nincs rögzítve mulasztás</h1>}
            </div>
        </div>
    )
}

const AbsencePage = () => {
    const { user } = useAuthContext()
    
    document.title = "Mulasztások"
    if (user?.tanar) {
        return <TeacherAbsencePage />
    }
    return <StudentAbsencePage />
}

export default AbsencePage