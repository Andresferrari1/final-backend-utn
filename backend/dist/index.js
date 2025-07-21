"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
process.loadEnvFile();
const PORT = process.env.PORT || 3000;
const URI_DB = process.env.URI_DB || "";
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Conexión a la base de datos
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongoose_1.connect)(URI_DB);
        console.log("✅ Conectado a Mongo DB");
    }
    catch (error) {
        console.log("🛑 Error al conectarse a Mongo DB");
    }
});
// Esquema de usuario
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user", "guest"], default: "user" }
}, {
    versionKey: false,
    timestamps: true
});
const User = (0, mongoose_1.model)("User", userSchema);
// GET todos los usuarios
app.get("/api/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find();
        res.json({ success: true, data: users, message: "Usuarios obtenidos" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));
// GET usuario por ID
app.get("/api/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }
        res.json({ success: true, data: user, message: "Usuario obtenido" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));
// POST crear usuario
app.post("/api/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new User(req.body);
        const savedUser = yield newUser.save();
        res.status(201).json({ success: true, data: savedUser, message: "Usuario creado" });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}));
// PUT actualizar usuario
app.put("/api/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }
        res.json({ success: true, data: updatedUser, message: "Usuario actualizado" });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}));
// DELETE eliminar usuario
app.delete("/api/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }
        res.json({ success: true, data: deletedUser, message: "Usuario eliminado" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor HTTP en funcionamiento en el puerto ${PORT}.`);
    connectDb();
});
