import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import clasesRoutes from "./routes/clasesRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ruta principal (para probar si el servidor responde)
app.get("/", (req, res) => {
  res.send("Servidor backend funcionando correctamente ✅");
});

// Rutas de clases
app.use("/api/clases", clasesRoutes);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error de conexión a MongoDB:", err));

export default app;
