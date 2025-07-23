import { useState } from "react"
import { Layout } from "../components/Layout"
import { validatePassword } from "../validators/register"

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    })

    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setMessage("")

        const { name, email, password } = formData

        if (!name || !email || !password) {
            setError("Todos los campos son obligatorios")
            return
        }

        if (name.length < 3 || name.length > 12) {
            setError("El nombre debe tener entre 3 y 12 caracteres")
            return
        }

        if (!email.includes("@")) {
            setError("Correo electrónico no válido")
            return
        }

        if (password.length < 4) {
            setError("La contraseña debe tener al menos 4 caracteres")
            return
        }

        if (!validatePassword(password)) {
            setError("La contraseña debe incluir al menos un carácter especial")
            return
        }

        try {
            const res = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (data.success) {
                setMessage("Usuario creado con éxito")
                setFormData({ name: "", email: "", password: "", role: "user" })
            } else {
                setError("Error: " + (data.message || "Usuario no creado"))
            }
        } catch (error) {
            setError("Error de red o del servidor")
        }
    }

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    return (
        <Layout>
            <h1 className="register-title">Registrate</h1>
            <form onSubmit={handleSubmit} className="register-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                />

                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="input-field"
                />
                
                <button type="button" onClick={toggleShowPassword} className="toggle-password-btn">
                    {showPassword ? "Ocultar" : "Ver"} contraseña
                </button>

                <button type="submit" className="submit-btn">Registrar</button>
            </form>

            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
        </Layout>
    )
}

export { Register }

