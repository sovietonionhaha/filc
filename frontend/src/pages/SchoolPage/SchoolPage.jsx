import React, { useMemo, useState } from 'react'
import SchoolDetails from './components/SchoolDetails'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuthContext } from '../../components/AuthContext'
import { useSchoolContext } from '../../components/SchoolContext'

const SchoolPage = () => {
    document.title = "Iskola"
    
    const { data } = useSchoolContext()

    const { school, teachers, students, users, classes, subjects } = data || {}
    return (
        <div className='w-full'>
            {school && (
                <SchoolDetails
                    school={school}
                    classes={classes}
                    teachers={teachers}
                    students={students}
                    users={users}
                    subjects={subjects}
                />
            )}
        </div>
    )
}

export default SchoolPage
