import React, { useState } from 'react'
import Modal from '../../../components/Modal'
import axios from 'axios'
import { useSchoolContext } from "../../../components/SchoolContext"
import { useAuthContext } from '../../../components/AuthContext'
import { toast } from 'react-hot-toast'
import useEnv from '../../../../utils/useEnv'

const AddHourModal = ({ open, onClose, hours }) => {
    const { data } = useSchoolContext()
    const { token } = useAuthContext()

    const { backend } = useEnv()

    const [values, setValue] = useState({
        kezdes: "",
        vege: "",
        ora: (hours?.length + 1) || 1,
        iskola: data?.school?.nev
    })
    const handleInputChange = (e) => {
        setValue({ ...values, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        axios.post(`${backend}/register/registerHour`, values, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(res => {
                toast.success(res.data)
                setValue({
                    kezdes: "",
                    vege: "",
                    ora: (hours?.length + 1) || 1,
                    iskola: data?.school?.nev
                })
                onClose()
            })
    }

    return (
        <Modal title={"Óra hozzáadása"} open={open} onClose={onClose}>
            <div className='max-w-xs mx-auto my-4 flex flex-col items-center gap-2'>
                <label className="input input-bordered flex items-center gap-2 w-full">
                    Óra kezdete
                    <input name='kezdes' type="text" className="grow" placeholder="00:00" onChange={handleInputChange} />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
                    Óra vége
                    <input name='vege' type="text" className="grow" placeholder="00:00" onChange={handleInputChange} />
                </label>
                <button className='btn btn-primary bg-blue-500 border-none' onClick={handleSave}>
                    Hozzáadás
                </button>
            </div>
        </Modal>
    )
}

export default AddHourModal