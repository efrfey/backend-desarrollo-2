import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clase, ClaseDocument } from './clase.schema';
import { Incidencia, IncidenciaDocument } from '../incidencias/incidencia.schema';

@Injectable()
export class ClasesService {
  constructor(
    @InjectModel(Clase.name) private claseModel: Model<ClaseDocument>,
    @InjectModel(Incidencia.name) private incidenciaModel: Model<IncidenciaDocument>,
  ) {}

  // Buscar clases por idDocente
  async findByDocente(idDocente: string) {
    return this.claseModel.find({
      idDocente: idDocente
    })
    .sort({ fecha: 1 })
    .exec();
  }

  // Buscar clases solo del día actual
  async findTodayByDocente(idDocente: string) {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return this.claseModel.find({
      idDocente: idDocente,
      fecha: { $gte: start, $lte: end }
    }).exec();
  }

  // Registrar asistencia
  async registerAsistencia(idClase: string) {
    const clase = await this.claseModel.findOne({ idClase });

    if (!clase) return null;

    // Marcar asistencia en colección clases
    await this.claseModel.findOneAndUpdate(
      { idClase },
      { asistenciaRegistrada: true }
    );

    // Crear incidencia
    const nuevaIncidencia = new this.incidenciaModel({
      idClase: clase.idClase,
      idDocente: clase.idDocente,
      materia: clase.materia,
      fecha: clase.fecha,
      horaInicio: clase.horaInicio,
      horaFin: clase.horaFin,
      tipo: 'asistencia',
      descripcion: 'Asistencia registrada por el docente',
      creadaEn: new Date(),
    });

    return nuevaIncidencia.save();
  }

  // Crear una clase nueva
  async create(payload: Partial<Clase>) {
    const newDoc = new this.claseModel(payload);
    return newDoc.save();
  }
}
