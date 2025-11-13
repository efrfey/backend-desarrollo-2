import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Asistencia, AsistenciaDocument } from './asistencia.schema';
import * as XLSX from 'xlsx';

@Injectable()
export class AsistenciasService {
  constructor(@InjectModel(Asistencia.name) private asistenciaModel: Model<AsistenciaDocument>) {}

  async create(payload: Partial<Asistencia>) {
    const nueva = new this.asistenciaModel(payload);
    return nueva.save();
  }

  async findAll() {
    return this.asistenciaModel.find().exec();
  }

  async findByDocente(idDocente: string) {
    return this.asistenciaModel.find({ idDocente }).exec();
  }

  async generarReporte() {
    const data = await this.findAll();
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Asistencias');
    return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  }
}
