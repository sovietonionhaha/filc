import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AuthProvider from "../src/components/AuthContext"
import { Toaster } from "react-hot-toast"
import ProtectedRoute from "./components/ProtectedRoute"
import HomePage from "./pages/HomePage/home/HomePage"
import Navbar from "./components/Navbar/Navbar"
import TimetablePage from "./pages/TimetablePage/TimetablePage"
import NavbarProvider from "./components/Navbar/NavbarContext"
import SchoolPage from "./pages/SchoolPage/SchoolPage"
import SchoolProvider from "./components/SchoolContext"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { huHU } from "@mui/x-data-grid"
import SettingsPage from "./pages/SettingsPage/SettingsPage"
import AbsencePage from "./pages/AbsencePage/AbsencePage"
import GradePage from "./pages/GradePage/GradePage"
import "./App.css"

function App() {

  const theme = createTheme(
    huHU
  )

  return (
    <>
      <Toaster />
      <ThemeProvider theme={theme}>
        <NavbarProvider>
          <AuthProvider>
            <SchoolProvider>
              <Router>
                <Routes>
                  <Route path="/" element={
                    <ProtectedRoute>
                      <Navbar>
                        <HomePage />
                      </Navbar>
                    </ProtectedRoute>
                  } />
                  <Route path="/timetable" element={
                    <ProtectedRoute>
                      <Navbar>
                        <TimetablePage />
                      </Navbar>
                    </ProtectedRoute>
                  } />
                  <Route path="/school" element={
                    <ProtectedRoute admin>
                      <Navbar>
                        <SchoolPage />
                      </Navbar>
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <Navbar>
                        <SettingsPage />
                      </Navbar>
                    </ProtectedRoute>
                  } />
                  <Route path="/absence" element={
                    <ProtectedRoute>
                      <Navbar>
                        <AbsencePage />
                      </Navbar>
                    </ProtectedRoute>
                  } />
                  <Route path="/grade" element={
                    <ProtectedRoute>
                      <Navbar>
                        <GradePage />
                      </Navbar>
                    </ProtectedRoute>
                  } />
                </Routes>
              </Router>
            </SchoolProvider>
          </AuthProvider>
        </NavbarProvider>
      </ThemeProvider>
    </>
  )
}

export default App
