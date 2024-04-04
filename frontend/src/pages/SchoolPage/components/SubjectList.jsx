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

export const SubjectList = ({ subjects }) => {
  const { data } = useSchoolContext()
  const { token } = useAuthContext()

  const { backend } = useEnv()

  const [values, setValue] = useState({
    nev: "",
    iskola: data?.school?.nev
  })

  const handleEditSave = (id) => {
    axios.post(`${backend}/register/updateSubject`, rows[id - 1], {
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

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "nev", headerName: "Név", width: 150, editable: true },
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

  const [rows, setRows] = useState(subjects?.map(subject => {
    return { id: subject.id, nev: subject.nev }
  }))

  const handleSave = () => {
    axios.post(`${backend}/register/registerSubject`, values, {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then(res => {
        toast.success(res.data)
        setValue({
          nev: "",
          iskola: data?.school?.nev
        })
        setOpen(false)
      })
  }

  const handleInputChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value })
  }

  const [modalOpen, setOpen] = useState(false)

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

  const handleClose = () => {
    setValue({
      nev: "",
      iskola: data?.school?.nev
    })
    setOpen(false)
  }

  return (
    <div className='flex flex-col'>
      <h1 className='text-3xl font-semibold'>Tantárgyak</h1>
      <button className="btn btn-outline max-w-xs" onClick={() => setOpen(!modalOpen)}>Új tantárgy felvétele</button>
      <Modal title={"Új tantárgy felvétele"} open={modalOpen} onClose={handleClose}>
        <div className='max-w-xs mx-auto my-4 flex flex-col gap-2'>
          <label className="input input-bordered flex items-center gap-2">
            Név
            <input name='nev' value={values.nev} type="text" className="grow" placeholder="..." onChange={handleInputChange} />
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