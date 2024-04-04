import Button from "../../../components/Button"
import Input from "../../../components/inputs/Input"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { AuthContext, useAuthContext } from "../../../components/AuthContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import useEnv from "../../../../utils/useEnv"

const AuthForm = () => {
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)

    const { setToken } = useAuthContext()

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    useEffect(() => {
        isValid()
    }, [credentials])  
    
    const isValid = () => {
        setDisabled(true)
        if (credentials.password.length > 0 && credentials.username.length > 0) {
            setDisabled(false)
        }
    }

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.id]: e.target.value})
    }

    const { backend } = useEnv()

    const handleClick = () => {
        setLoading(true)
        axios.post(`${backend}/auth/login`, credentials)
        .then(res => {
            if (res.status == 200) {
                toast.success("Sikeres bejelentkezés", {
                    position: "top-center"
                })
                setToken(res.data.token)
            }
        })
        .catch(error => {
            toast.error(error.response.data, {
                position: "top-center"
            })
            setCredentials({
                username: "",
                password: ""
            })
            setLoading(false)
        })
    }

    return (
        <div className="m-4">
            <Input id="username" disabled={loading} type="text" placeholder="Felhasználónév vagy OM-azonosító" onChange={handleChange} value={credentials.username}/>
            <Input id="password" disabled={loading} type="password" placeholder="Jelszó" onChange={handleChange} value={credentials.password}/>
            <Button label="Belépés" primary disabled={disabled || loading} onClick={handleClick} loading={loading}/>
        </div>
    )
}

export default AuthForm