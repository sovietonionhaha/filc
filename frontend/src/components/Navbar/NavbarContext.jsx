import { createContext, useContext, useState } from "react";

const NavbarContext = createContext()

const NavbarProvider = ({children}) => {
    const [isOpen, setOpen] = useState(true)

    return (
        <NavbarContext.Provider value={{ isOpen, setOpen }}>
            {children}
        </NavbarContext.Provider>
    )
}

export default NavbarProvider

export const useNavbarContext = () => {
    return useContext(NavbarContext)
}