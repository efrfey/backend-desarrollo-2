import React, { useState } from 'react'
import ClasesHoy from './components/ClasesHoy'

export default function App() {
  const [cedula, setCedula] = useState('')
  const [docenteId, setDocenteId] = useState('')

  const buscar = () => {
    if (!cedula) return alert('Ingresa una cédula')
    setDocenteId(cedula)
  }

  return (
    <div className="container">
      <h1>Registro de Clases</h1>
      <div style={{display: 'flex', gap: '8px', marginBottom: '12px'}}>
        <input placeholder="Ingrese cédula del docente" value={cedula} onChange={e=>setCedula(e.target.value)} />
        <button onClick={buscar}>Buscar</button>
      </div>

      {docenteId ? <ClasesHoy docenteId={docenteId} /> : <p>Busca las clases ingresando la cédula del docente.</p>}
    </div>
  )
}
