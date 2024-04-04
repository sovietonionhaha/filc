import React, { useEffect, useMemo, useState } from 'react'
import { useSchoolContext } from '../../../components/SchoolContext'
import axios from 'axios'
import { useAuthContext } from '../../../components/AuthContext'
import toast from "react-hot-toast"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Modal from '../../../components/Modal'
import useEnv from '../../../../utils/useEnv'

export const StudentList = ({ students }) => {
  const { data } = useSchoolContext()
  const { token } = useAuthContext()

  const { backend } = useEnv()

  const [values, setValue] = useState({
    teljesnev: "",
    szuletesiDatum: "",
    jelszo: "",
    telefonszam: "",
    omAzonosito: "",
    osztaly: "",
    iskola: data?.school?.nev
  })

  const handleSave = () => {
    if (values.osztaly == "") {
      return toast.error("Osztály megadása kötelező")
    }

    axios.post(`${backend}/register/registerStudent`, values, {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then(res => {
        toast.success(res.data)
        setValue({
          teljesnev: "",
          szuletesiDatum: "",
          jelszo: "",
          telefonszam: "",
          omAzonosito: "",
          osztaly: "",
          iskola: data?.school?.nev
        })
        setOpen(false)
      })
  }

  const handleInputChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value })
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "teljesNev", headerName: "Név", width: 150, editable: true },
    { field: "omAzonosito", headerName: "OM Azonosító", width: 150, editable: true },
    { field: "telefonszam", headerName: "Telefonszám", width: 150, editable: true },
    { field: "osztaly", headerName: "Osztály", width: 150, editable: true },
    { field: "szuletesiDatum", headerName: "Születési dátum", width: 150, editable: true },
  ]

  const rows = students?.map(student => {
    return { id: student.id, teljesNev: student.teljesNev, omAzonosito: student.diak.omAzonosito, telefonszam: student.telefonszam, osztaly: student.diak.osztaly.azonosito, szuletesiDatum: student.szuletesiDatum }
  })

  const [modalOpen, setOpen] = useState(false)

  const handleClose = () => {
    setValue({
      teljesnev: "",
      szuletesiDatum: "",
      jelszo: "",
      telefonszam: "",
      omAzonosito: "",
      osztaly: "",
      iskola: data?.school?.nev
    })
    setOpen(false)
  }

  return (
    <div className='flex flex-col'>
      <h1 className='text-3xl font-semibold'>Diákok</h1>
      <button className="btn btn-outline max-w-xs" onClick={() => setOpen(!modalOpen)}>Új diák felvétele</button>
      <Modal title={"Új diák felvétele"} open={modalOpen} onClose={handleClose}>
        <div className='max-w-xs mx-auto my-4 flex flex-col gap-2'>
          <label className="input input-bordered flex items-center gap-2">
            Teljes név
            <input name='teljesnev' value={values.teljesnev} type="text" className="grow" placeholder="..." onChange={handleInputChange} />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Születési dátum
            <input name='szuletesiDatum' value={values.szuletesiDatum} type="date" className="grow" placeholder="..." onChange={handleInputChange} />
          </label>
          <label className="input input-bordered flex items-center gap-2 input-disabled">
            Jelszó
            <input type="text" value={values.szuletesiDatum} className="grow" disabled placeholder="..." />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Telefonszám
            <input name='telefonszam' type="text" value={values.telefonszam} className="grow" placeholder="..." onChange={handleInputChange} />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            OM azonosító
            <input name='omAzonosito' type="text" value={values.omAzonosito} className="grow" placeholder="..." onChange={handleInputChange} />
          </label>
          <select name='osztaly' className="select select-bordered w-full max-w-xs" onChange={handleInputChange}>
            <option disabled selected hidden>Osztály</option>
            {data?.classes?.map(_class => (
              <option key={_class.azonosito} value={_class.azonosito}>{_class.azonosito}</option>
            ))}
          </select>
          <button className='btn btn-primary bg-blue-500 border-none' onClick={handleSave}>
            Felvétel
          </button>
        </div>
      </Modal>
      <DataGrid
        className='mt-4'
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            }
          }
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true
          }
        }}
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  )
}
