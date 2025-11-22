import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Asistencia, AsistenciaDocument } from './asistencia.schema';

@Injectable()
export class AsistenciasService {
  constructor(
    @InjectModel(Asistencia.name)
    private asistenciaModel: Model<AsistenciaDocument>,
  ) {}

  // Crear asistencia
  async create(payload: any) {
    const nueva = new this.asistenciaModel(payload);
    return nueva.save();
  }

  // Listar todas
  async findAll() {
    return this.asistenciaModel.find().exec();
  }

  // Buscar por estudiante
  async findByEstudiante(estudiante: string) {
    return this.asistenciaModel.find({ estudiante }).exec();
  }
}
