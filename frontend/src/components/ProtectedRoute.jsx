import React from 'react'
import { useAuthContext } from '../components/AuthContext'
import LoginPage from '../pages/LoginPage/LoginPage'
import HomePage from '../pages/HomePage/home/HomePage'
import Navbar from './Navbar/Navbar'

const ProtectedRoute = ({ children, teacher, admin }) => {
    const { user } = useAuthContext()

    if (!user) {
        return <LoginPage />
    }
    if (teacher && !user?.tanar) {
        return (
            <Navbar>
                <HomePage />
            </Navbar>
        )
    }
    if (admin && !user?.admin) {
        return (
            <Navbar>
                <HomePage />
            </Navbar>
        )
    }
    return children
}

export default ProtectedRoute

