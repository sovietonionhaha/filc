import React, { useState } from 'react'
import Modal from '../../../components/Modal'
import { useSchoolContext } from '../../../components/SchoolContext'
import axios from "axios"
import { useAuthContext } from '../../../components/AuthContext'
import toast from "react-hot-toast"
import useEnv from '../../../../utils/useEnv'

const AddLessonModal = ({ onClose, open, data }) => {
    const { index, class: _class, hour } = data || {}

    const { data: schoolData } = useSchoolContext()
    const { token } = useAuthContext()

    const { backend } = useEnv()

    const [values, setValue] = useState({
        nap: index + 1,
        oktatas: undefined,
        osztaly: _class,
        ora: hour?.id,
        iskola: schoolData?.school?.nev
    })

    const handleInputChange = (e) => {
        setValue({ ...values, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        axios.post(`${backend}/register/registerLesson`, values, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(res => {
                toast.success(res.data)
                setValue({
                    nap: index + 1,
                    oktatas: undefined,
                    osztaly: _class,
                    ora: hour?.id,
                    iskola: schoolData?.school?.nev
                })
                onClose()
            })
    }

    return (
        <Modal title={"Óra hozzáadása"} open={open} onClose={onClose}>
            <div className='max-w-xs mx-auto my-4 flex flex-col items-center gap-2'>
                <select name='oktatas' className="select select-bordered w-full max-w-xs" onChange={handleInputChange}>
                    <option disabled selected hidden>Oktatás</option>
                    {schoolData?.edus?.map(edu => (
                        <option key={edu?.id} value={edu?.id}>{edu?.tanar?.felhasznalo?.teljesNev} - {edu?.tantargy?.nev}</option>
                    ))}
                </select>
                <button className='btn btn-primary bg-blue-500 border-none' onClick={handleSave}>
                    Felvétel
                </button>
            </div>
        </Modal>
    )
}

export default AddLessonModal