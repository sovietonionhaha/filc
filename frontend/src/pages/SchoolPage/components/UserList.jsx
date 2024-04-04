import React, { useMemo, useState } from 'react'
import { useSchoolContext } from '../../../components/SchoolContext'
import Modal from '../../../components/Modal'
import { GridToolbar, DataGrid } from '@mui/x-data-grid'
import axios from "axios"
import { useAuthContext } from '../../../components/AuthContext'
import { toast } from "react-hot-toast"
import useEnv from '../../../../utils/useEnv'

export const UserList = ({ users }) => {
  const { data } = useSchoolContext()
  const { token } = useAuthContext()

  const { backend } = useEnv()

  const [values, setValue] = useState({
    teljesnev: "",
    szuletesiDatum: "",
    jelszo: "",
    telefonszam: "",
    iskola: data?.school?.nev
  })

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "teljesNev", headerName: "Név", width: 150 },
    { field: "jogosultsag", headerName: "Jogosultság", width: 150 },
  ]

  const rows = users?.map(user => {
    return { id: user.id, teljesNev: user.teljesNev, jogosultsag: user?.tanar && !user?.admin && "Tanár" || user?.tanar && user?.admin && "Tanár - admin" || user?.diak && "Diák" }
  })

  const handleSave = () => {
    axios.post(`${backend}/register/registerUser`, values, {
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
      teljesnev: "",
      szuletesiDatum: "",
      jelszo: "",
      telefonszam: "",
      iskola: data?.school?.nev
    })
    setOpen(false)
  }

  return (
    <div className='flex flex-col'>
      <h1 className='text-3xl font-semibold'>Felhasználók</h1>
      <button className="btn btn-outline max-w-xs" onClick={() => setOpen(!modalOpen)}>Új felhasználó felvétele</button>
      <Modal title={"Új felhasználó felvétele"} open={modalOpen} onClose={handleClose}>
      <div className='max-w-xs mx-auto my-4 flex flex-col gap-2'>
          <label className="input input-bordered flex items-center gap-2">
            Teljes név
            <input name='teljesnev' value={values.teljesnev} type="text" className="grow" placeholder="..." onChange={handleInputChange} />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Születési dátum
            <input name='szuletesiDatum' value={values.szuletesiDatum} type="date" className="grow" placeholder="..." onChange={handleInputChange} />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Jelszó
            <input name='jelszo' value={values.jelszo} type="text" className="grow" placeholder="..." onChange={handleInputChange}/>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Telefonszám
            <input name='telefonszam' value={values.telefonszam} type="text" className="grow" placeholder="..." onChange={handleInputChange} />
          </label>
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


