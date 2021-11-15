import React from 'react'
import { Routes, Switch, Route, BrowserRouter} from 'react-router-dom'
import Loginpage from "./pages/LoginPage"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
export default function Router(props)
{
    return(
        <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Loginpage/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path='*' element={<NotFound/>} />               
            </Routes>
        </BrowserRouter>
    )
}