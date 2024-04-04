import clsx from 'clsx'
import React from 'react'

export const Card = ({ id, title, className, value, onClick }) => {
    const handleClick = () => {
        onClick(id)
    }
    
    return (
        <div className={clsx(`
            p-4
            aspect-square
            rounded-lg
            w-full
            cursor-pointer
            `,
            className
        )}
        onClick={handleClick}
        >
            <h1 className='text-white break-words text-lg font-semibold lg:text-xl'>{title}</h1>
            <span className='text-white text-xl'>{value}</span>
        </div>
    )
}
