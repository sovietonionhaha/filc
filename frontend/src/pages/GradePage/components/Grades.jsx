import clsx from 'clsx'
import React, { useState } from 'react'

const Grades = ({ setValue }) => {
    const [selected, setSelected] = useState()

    const handleClick = (value, i) => {
        setSelected(i)
        setValue(value)
    }

    const handleChange = (e, i) => {
        setSelected(null)
        setValue(e.target.value)
    }

    const [grades] = useState([1, 2, 3, 4, 5])

    return (
        <div className='flex gap-2 items-center'>
            {grades?.map((grade, index) => (
                <span key={index} className={clsx(`flex justify-center items-center size-8 outline-1 outline outline-gray-200 text-gray-500 p-2 cursor-pointer`, selected == index && "bg-green-500 text-white")} onClick={() => handleClick(grade, index)}>
                    <h1>{grade}</h1>
                </span>
            ))}
            <input type="text" placeholder="Szöveges értékelés" className="input input-bordered w-full" onChange={handleChange}/>
        </div>
    )
}

export default Grades