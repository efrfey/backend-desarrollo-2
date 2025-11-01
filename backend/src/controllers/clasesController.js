import express from "express";
import Clase from "../models/Clase.js";

const router = express.Router();

// 🔹 Simulando clases locales (por si Mongo falla o está vacío)
let clasesPorDocente = {
  "12345": [
    { id: 1, curso: "Matemáticas", hora: "08:00 AM", estado: "Activa", fecha: new Date() },
    { id: 2, curso: "Lenguaje", hora: "10:00 AM", estado: "Inactiva", fecha: new Date() },
  ],
  "99999": [
    { id: 3, curso: "Historia", hora: "07:00 AM", estado: "Activa", fecha: new Date() },
    { id: 4, curso: "Inglés", hora: "09:00 AM", estado: "Activa", fecha: new Date() },
  ],
};

// ✅ Ruta de prueba de conexión a MongoDB
router.get("/test", async (req, res) => {
  try {
    const clases = await Clase.find();
    res.json(clases);
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error);
    res.status(500).json({ mensaje: "Error al conectar con MongoDB" });
  }
});

// 🔹 Obtener clases por docenteId
router.get("/:docenteId", async (req, res) => {
  const { docenteId } = req.params;

  try {
    let clasesDB = [];

    // Intentar buscar en MongoDB
    try {
      clasesDB = await Clase.find({ docenteId });
    } catch (mongoError) {
      console.warn("⚠️ No se pudo conectar a MongoDB. Usando datos locales...");
    }

    // Si hay datos en Mongo, devolverlos
    if (clasesDB && clasesDB.length > 0) {
      return res.json(clasesDB);
    }

    // Si no hay en Mongo, usar los simulados
    const clasesLocales = clasesPorDocente[docenteId] || [];
    return res.json(clasesLocales);
  } catch (error) {
    console.error("❌ Error al obtener clases:", error);
    res.status(500).json({ mensaje: "Error al obtener clases" });
  }
});

// ✅ Registrar asistencia (Mongo o simulado)
router.post("/registrar", async (req, res) => {
  const { docenteId, curso } = req.body;

  if (!docenteId || !curso) {
    return res.status(400).json({ mensaje: "Faltan datos (docenteId o curso)" });
  }

  try {
    // Intentar actualizar en MongoDB
    let claseDB;
    try {
      claseDB = await Clase.findOne({ docenteId, curso });
      if (claseDB) {
        claseDB.estado = "Dictada ✅";
        await claseDB.save();
        return res.json({
          mensaje: `✅ Asistencia registrada para ${curso}`,
          claseActualizada: claseDB,
        });
      }
    } catch (mongoError) {
      console.warn("⚠️ No se pudo conectar a MongoDB. Usando modo local...");
    }

    // Si no existe en Mongo, usar la simulada
    const clases = clasesPorDocente[docenteId];
    if (!clases) return res.status(404).json({ mensaje: "Docente no encontrado" });

    const claseLocal = clases.find((c) => c.curso === curso);
    if (!claseLocal) return res.status(404).json({ mensaje: "Clase no encontrada" });

    claseLocal.estado = "Dictada ✅";
    return res.json({
      mensaje: `✅ Asistencia registrada (modo local) para ${curso}`,
      claseActualizada: claseLocal,
    });
  } catch (error) {
    console.error("❌ Error registrando asistencia:", error);
    res.status(500).json({ mensaje: "Error al registrar asistencia" });
  }
});

// ➕ Crear clase (solo Mongo)
router.post("/crear", async (req, res) => {
  try {
    const { docenteId, curso, hora } = req.body;
    if (!docenteId || !curso || !hora) {
      return res.status(400).json({ mensaje: "Faltan datos para crear la clase" });
    }

    const nuevaClase = new Clase({ docenteId, curso, hora });
    await nuevaClase.save();

    res.status(201).json({
      mensaje: "Clase creada correctamente",
      nuevaClase,
    });
  } catch (error) {
    console.error("❌ Error creando clase:", error);
    res.status(500).json({ mensaje: "Error creando clase" });
  }
});

export default router;
