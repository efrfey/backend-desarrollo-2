import mongoose from 'mongoose';

const claseSchema = new mongoose.Schema({
  nombre: String,
  profesor: String,
  horario: String,
});

const Clase = mongoose.model('Clase', claseSchema);
export default Clase;
