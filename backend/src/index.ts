import express from "express"
import { connectDb } from "./config/mongo"
import { userRouter } from "./routers/user_router"
import cors from "cors"

const PORT = process.env.PORT || 3000

const app = express()

// ✅ Habilitar CORS antes de las rutas
app.use(cors())

app.use(express.json())

// ✅ (opcional) Usar tus rutas, si tenés más routers
app.use("/api/users", userRouter) // ejemplo

app.listen(PORT, () => {
  console.log(`✅ Servidor HTTP en funcionamiento en el puerto ${PORT}.`)
  connectDb()
})
console.log("PORT desde .env:", process.env.PORT)