import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import LessonModal from './LessonModal'
import moment from "moment"
import { IoIosArrowBack } from "react-icons/io"
import { IoIosArrowForward } from "react-icons/io"
import { LuPlusSquare } from "react-icons/lu";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAuthContext } from "../../components/AuthContext"
import AddHourModal from './components/AddHourModal'
import AddLessonModal from './components/AddLessonModal'

export const Timetable = ({ hours, lessons, title, isTeacher, isAdmin, recorded, class: _class }) => {
    const { user } = useAuthContext()
    let days = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek"]
    const today = new Date()
    const now = `${today.getUTCHours() + 1}:${today.getUTCMinutes()}`
    const [currentWeek, setCurrentWeek] = useState(moment().format("w"))

    const toggleModal = (lesson, record, canRecorded) => {
        setVariant(!variant)
        setSelected({ lesson, record, canRecorded })
    }

    const [selected, setSelected] = useState({})

    const Item = ({ hour, index }) => {
        const lesson = lessons?.find(lesson => lesson.ora.ora == hour.ora && lesson.nap == (index + 1))
        if (lesson) {
            const record = recorded?.find(record => record?.orarendId == lesson?.id && moment(record.createdAt).format("w") == currentWeek)
            
            const isIn = new Date(`01/01/1970 ${hour.kezdete}`)
            .getTime() < new Date(`01/01/1970 ${now}`)
            .getTime() && new Date(`01/01/1970 ${hour.vege}`)
            .getTime() > new Date(`01/01/1970 ${now}`).getTime();

            const IsRecorded = lesson && recorded?.find((record) => {
                const converted = new Date(record.createdAt)
                return moment(converted).format("w") == currentWeek && record?.orarendId == lesson.id
            })
            const canRecorded = currentWeek == moment().format("w")
            return (
                <div className={clsx(
                    "flex flex-col relative items-center p-6",
                    lesson && "cursor-pointer hover:bg-slate-300",
                    isAdmin && "cursor-pointer hover:bg-slate-300",
                    index == (today.getUTCDay() - 1) && isIn && !isAdmin && "border border-sky-500 text-white",
                    IsRecorded && isTeacher && "bg-green-500",
                    !IsRecorded && isTeacher && lesson && "bg-red-500")}
                    onClick={() => lesson && toggleModal(lesson, record, canRecorded)}>
                    <h1 className='text-center'>{lesson?.oktatas?.tantargy.nev}</h1>
                    <span className='right-2 bottom-1 absolute text-xs'>{isTeacher ? lesson?.osztaly?.azonosito : lesson?.oktatas?.tanar.felhasznalo.teljesNev}</span>
                </div>
            )
        }
        return user?.admin && isAdmin && !isTeacher ? <LuPlusSquare size={20} className='group-hover:visible invisible mx-auto text-black/50 cursor-pointer' onClick={() => addLesson(index, hour)} /> : null
    }
    const Back = () => {
        if (Number(currentWeek) > 1) {
            setCurrentWeek((Number(currentWeek) - 1).toString())
            setDiff(diff + 1)
        }
    }
    const Forward = () => {
        if (Number(currentWeek) >= 1) {
            setCurrentWeek((Number(currentWeek) + 1).toString())
            setDiff(diff - 1)
        }
    }

    const [variant, setVariant] = useState(false)
    const [modalData, setModalData] = useState()

    const addHour = () => {
        setHourOpen(true)
    }
    const addLesson = (i, hour) => {
        if (_class) {
            setModalData({ index: i, class: _class, hour })
            setLessonOpen(true)
        }
    }

    const [isHourOpen, setHourOpen] = useState(false)
    const [isLessonOpen, setLessonOpen] = useState(false)

    const [diff, setDiff] = useState(0)

    return (
        <div className='m-4 w-full'>
            <h1 className='text-3xl font-semibold m-4'>{title}</h1>
            {variant && <LessonModal isTeacher={isTeacher} currentUser={user} isOpen={variant} data={selected} onClose={() => setVariant(!variant)} />}
            {isHourOpen && !isLessonOpen && <AddHourModal hours={hours} open={true} onClose={() => setHourOpen(false)} />}
            {isLessonOpen && !isHourOpen && <AddLessonModal data={modalData} open={true} onClose={() => setLessonOpen(false) && setModalData(undefined)} />}
            <TableContainer component={Paper} className='container mx-auto'>
                <div className='flex justify-between m-2 w-2/4 mx-auto items-center'>
                    <IoIosArrowBack size={28} className='cursor-pointer hover:bg-slate-300 rounded-lg p-1' onClick={() => Back()} />
                    <h1 className='text-lg font-semibold'>{moment().subtract(diff, 'week').clone().startOf('isoWeek').format("MM.DD")} - {moment().subtract(diff, 'week').clone().endOf('isoWeek').subtract(2, 'day').format("MM.DD")}</h1>
                    <IoIosArrowForward size={28} className='cursor-pointer hover:bg-slate-300 rounded-lg p-1' onClick={() => Forward()} />
                </div>
                <Table aria-label='table'>
                    <TableHead>
                        <TableRow className='divide-x-[1px]'>
                            <TableCell width={90}>
                                <div className='text-sm text-slate-800 flex flex-col items-center'>
                                    <h1>-</h1>
                                </div>
                            </TableCell>
                            {days?.map((day, index) => {
                                let date = today
                                if ((index + 1) < today.getUTCDay()) {
                                    date = new Date(Date.now() - (today.getUTCDay() - (index + 1)) * 86400000)
                                }
                                if ((index + 1) == today.getUTCDay()) {
                                    date = today
                                }
                                if ((index + 1) > today.getUTCDay()) {
                                    date = new Date(Date.now() + ((index + 1) - today.getUTCDay()) * 86400000)
                                }
                                return (
                                    <TableCell key={day} className='w-1/6'>
                                        <div className='text-sm text-slate-800 flex flex-col items-center'>
                                            <h1>{day}</h1>
                                            <span className='text-xs'>{moment(date).subtract(diff, 'week').format("MM.DD")}</span>
                                        </div>
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {hours?.map(hour => (
                            <TableRow key={hour.ora} className='divide-x-[1px]'>
                                <TableCell>
                                    <div className={clsx("flex flex-col items-center p-2 text-slate-800")}>
                                        <h1>{hour.ora}. óra</h1>
                                        <span className='text-xs'>{hour.kezdete} - {hour.vege}</span>
                                    </div>
                                </TableCell>
                                {days?.map((day, i) => (
                                    <TableCell key={day} className='group'>
                                        <Item hour={hour} index={i} />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                        {user?.admin && isAdmin && (
                            <TableRow>
                                <TableCell align='center' className='p-2 group cursor-pointer' onClick={addHour}>
                                    <LuPlusSquare size={20} className='group-hover:visible invisible mx-auto text-black/50' />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
