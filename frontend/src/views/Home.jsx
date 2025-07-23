import { Layout } from "../components/Layout"
import { useEffect, useState } from "react"

const Home = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/users")
        const data = await res.json()
        if (data.success) {
          setUsers(data.data)
        } else {
          setError("Error: " + data.message)
        }
      } catch (err) {
        setError("Error al conectar con el servidor")
      }
    }

    fetchUsers()
  }, [])

  return (
    <Layout>
      <div className="page-container">
        <h1 className="page-title">Bienvenido a nuestra página de productos artesanales</h1>
        <p className="page-description">
          Descubrí nuestra selección de productos únicos hechos a mano. Calidad y
          diseño en cada detalle.
        </p>

        <section className="user-section">
          <h2 className="user-section-title">Usuarios registrados</h2>
          {error && <p className="error-message">{error}</p>}
          <ul className="user-list">
            {users.map((user) => (
              <li key={user._id} className="user-list-item">
                <b>Usuario:</b> {user.name} - {user.email}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  )
}

export { Home }
