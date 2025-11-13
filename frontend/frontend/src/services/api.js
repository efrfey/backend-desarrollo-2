const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

// --- DOCENTES ---
export async function crearDocente(payload) {
  const res = await fetch(`${API_BASE}/docentes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

// --- CLASES ---
export async function getClasesHoy(idDocente) {
  const res = await fetch(`${API_BASE}/clases/hoy/${idDocente}`);
  return res.json();
}

export async function marcarAsistencia(idClase) {
  const res = await fetch(`${API_BASE}/clases/asistencia/${idClase}`, { method: 'PUT' });
  return res.json();
}

// --- INCIDENCIAS ---
export async function postIncidencia(payload) {
  const res = await fetch(`${API_BASE}/incidencias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

// --- REPORTES ---
export async function getReporteAsistencias() {
  const res = await fetch(`${API_BASE}/asistencias/reporte/download`);
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'reporte_asistencias.xlsx';
  a.click();
}
