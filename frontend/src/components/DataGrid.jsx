import clsx from "clsx"
import { useEffect, useState } from "react"
import Modal from "../components/Modal"

const DataGrid = ({ initialData, columns, initialSearchBy, addTitle, children }) => {
  const [search, setSearch] = useState("")
  const [searchBy, setSearchBy] = useState(initialSearchBy)
  const [data, setData] = useState(initialData)
  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  useEffect(() => {
    if (search.length > 0 && searchBy) {
      setData(
        initialData.filter(item => {
          let value = eval(`item.${searchBy}`)?.toString()
          return value.toLowerCase().includes(search.toLowerCase()) && item
        })
      )
    } else {
      setData(initialData)
    }
  }, [search])

  const handleClick = (col) => {
    setSearchBy(col.field)
  }
  const [modalOpen, setOpen] = useState(false)

  return (
    <>
      <Modal title={addTitle} open={modalOpen} onClose={() => setOpen(!modalOpen)}>
        {children}
      </Modal>
      <div className="my-4">
        <div className="flex w-full gap-2">
          <input type="text" placeholder="Keresés" className="input input-bordered w-full max-w-xs" onChange={handleChange} />
          {addTitle && <button className="btn btn-outline" onClick={() => setOpen(!modalOpen)}>{addTitle}</button>}
        </div>
        <div className="flex flex-col divide-y gap-2 p-2 outline-1 outline outline-neutral-300 rounded-md my-2">
          <div className="flex gap-3 text-sm divide-x-2 divide-neutral-400">
            {columns?.map((col) => (
              <div key={col.field} className="flex w-full justify-center">
                <h1 className={clsx("text-neutral-600 hover:underline cursor-pointer", searchBy == col.field && "font-bold")} onClick={() => handleClick(col)} title={`Keresés ${col.headerName} alapján`}>{col.headerName}</h1>
              </div>
            ))}
          </div>
          <div className="divide-y-2">
            {data?.map((item) => (
              <div key={item.id} className="flex gap-3 text-sm p-1 text-neutral-900">
                {columns.map((col) => (
                  <div className="flex w-full justify-center p-1" key={col.field}>
                    <h1>{eval(`item.${col.field}`)}</h1>
                  </div>
                ))}
              </div>
            ))}
            {data?.length == 0 && (
              <div className="flex w-full justify-center p-1">
                <h1>Nincs találat</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default DataGrid