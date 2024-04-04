import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useAuthContext } from '../../../components/AuthContext'
import useEnv from '../../../../utils/useEnv'

const AbsenceItem = ({ absence, absences }) => {
    const [data, setData] = useState(absences)

    const { token } = useAuthContext()

    const { backend } = useEnv()

    const handleSave = () => {
        axios.post(`${backend}/absence/updateAbsence`, {data}, {
            headers: {
                "Authorization": "Bearer " + token 
            }
        })
        .then((res) => {
            toast.success(res.data)
        })
    }

    const handleSelect = (e, index) => {
        setData(
            data?.filter(x => moment(x?.createdAt).format("MMM Do YY") == moment(absence.createdAt).format("MMM Do YY")).map((item, i) => 
                index === i
                    ? {
                        ...item, tipus: Number(e.target.value)
                    }
                    : item
            )
        )
    }
    return (
        <div key={absence.id} className='w-full flex flex-col shadow-md shadow-slate-400 max-w-3xl'>
            <div className='bg-slate-300 p-4 w-full flex justify-between rounded-t-lg'>
                <h1 className='text-slate-800'>{absence.diak.felhasznalo.teljesNev}</h1>
                <h1 className='text-slate-800'>{absence.createdAt == new Date() ? "Ma" : (
                    `${(new Date(absence.createdAt).getUTCMonth() + 1).toString().padStart(2, "0")}.${new Date(absence.createdAt).getDate().toString().padStart(2, "0")}`
                )}</h1>
            </div>
            <div className='bg-slate-200 w-full p-4 flex flex-col gap-2 rounded-b-lg'>
                {data?.filter(x => moment(x?.createdAt).format("MMM Do YY") == moment(absence.createdAt).format("MMM Do YY")).map((a, index) => (
                    <div className='text-sm text-slate-700 flex justify-between items-center' key={a.id}>
                        <h1>{a.tanora.orarend?.ora.ora}. óra {a?.tanora?.orarend?.oktatas?.tantargy?.nev}</h1>
                        <select className="select select-sm" onChange={(e) => handleSelect(e, index)}>
                            <option selected={a.tipus == 0} value={0}>Igazolatlan</option>
                            <option selected={a.tipus == 1} value={1}>Orovosi igazolt</option>
                            <option selected={a.tipus == 2} value={2}>Szülői igazolt</option>
                            <option selected={a.tipus == 3} value={3}>Iskolai igazolt</option>
                        </select>
                    </div>
                ))}
            </div>
            <div className='flex justify-end'>
                <button className='btn btn-sm btn-primary m-2' onClick={handleSave}>
                    Mentés
                </button>
            </div>
        </div>
    )
}

export default AbsenceItem