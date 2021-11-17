import React from 'react'
import { Routes, Route, HashRouter} from 'react-router-dom'
import Loginpage from "./pages/LoginPage"
import Registerpage from "./pages/RegisterPage"
import UserManagementpage from "./pages/UserManagementPage"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import AuctionsPage from './pages/AuctionsPage'

export default function Router(props)
{
    return(
        <HashRouter>
              <Routes>
                <Route path="/login" element={<Loginpage/>}/>
                <Route path="/register" element={<Registerpage/>}/>
                <Route path="/usr-man" element={<UserManagementpage/>}/>
                <Route path="/" element={<AuctionsPage/>}/>
                <Route path='*' element={<NotFound/>} />               
            </Routes>
        </HashRouter>
    )
}