import React, { useState, useMemo } from 'react'
import { Timetable } from '../TimetablePage/Timetable'
import { useAuthContext } from '../../components/AuthContext'
import axios from "axios"
import { useSchoolContext } from '../../components/SchoolContext'
import useEnv from '../../../utils/useEnv'

const TimetablePage = () => {
    const { user, token } = useAuthContext()
    const { data: schoolData } = useSchoolContext()

    const [data, setData] = useState(null)

    const { backend } = useEnv()

    useMemo(() => {
        axios.post(`${backend}/lesson/getLessons`, {
            osztalyId: user?.diak?.osztalyId || user?.tanar?.osztaly?.id,
            iskolaId: user?.iskolaId,
            tanarId: user?.tanar?.id
        }, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        .then(res => {
            setData(res.data)
        })
    }, [])

    document.title = "Órarend"

    return (
        <div className='container mx-auto flex flex-col items-center py-6'>
            <h1 className='text-2xl font-semibold'>Órarend</h1>
            {data?.studentTimetable?.length > 0 && <Timetable title={`${data?.studentTimetable[0]?.osztaly.azonosito} - osztályom`} hours={data?.hours} lessons={data?.studentTimetable} recorded={data?.lessons}/>}
            {data?.teacherTimetable?.length > 0 ? <Timetable title={"Óráim"} hours={data?.hours} lessons={data?.teacherTimetable} isTeacher recorded={data?.lessons} /> : <h1>Nincsenek még rögzített óráid</h1>}
            {user?.admin && schoolData?.classes && schoolData?.classes.map(_class => (
                <Timetable key={_class.azonosito} title={`${_class.azonosito} - Admin`} hours={data?.hours} lessons={data?.timetables?.filter(timetable => timetable.osztalyId == _class.id)} class={_class?.azonosito} isAdmin/>
            ))}            
        </div>
    )
}

export default TimetablePage