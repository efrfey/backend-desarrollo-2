import React, { useState } from "react";
import "./ClasesHoy.css";

const ClasesHoy = () => {
  const [docenteId, setDocenteId] = useState("");
  const [clases, setClases] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // 🔍 Buscar clases del docente
  const buscarClases = async () => {
    if (!docenteId.trim()) {
      setError("⚠️ Ingresa la cédula o ID del docente");
      return;
    }

    setCargando(true);
    setError("");
    setClases([]);

    try {
const respuesta = await fetch("http://localhost:4000/api/clases");



      if (!respuesta.ok) {
        throw new Error("Error al conectar con el servidor");
      }

      const data = await respuesta.json();

      if (Array.isArray(data) && data.length > 0) {
        setClases(data);
      } else {
        setError("No se encontraron clases para este docente hoy.");
      }
    } catch (err) {
      console.error("Error cargando clases:", err);
      setError("❌ No se pudo conectar con el servidor. Revisa si el backend está activo.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="clases-container">
      <h2>📚 Registro de Clases de Hoy</h2>

      <div className="busqueda">
        <input
          type="text"
          placeholder="Ingrese la cédula del docente"
          value={docenteId}
          onChange={(e) => setDocenteId(e.target.value)}
        />
        <button onClick={buscarClases} disabled={cargando}>
          {cargando ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {!error && !cargando && clases.length > 0 && (
        <table className="tabla-clases">
          <thead>
            <tr>
              <th>Curso</th>
              <th>Hora</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {clases.map((clase) => (
              <tr key={clase._id}>
                <td>{clase.curso}</td>
                <td>{clase.hora}</td>
                <td
                  style={{
                    color:
                      clase.estado === "Activa"
                        ? "orange"
                        : clase.estado === "Inactiva"
                        ? "gray"
                        : "green",
                    fontWeight: "bold",
                  }}
                >
                  {clase.estado}
                </td>
                <td>{new Date(clase.fecha).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!error && !cargando && clases.length === 0 && (
        <p>No hay clases cargadas todavía.</p>
      )}
    </div>
  );
};

export default ClasesHoy;
