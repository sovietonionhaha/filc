import React, { useEffect, useMemo, useState } from 'react'
import { useSchoolContext } from '../../components/SchoolContext'
import { useAuthContext } from '../../components/AuthContext'
import GradeTable from './components/GradeTable'
import axios from "axios"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Tooltip from '../../components/Tooltip'
import moment from 'moment'
import useEnv from '../../../utils/useEnv'

const TeacherGradePage = () => {
    const [classes, setClasses] = useState([])

    const { user, token } = useAuthContext()

    const { backend } = useEnv()

    useMemo(() => {
        axios.post(`${backend}/grade/getTeacherClasses`, { tanarId: user?.tanar.id }, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(res => {
                setClasses(res.data)
            })
    }, [])
    const [selected, setSelected] = useState()
    const [subjects, setSubjects] = useState([])

    useMemo(() => {
        setSubjects(classes?.map(_class =>
            Array.from(new Set(_class.orak.filter(ora => ora.oktatas.tanar.id === user.tanar.id).map(ora => ora.oktatas.tantargy.nev))).map(tantargy => ({ c: _class, t: tantargy }))[0]
        ))
    }, [classes])

    useEffect(() => {
        setSelected(subjects == undefined ? null : subjects[0])
    }, [subjects])

    return (
        <div className='w-full h-full'>
            <div className='container flex flex-col mx-auto py-6 items-center'>
                <h1 className='text-2xl font-semibold'>Értékelések</h1>
                <div className='flex gap-4'>
                    {subjects?.length > 0 && subjects?.map((subject, index) => (
                        <div key={index} className='bg-base-200 py-2 px-3 rounded-box cursor-pointer' onClick={() => setSelected(subject)}>
                            <h1>{subject.c.azonosito} - {subject.t}</h1>
                        </div>
                    ))}
                </div>
                {subjects.length > 0 ? <div className='my-4 flex flex-col items-center w-full'>
                    <h1 className='text-3xl'>{selected?.c?.azonosito} - {selected?.t}</h1>
                </div> : <h1>Nincsenek értékelni való osztályok </h1>}
                {selected && <GradeTable selected={selected} subjects={subjects} />}
            </div>
        </div>
    )
}

const StudentGradePage = () => {
    const [months] = useState([9, 10, 11, 12, 1, 2, 3, 4, 5, 6])
    const [subjects, setSubjects] = useState([])
    const [grades, setGrades] = useState([])

    const { user, token } = useAuthContext()

    useMemo(() => {
        axios.post(`${backend}/grade/getGrades`, { diakId: user?.diak.id }, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(res => {
                setGrades(res.data.grades)
                setSubjects([...new Set(res.data.subjects.map(subject => subject.oktatas.tantargy.nev))])
            })
    }, [])

    return (
        <div className='container flex flex-col mx-auto my-4 p-4'>
            <TableContainer component={Paper} className='overflow-hidden'>
                <Table className='overflow-hidden'>
                    <TableHead>
                        <TableRow className='divide-x-[1px]'>
                            <TableCell>
                                Tantárgy
                            </TableCell>
                            {months.map(month => (
                                <TableCell key={month}>
                                    {month.toString().padStart(2, '0')}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subjects?.map(subject => (
                            <TableRow key={subject} className='divide-x-[1px]'>
                                <TableCell>
                                    {subject}
                                </TableCell>
                                {months.map(month => (
                                    <TableCell key={month}>
                                        {grades.map(grade => (
                                            <Tooltip key={grade.id} content={
                                                <div className='text-sm flex flex-col'>
                                                    <span>Téma: {grade.tema}</span>
                                                    <span>Dátum: {grade.datum}</span>
                                                    <span>Súly: {grade.suly}%</span>
                                                    <span>Értékelés: {grade.osztalyzat}</span>
                                                </div>
                                            }>
                                                {(moment(grade.datum).month() + 1) === month && grade.oktatas.tantargy.nev === subject && <span className='hover:underline cursor-pointer mx-1'>{isNaN(grade.osztalyzat) ? "..." : grade.osztalyzat}</span>}
                                            </Tooltip>
                                        ))}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

const GradePage = () => {
    const { user } = useAuthContext()
    document.title = "Értékelések"
    if (user?.tanar) {
        return <TeacherGradePage />
    }
    return <StudentGradePage />
}

export default GradePage