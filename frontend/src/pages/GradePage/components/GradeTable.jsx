import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from "moment"
import Grades from './Grades';
import Modal from '../../../components/Modal';
import axios from 'axios';
import { useAuthContext } from '../../../components/AuthContext';
import { toast } from "react-hot-toast"
import Tooltip from '../../../components/Tooltip';
import useEnv from '../../../../utils/useEnv';

const GradeTable = ({ selected }) => {
    const [months] = useState([9, 10, 11, 12, 1, 2, 3, 4, 5, 6])

    const { user, token } = useAuthContext()

    const { backend } = useEnv()

    const [values, setValue] = useState({
        osztalyzat: [],
        suly: 100,
        datum: "",
        tema: "Értékelés",
        oktatasId: selected?.c?.orak?.filter(ora => ora.oktatas.tanar.id === user.tanar.id)[0]?.oktatas?.id,
    })

    const handleInputChange = (e) => {
        setValue({ ...values, [e.target.name]: e.target.value })
    }

    const [modalOpen, setModalOpen] = useState(false)

    const handleGradeChange = (value, diak) => {
        const isInList = values.osztalyzat?.find(item => item.diak.id === diak.id)

        if (isInList) {
            setValue({
                ...values, osztalyzat: values.osztalyzat.map(item =>
                    item.diak.id === diak.id
                        ? { ...item, osztalyzat: value }
                        : item
                )
            })
        } else {
            setValue({ ...values, osztalyzat: [...values.osztalyzat, { diak: diak, osztalyzat: value }] })
        }
    }

    const handleSave = () => {
        axios.post(`${backend}/grade/registerGrades`, values, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(res => {
                toast.success(res.data)
                setValue({
                    osztalyzat: [],
                    suly: 100,
                    datum: "",
                    tema: "Értékelés",
                    oktatasId: selected?.c?.orak?.filter(ora => ora.oktatas.tanar.id === user.tanar.id)[0]?.oktatas?.id,
                })
                setModalOpen(false)
            })
    }

    const calculateAvarage = (jegyek) => {
        const numbers = jegyek.filter(jegy => !isNaN(jegy.osztalyzat) && jegy?.oktatas?.id === values?.oktatasId)
        return ((numbers.reduce((a, b) => a + Number(b.osztalyzat) * Number(b.suly) / 100, 0) / numbers.length) || 0).toFixed(2)
    }

    return (
        <div className='w-full'>
            <button className="btn btn-outline max-w-xs" onClick={() => setModalOpen(true)}>Új értékelés</button>
            <Modal title={"Értékelés"} onClose={() => setModalOpen(false)} open={modalOpen}>
                <div className='max-w-xl mx-auto my-4 flex flex-col gap-2'>
                    <label className="input input-bordered flex items-center gap-2">
                        Dátum
                        <input type="date" name='datum' className="grow" placeholder="Daisy" onChange={handleInputChange} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Súly
                        <input type="number" name='suly' className="grow" placeholder="100%" onChange={handleInputChange} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        Téma
                        <input type="text" name='tema' className="grow" placeholder="..." onChange={handleInputChange} />
                    </label>
                    <TableContainer component={Paper} className='my-4 overflow-hidden'>
                        <Table className='overflow-hidden'>
                            <TableHead>
                                <TableRow className='divide-x-[1px]'>
                                    <TableCell>
                                        Tanuló
                                    </TableCell>
                                    <TableCell>
                                        Értékelés
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selected?.c?.diakok?.map(diak => (
                                    <TableRow key={diak.id} className='divide-x-[1px]'>
                                        <TableCell>
                                            {diak.felhasznalo.teljesNev}
                                        </TableCell>
                                        <TableCell>
                                            <Grades setValue={(value) => handleGradeChange(value, diak)} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <button className='btn btn-primary bg-blue-500 border-none' onClick={handleSave}>
                        Értékelés
                    </button>
                </div>

            </Modal>

            <TableContainer component={Paper} className='my-4 overflow-hidden'>
                <Table className='overflow-hidden h-full'>
                    <TableHead>
                        <TableRow className='divide-x-[1px]'>
                            <TableCell>
                                Tanuló
                            </TableCell>
                            {months?.map(month => (
                                <TableCell align='center' key={month}>
                                    {month.toString().padStart(2, '0')}
                                </TableCell>
                            ))}
                            <TableCell>
                                Átlag
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selected?.c?.diakok?.map(diak => (
                            <TableRow key={diak.id} className='divide-x-[1px]'>
                                <TableCell>
                                    {diak.felhasznalo.teljesNev}
                                </TableCell>
                                {months?.map(month => (
                                    <TableCell key={month}>
                                        {diak.jegyek.map(jegy => (
                                            <Tooltip key={jegy.id} content={
                                                <div className='text-sm flex flex-col'>
                                                    <span>Téma: {jegy.tema}</span>
                                                    <span>Dátum: {jegy.datum}</span>
                                                    <span>Súly: {jegy.suly}%</span>
                                                    <span>Értékelés: {jegy.osztalyzat}</span>
                                                </div>
                                            }>
                                                {(moment(jegy.datum).month() + 1) === month && jegy?.oktatas?.id === values?.oktatasId && <span className='hover:underline cursor-pointer mx-1'>{isNaN(jegy.osztalyzat) ? "..." : jegy.osztalyzat}</span>}
                                            </Tooltip>
                                        ))}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    {calculateAvarage(diak.jegyek)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default GradeTable