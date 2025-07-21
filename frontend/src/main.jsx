import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
// import { Home } from './views/home'
// import { Dashboard } from './views/dashboard'
// import { Register } from './views/register'
// import { Login } from './views/login'
// import { Layout } from './components/Layout'
import { RouterApp } from './router/RouterApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterApp/>
  </StrictMode>,
)
