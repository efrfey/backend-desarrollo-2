import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Asistencia, AsistenciaDocument } from './asistencia.schema';
import * as ExcelJS from 'exceljs';

@Injectable()
export class AsistenciasService {
  constructor(
    @InjectModel(Asistencia.name)
    private asistenciaModel: Model<AsistenciaDocument>,
  ) {}

  // ➤ Crear asistencia
  async create(payload: any) {
    const nueva = new this.asistenciaModel(payload);
    return nueva.save();
  }

  // ➤ Obtener todas
  async findAll() {
    return this.asistenciaModel.find().exec();
  }

  // ➤ Buscar por docente
  async findByDocente(idDocente: string) {
    return this.asistenciaModel.find({ idDocente }).exec();
  }

  // ➤ Generar archivo Excel
  async generarReporte() {
    const asistencias = await this.asistenciaModel.find().lean();

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Asistencias');

    // Encabezados
    sheet.addRow([
      'Docente',
      'ID Clase',
      'Materia',
      'Fecha',
      'Hora Inicio',
      'Hora Fin',
      'Registrada'
    ]);

    // Filas
    asistencias.forEach(a => {
      sheet.addRow([
        a.idDocente || '',
        a.idClase || '',
        a.materia || '',
        a.fecha ? new Date(a.fecha).toLocaleString() : '',
        a.horaInicio || '',
        a.horaFin || '',
        a.asistenciaRegistrada ? 'Sí' : 'No'
      ]);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}
