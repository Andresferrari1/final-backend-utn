import { useState } from "react"
import { Link } from "react-router-dom"

const Layout = ({children}) =>{
    const [user, setUser] = useState(null)
    return (
        <>
        <header>
            <nav>
                {
                !user && <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
                }
                {
                    user && <>
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                        </ul>
                        <button>Cerrar sesion</button>
                    </>
                }
            </nav>
        </header>
        <main>
            {children}
        </main>
        <footer>
            <p>Sitio desarrollado por Andrés Ferrari | UTN</p>
        </footer>
        </>
    )
}

export {Layout}