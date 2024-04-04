import React, { useMemo, useState } from 'react'
import Modal from '../../../components/Modal'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useSchoolContext } from '../../../components/SchoolContext'
import { useAuthContext } from '../../../components/AuthContext'
import axios from "axios"
import { toast } from "react-hot-toast"
import useEnv from '../../../../utils/useEnv'

export const ClassList = ({ classes }) => {
  const { data } = useSchoolContext()
  const { token } = useAuthContext()

  const { backend } = useEnv()

  const [values, setValue] = useState({
    azonosito: "",
    osztalyfonok: "",
    iskola: data?.school?.nev
  })

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "azonosito", headerName: "Azonosító", width: 150 },
    { field: "osztalyfonok", headerName: "Osztályfőnök", width: 150 },
  ]

  const rows = classes?.map(_class => {
    return { id: _class.id, azonosito: _class.azonosito, osztalyfonok: _class?.tanar?.felhasznalo?.teljesNev || "Nincs" }
  })

  const handleSave = () => {
    axios.post(`${backend}/register/registerClass`, values, {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then(res => {
        toast.success(res.data)
        setValue({
          azonosito: "",
          osztalyfonok: "",
          iskola: data?.school?.nev
        })
        setOpen(false)
      })
  }

  const handleInputChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value })
  }

  const [modalOpen, setOpen] = useState(false)

  const handleClose = () => {
    setValue({
      azonosito: "",
      osztalyfonok: "",
      iskola: data?.school?.nev
    })
    setOpen(false)
  }

  return (
    <div className='flex flex-col'>
      <h1 className='text-3xl font-semibold'>Osztályok</h1>
      <button className="btn btn-outline max-w-xs" onClick={() => setOpen(!modalOpen)}>Új osztály felvétele</button>
      <Modal title={"Új osztály felvétele"} open={modalOpen} onClose={handleClose}>
        <div className='max-w-xs mx-auto my-4 flex flex-col gap-2'>
          <label className="input input-bordered flex items-center gap-2">
            Azonosító
            <input name='azonosito' value={values.azonosito} type="text" className="grow" placeholder="..." onChange={handleInputChange} />
          </label>
          <select name='osztalyfonok' className="select select-bordered w-full max-w-xs" onChange={handleInputChange}>
            <option disabled selected hidden>Osztályfőnök</option>
            <option>Nincs</option>
            {data?.heads?.map(head => (
              <option key={head?.id} value={head?.id}>{head?.felhasznalo?.teljesNev}</option>
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