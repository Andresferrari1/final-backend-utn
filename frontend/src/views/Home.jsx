import { Layout } from "../components/Layout";
import { useEffect, useState } from "react";

const Home = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/users");
                const data = await res.json();
                if (data.success) {
                    setUsers(data.data);
                } else {
                    setError("Error: " + data.message);
                }
            } catch (err) {
                setError("Error al conectar con el servidor");
            }
        };

        fetchUsers();
    }, []);

    return (
        <Layout>
            <h1>Bienvenido a nuestra página de productos artesanales</h1>
            <p>
                Descubrí nuestra selección de productos únicos hechos a mano. Calidad y
                diseño en cada detalle.
            </p>

            <section>
                <h2>Usuarios registrados</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>
                            <b>Usuario:</b> {user.name} - {user.email}
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
};

export { Home };
