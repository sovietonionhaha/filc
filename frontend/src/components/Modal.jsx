import clsx from 'clsx'
import React from 'react'

const Modal = ({ title, children, open, onClose }) => {
    return (
        <div className={clsx("modal w-full", open && "modal-open")}>
            <div className="modal-box flex flex-col items-center w-full overflow-auto scrollbar">
                <h1 className='text-lg font-semibold'>{title}</h1>
                <div className='w-full'>
                    {children}
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}></button>
            </form>
        </div>
    )
}

export default Modal