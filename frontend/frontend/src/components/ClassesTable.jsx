import React, { useEffect, useState } from 'react';
import { getClasesHoy, marcarAsistencia } from '../services/api';

export default function ClassesTable({ idDocente }) {
  const [clases, setClases] = useState([]);

  useEffect(() => {
    if (idDocente) getClasesHoy(idDocente).then(setClases);
  }, [idDocente]);

  async function handleAsistencia(idClase) {
    await marcarAsistencia(idClase);
    setClases(prev => prev.map(c => c.idClase === idClase ? { ...c, asistenciaRegistrada: true } : c));
  }

  return (
    <div>
      <h2>Clases del día</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Materia</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Asistencia</th>
          </tr>
        </thead>
        <tbody>
          {clases.map(c => (
            <tr key={c.idClase}>
              <td>{c.materia}</td>
              <td>{new Date(c.fecha).toLocaleDateString()}</td>
              <td>{c.horaInicio} - {c.horaFin}</td>
              <td>
                {c.asistenciaRegistrada
                  ? '✅ Registrada'
                  : <button onClick={() => handleAsistencia(c.idClase)}>Registrar</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
