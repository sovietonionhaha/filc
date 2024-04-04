import React, { useState } from 'react'
import { ClassList } from './ClassList'
import { Card } from './Card'
import { StudentList } from './StudentList'
import { TeacherList } from './TeacherList'
import { UserList } from './UserList'
import { SubjectList } from './SubjectList'

const SchoolDetails = ({ school, classes, teachers, students, users, subjects }) => {
  const [variant, setVariant] = useState("student")
  
  const handleClick = (id) => {
    setVariant(id)
  }
  return (
    <div className='w-2/3 mx-auto flex m-10 flex-col'>
      <h1 className='text-3xl font-semibold'>{school.nev}</h1>
      <div className='grid 2xl:grid-cols-5 xl:grid-cols-4 grid-cols-3 mt-8 gap-3'>
        <Card id='student' title='Diákok' value={students?.length} className='bg-yellow-500' onClick={handleClick}/>
        <Card id='teacher' title='Tanárok' value={teachers?.length} className='bg-red-500' onClick={handleClick}/>
        <Card id='user' title='Felhasználók' value={users?.length} className='bg-green-500' onClick={handleClick}/>
        <Card id='class' title='Osztályok' value={classes?.length} className='bg-blue-500' onClick={handleClick}/>
        <Card id='subject' title='Tantárgyak' value={subjects?.length} className='bg-orange-500' onClick={handleClick}/>
      </div>
      <div className='my-8'>
        {variant == "student" && <StudentList students={students} />}
        {variant == "teacher" && <TeacherList teachers={teachers} />}
        {variant == "class" && <ClassList classes={classes} />}
        {variant == "user" && <UserList users={users} />}
        {variant == "subject" && <SubjectList subjects={subjects} />}
      </div>
    </div>
  )
}

export default SchoolDetails