import { createContext, useContext, useEffect, useMemo, useState } from "react"
import Cookies from "universal-cookie"
import axios from "axios"
import useEnv from "../../utils/useEnv"

export const AuthContext = createContext(null)

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null) 
    const [token, setToken] = useState(localStorage.getItem("token") || null)    

    const { backend } = useEnv()

    useMemo(() => {
        localStorage.setItem("token", token)
        if (token) {
            axios.post(`${backend}/auth/getCurrentUser`, undefined, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            .then(res => {
                setUser(res.data)
            })
            .catch(error => {
                setUser(null)
            })
        }
    }, [token])

    const Logout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{ Logout, user, setToken, token }}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuthContext() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error(
            "Provider között kell legyen"
        )
    }
    return context
}