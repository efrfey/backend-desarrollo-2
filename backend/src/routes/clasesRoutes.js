import express from "express";

const router = express.Router();

// Ruta de prueba
router.get("/", (req, res) => {
  res.json([
    {
      _id: 1,
      curso: "Matemáticas",
      hora: "08:00 AM",
      estado: "Activa",
      fecha: new Date(),
    },
    {
      _id: 2,
      curso: "Lenguaje",
      hora: "10:00 AM",
      estado: "Inactiva",
      fecha: new Date(),
    },
  ]);
});

export default router;
