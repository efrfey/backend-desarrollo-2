import Clase from '../models/Clase.js';

// Obtener todas las clases
export const obtenerClases = async (req, res) => {
  try {
    const clases = await Clase.find();
    res.json(clases);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener clases', error });
  }
};

// Crear una nueva clase
export const crearClase = async (req, res) => {
  try {
    const nuevaClase = new Clase(req.body);
    await nuevaClase.save();
    res.json({ mensaje: 'Clase creada correctamente', nuevaClase });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear clase', error });
  }
};

// Eliminar una clase por ID
export const eliminarClase = async (req, res) => {
  try {
    const { id } = req.params;
    await Clase.findByIdAndDelete(id);
    res.json({ mensaje: 'Clase eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la clase', error });
  }
};
