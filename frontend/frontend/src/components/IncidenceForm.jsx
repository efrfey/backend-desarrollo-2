import React, { useState, useEffect } from 'react';
import { getClasesHoy, postIncidencia } from '../services/api';

export default function IncidenceForm({ idDocente }) {
  const [clases, setClases] = useState([]);
  const [form, setForm] = useState({ idClase: '', descripcion: '' });

  useEffect(() => {
    if (idDocente) getClasesHoy(idDocente).then(setClases);
  }, [idDocente]);

  async function handleSubmit(e) {
    e.preventDefault();
    await postIncidencia({ ...form, idDocente });
    alert('⚠️ Incidencia registrada');
    setForm({ idClase: '', descripcion: '' });
  }

  return (
    <div>
      <h2>Registrar incidencia</h2>
      <form onSubmit={handleSubmit}>
        <select value={form.idClase} onChange={e => setForm({...form, idClase: e.target.value})} required>
          <option value="">Selecciona una clase</option>
          {clases.map(c => (
            <option key={c.idClase} value={c.idClase}>
              {c.materia} - {new Date(c.fecha).toLocaleDateString()}
            </option>
          ))}
        </select>
        <textarea placeholder="Describe el problema" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} required />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
