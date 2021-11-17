import React from 'react'
import { Routes, Route, HashRouter} from 'react-router-dom'
import Loginpage from "./pages/LoginPage"
import Registerpage from "./pages/RegisterPage"
import UserManagementpage from "./pages/UserManagementPage"
import NotFound from "./pages/NotFound"
import AuctionsPage from './pages/AuctionsPage'
import AuctionDetailPage from './pages/AuctionDetailPage'

export default function Router(props)
{
    return(
        <HashRouter>
              <Routes>
                <Route path="/" element={<AuctionsPage/>}/>
                <Route path="/login" element={<Loginpage/>}/>
                <Route path="/register" element={<Registerpage/>}/>
                <Route path="/auction-detail/:auctionId" element={<AuctionDetailPage/>}/>
                <Route path="/usr-man" element={<UserManagementpage/>}/>
                <Route path='*' element={<NotFound/>} />               
            </Routes>
        </HashRouter>
    )
}