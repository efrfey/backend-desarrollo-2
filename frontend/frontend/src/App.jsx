import React, { useState } from 'react';
import DocenteRegister from './components/DocenteRegister';
import ClassesTable from './components/ClassesTable';
import IncidenceForm from './components/IncidenceForm';
import AdminReport from './components/AdminReport';

export default function App() {
  const [docenteId, setDocenteId] = useState('');

  return (
    <div style={{ padding: 20 }}>
      <h1>📚 Sistema de Registro de Clases y Asistencias</h1>

      <hr />
      <DocenteRegister />

      <hr />
      <div>
        <h2>Ingresar cédula del docente para ver clases</h2>
        <input
          placeholder="Cédula del docente"
          value={docenteId}
          onChange={e => setDocenteId(e.target.value)}
        />
      </div>

      {docenteId && (
        <>
          <ClassesTable idDocente={docenteId} />
          <IncidenceForm idDocente={docenteId} />
        </>
      )}

      <hr />
      <AdminReport />
    </div>
  );
}
