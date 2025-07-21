import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Home } from "../views/home"
import { Dashboard } from "../views/dashboard"
import { Register } from "../views/register"
import { Login } from "../views/login"


const RouterApp = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}   />
                <Route path="/dashboard" element={<Dashboard/>}   />
                <Route path="/login" element={<Login/>}   />
                <Route path="/register" element={<Register/>}   />
            </Routes>
        </BrowserRouter>
    )
}

export {RouterApp}