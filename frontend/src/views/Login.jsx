import { useState } from "react";
import { Layout } from "../components/Layout";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Inicio de sesión exitoso ✅");
        // Guardar token o redirigir si querés
      } else {
        setMessage(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      setMessage("Error al conectar con el servidor");
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <h2 className="auth-title">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="form-button">
            Iniciar sesión
          </button>
        </form>

        {message && <p className="form-message">{message}</p>}
      </div>
    </Layout>
  );
};

export { Login };
