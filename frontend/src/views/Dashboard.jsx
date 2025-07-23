import { Layout } from "../components/Layout"
import SearchProducts from "../components/SearchProducts"

const Dashboard = () => {
  return (
    <Layout>
      <div className="dashboard-container">
        <h1 className="dashboard-title">Panel de productos</h1>
        <p className="dashboard-description">
          Usá el buscador para encontrar productos disponibles. Podés filtrar por nombre, categoría o disponibilidad.
        </p>

        <SearchProducts />

        <section className="dashboard-info">
          <h2 className="dashboard-subtitle">¿Qué podés hacer aquí?</h2>
          <ul className="dashboard-list">
            <li>🔍 Buscar productos en tiempo real.</li>
            <li>📦 Ver información detallada de cada ítem.</li>
            <li>📝 Administrar tu inventario artesanal.</li>
          </ul>
        </section>
      </div>
    </Layout>
  )
}

export { Dashboard }

