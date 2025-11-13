import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Incidencia, IncidenciaDocument } from './incidencia.schema';

@Injectable()
export class IncidenciasService {
  constructor(@InjectModel(Incidencia.name) private incidenciaModel: Model<IncidenciaDocument>) {}

  async create(payload: Partial<Incidencia>) {
    const nueva = new this.incidenciaModel(payload);
    return nueva.save();
  }

  async findAll() {
    return this.incidenciaModel.find().exec();
  }

  async findByDocente(idDocente: string) {
    return this.incidenciaModel.find({ idDocente }).exec();
  }

  async updateEstado(id: string, estado: string) {
    return this.incidenciaModel.findByIdAndUpdate(id, { estado }, { new: true }).exec();
  }
}
