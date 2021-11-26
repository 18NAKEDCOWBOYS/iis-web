import React from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom'
import Loginpage from "./pages/LoginPage"
import Registerpage from "./pages/RegisterPage"
import UserManagementpage from "./pages/UserManagementPage"
import NotFound from "./pages/NotFound"
import AuctionsPage from './pages/AuctionsPage'
import AuctionDetailPage from './pages/AuctionDetailPage'
import UserProfilePage from './pages/UserProfilePage'
import NavigationBar from './components/NavigationBar'
import { useLocation } from 'react-router'
import ErrorPage from './pages/ErrorPage'

export default function Router() {
    let location = useLocation().pathname
    return (
        <>

            <NavigationBar page={location} />
            <Routes>
                <Route path="/" element={<AuctionsPage />} />
                <Route path="/login" element={<Loginpage />} />
                <Route path="/register" element={<Registerpage />} />
                <Route path="/user-profile" element={<UserProfilePage />} />
                <Route path="/auction-detail/:auctionId" element={<AuctionDetailPage />} />
                <Route path="/usr-man" element={<UserManagementpage />} />
                <Route path='*' element={<NotFound />} />
                <Route path='/error/:errorId/:errorText' element={<ErrorPage/>} />
            </Routes>
        </>
    )
}