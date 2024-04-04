import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSchoolContext } from '../../../components/SchoolContext'
import Modal from '../../../components/Modal'
import { GridToolbar, DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import axios from "axios"
import { useAuthContext } from '../../../components/AuthContext'
import { toast } from "react-hot-toast"
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import useEnv from '../../../../utils/useEnv'

export const TeacherList = ({ teachers }) => {
  const { data } = useSchoolContext()

  const { backend } = useEnv()

  const [values, setValue] = useState({
    teljesnev: "",
    szuletesiDatum: "",
    jelszo: "",
    telefonszam: "",
    felhasznalonev: "",
    oktatas: [],
    iskola: data?.school?.nev
  })

  const { token } = useAuthContext()

  const handleEditSave = (id) => {
    axios.post(`${backend}/register/updateTeacher`, rows[id - 1], {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then(res => {
        toast.success(res.data)
      })
  }

  const handleDelete = (id) => {
  }

  const handleInputChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value })
  }

  const handleCheckChange = (e, subject) => {
    if (e.target.checked) {
      setValue({ ...values, oktatas: [...values.oktatas, { id: subject.id, nev: subject.nev, _id: subject.id }] })
    } else {
      setValue({ ...values, oktatas: values.oktatas.filter(a => a.id !== subject.id) })
    }
  }

  const handleSave = () => {
    axios.post(`${backend}/register/registerTeacher`, values, {
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
          felhasznalonev: "",
          oktatas: [],
          iskola: data?.school?.nev
        })
        setOpen(false)
      })
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "teljesNev", headerName: "Név", width: 150 },
    { field: "szuletesiDatum", headerName: "Születési dátum", width: 150 },
    { field: "telefonszam", headerName: "Telefonszám", width: 150 },
    { field: "felhasznalonev", headerName: "Felhasználónév", width: 150, editable: true },
    { field: "osztaly", headerName: "Osztályfőnök", width: 150 },
    { field: "oktatas", headerName: "Oktatás", width: 150 },
    {
      field: "actions",
      type: "actions",
      headerName: "Műveletek",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label='Mentés'
            sx={{
              color: 'primary.main'
            }}
            onClick={() => handleEditSave(id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label='Törlés'
            onClick={() => handleDelete(id)}
            color='inherit'
          />
        ]
      }
    }
  ]

  const [rows, setRows] = useState(teachers?.map(teacher => {
    return { id: teacher.tanar.id, teljesNev: teacher.teljesNev, szuletesiDatum: teacher.szuletesiDatum, telefonszam: teacher.telefonszam, felhasznalonev: teacher.tanar.felhasznalonev, osztaly: teacher?.tanar?.osztaly?.azonosito, oktatas: teacher?.tanar?.oktatasok?.map(oktatas => { return oktatas.tantargy.nev }) }
  }))

  const handleEdit = useCallback(
    (newRow) => {
      setRows(
        rows.map(oldRow =>
          oldRow.id === newRow.id
            ? newRow
            : oldRow
        )
      )
    }, [rows]
  )

  const [modalOpen, setOpen] = useState(false)

  const handleClose = () => {
    setValue({
      teljesnev: "",
      szuletesiDatum: "",
      jelszo: "",
      telefonszam: "",
      felhasznalonev: "",
      oktatas: [],
      iskola: data?.school?.nev
    })
    setOpen(false)
  }

  return (
    <div className='flex flex-col'>
      <h1 className='text-3xl font-semibold'>Tanárok</h1>
      <button className="btn btn-outline max-w-xs" onClick={() => setOpen(!modalOpen)}>Új tanár felvétele</button>
      <Modal title={"Új tanár felvétele"} open={modalOpen} onClose={handleClose}>
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
            <input name='jelszo' value={values.jelszo} type="password" className="grow" placeholder="..." onChange={handleInputChange} />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Telefonszám
            <input name='telefonszam' value={values.telefonszam} type="text" className="grow" placeholder="..." onChange={handleInputChange} />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Felhasználónév
            <input name='felhasznalonev' value={values.felhasznalonev} type="text" className="grow" placeholder="..." onChange={handleInputChange} />
          </label>
          <div className="form-control">
            {data?.subjects?.map((subject, index) => (
              <label className="label cursor-pointer">
                <span className="label-text">{subject.nev}</span>
                <input name={subject.nev} type="checkbox" className="checkbox" onChange={(e) => handleCheckChange(e, subject)} />
              </label>
            ))}
          </div>
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
        processRowUpdate={handleEdit}
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


