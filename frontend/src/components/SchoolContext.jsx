import { createContext, useCallback, useContext, useMemo, useState } from "react";
import axios from "axios"
import { useAuthContext } from "../components/AuthContext";
import useEnv from "../../utils/useEnv";

const SchoolContext = createContext()

const SchoolProvider = ({ children }) => {
    const { token, user } = useAuthContext()

    const [data, setData] = useState(null)

    const { backend } = useEnv()

    useMemo(() => {
        if (user?.admin) {
            axios.post(`${backend}/school/get`, {
                iskolaId: user?.iskola.id
            }, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
                .then(res => {
                    setData(res.data)
                })
        }
    }, [user])

    return (
        <SchoolContext.Provider value={{ data }}>
            {children}
        </SchoolContext.Provider>
    )
}

export default SchoolProvider

export function useSchoolContext() {
    return useContext(SchoolContext)
}