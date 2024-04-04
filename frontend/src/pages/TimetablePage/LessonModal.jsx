import Modal from '../../components/Modal'
import React, { useEffect, useMemo, useState } from 'react'
import axios from "axios"
import { toast } from 'react-hot-toast'
import moment from 'moment'
import clsx from 'clsx'
import { useAuthContext } from '../../components/AuthContext'
import { LuTrash2 } from "react-icons/lu";
import useEnv from '../../../utils/useEnv'

const LessonModal = ({ isOpen, data, onClose, currentUser, isTeacher }) => {
  const [hianyzasok, setHianyzasok] = useState([])
  const [tema, setTema] = useState("")

  const { backend } = useEnv()

  const { token, user } = useAuthContext()

  const { lesson, record, canRecorded } = data

  useMemo(() => {
    setHianyzasok(
      record?.hianyzasok.map(hianyzas => {
        return { diak: hianyzas.diak, isMissing: true }
      }) || []
    )
    setTema(
      record?.tema || "Nincs téma"
    )
  }, [])

  const handleSave = () => {
    if (record && isEditable) {
      axios.post(`${backend}/lesson/updateLesson`, { lesson, hianyzasok, tema, record }, {
        headers: {
          "Authorization": "Bearer " + token
        }
      })
        .then(res => {
          toast.success(res.data)
        })
    } else {
      axios.post(`${backend}/lesson/registerLesson`, { lesson, hianyzasok, tema }, {
        headers: {
          "Authorization": "Bearer " + token
        }
      })
        .then(res => {
          toast.success(res.data)
        })
    }
  }

  const handleToggle = (e, diak) => {
    setHianyzasok(
      hianyzasok?.find((hianyzas) => hianyzas.diak.id === diak.id)?.diak ? hianyzasok?.map((hianyzas, i) => {
        if (hianyzas.diak.id === diak.id) {
          return { diak: diak, isMissing: e.target.checked }
        }
        return hianyzas
      })
        : [
          ...hianyzasok,
          { diak: diak, isMissing: e.target.checked }
        ]
    )
  }

  const handleDelete = () => {
    axios.post(`${backend}/register/deleteLesson`, { lessonId: data?.lesson?.id }, {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then(res => {
        toast.success(res.data)
        onClose()
      })
  }

  const isEditable = moment(record?.createdAt).format("w") == moment().format("w")

  return (
    <Modal title={`${lesson?.oktatas?.tantargy?.nev}`} open={isOpen} onClose={onClose}>
      <div>
        {lesson?.oktatas?.tanarId == currentUser?.tanar?.id && isTeacher ? (
          <div className='flex flex-col gap-3 m-2 my-6'>
            {record && <h1>{isEditable ? "Szerkeszthető" : "Már nem szerkeszthető"}</h1>}
            {!record && <h1>{canRecorded ? "Lekönyvelhető" : "Már nem lekönyvelhető"}</h1>}
            <div>
              <h1 className='font-semibold'>Tanóra témája</h1>
              <input type="text" placeholder="Téma" className="input input-bordered w-full max-w-xs read-only:input-disabled" onChange={(e) => setTema(e.target.value)} readOnly={!isEditable || !canRecorded} defaultValue={tema} />
            </div>
            <div>
              <div className='w-full flex justify-between'>
                <h1 className='font-semibold'>Jelenlét</h1>
                <input type="checkbox" className="toggle toggle-success" onClick={(e) => setVariant(e.target.checked)} />
              </div>
              <div className='w-full flex flex-col gap-2 mt-4'>
                {lesson?.osztaly?.diakok?.map((diak) => (
                  <div key={diak.id} className='flex gap-3 justify-between'>
                    <h1>{diak?.felhasznalo?.teljesNev}</h1>
                    <input type="checkbox" className="toggle toggle-success" disabled={!isEditable} onClick={(e) => handleToggle(e, diak)} defaultChecked={hianyzasok.find(hianyzas => hianyzas.diak.id == diak.id)} />
                  </div>
                ))}
              </div>
            </div>
            <div className='flex flex-row-reverse mt-4'>
              <button className={clsx("btn text-white", canRecorded ? "bg-green-500" : "bg-slate-500 btn-disabled")} onClick={() => handleSave()}>Mentés</button>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-3 m-2 my-6'>
            <div>
              <h1 className='font-semibold'>Tanóra témája</h1>
              <input type="text" placeholder="Téma" className="input input-bordered w-full max-w-xs read-only:input-disabled" readOnly defaultValue={record?.tema} />
            </div>
            <div>
              <div className='w-full flex justify-between'>
                <h1 className='font-semibold'>Jelenlét</h1>
              </div>
              <div className='w-full flex flex-col gap-2 mt-4'>
                {lesson?.osztaly?.diakok?.map((diak) => (
                  <div key={diak.id} className='flex gap-3 justify-between'>
                    <h1>{diak?.felhasznalo?.teljesNev}</h1>
                    <input type="checkbox" className="toggle toggle-success" disabled defaultChecked={hianyzasok.find(hianyzas => hianyzas.diak.id == diak.id)} />
                  </div>
                ))}
              </div>
            </div>
            <div className='w-full flex justify-between items-end'>
              {user?.admin && <LuTrash2 size={50} className='btn btn-error p-3 text-white btn-square' onClick={handleDelete} />
              }
              <div className='flex flex-row-reverse mt-4'>
                <button className={clsx("btn text-white btn-neutral")} onClick={onClose}>Bezárás</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal >
  )
}

export default LessonModal