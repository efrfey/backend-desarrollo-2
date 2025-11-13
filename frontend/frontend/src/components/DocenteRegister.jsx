import React, { useState } from 'react';
import { crearDocente } from '../services/api';

export default function DocenteRegister() {
  const [form, setForm] = useState({
    cedula: '',
    nombre: '',
    email: '',
    telefono: '',
    departamento: '',
    titulo: '',
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await crearDocente(form);
    alert('✅ Docente registrado correctamente');
    setForm({ cedula: '', nombre: '', email: '', telefono: '', departamento: '', titulo: '' });
  }

  return (
    <div>
      <h2>Registro de Docente</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Cédula" value={form.cedula} onChange={e => setForm({...form, cedula: e.target.value})} required />
        <input placeholder="Nombre completo" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
        <input placeholder="Correo" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        <input placeholder="Teléfono" value={form.telefono} onChange={e => setForm({...form, telefono: e.target.value})} />
        <input placeholder="Departamento" value={form.departamento} onChange={e => setForm({...form, departamento: e.target.value})} />
        <input placeholder="Título académico" value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})} />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
