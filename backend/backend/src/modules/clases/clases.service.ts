import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clase, ClaseDocument } from './clase.schema';

@Injectable()
export class ClasesService {
  constructor(@InjectModel(Clase.name) private claseModel: Model<ClaseDocument>) {}

  async findByDocente(idDocente: string) {
    return this.claseModel.find({ idDocente }).sort({ fecha: 1 }).exec();
  }

  async findTodayByDocente(idDocente: string) {
    const start = new Date();
    start.setHours(0,0,0,0);
    const end = new Date();
    end.setHours(23,59,59,999);
    return this.claseModel.find({
      idDocente,
      fecha: { $gte: start, $lte: end }
    }).exec();
  }

  async registerAsistencia(idClase: string) {
    return this.claseModel.findOneAndUpdate({ idClase }, { asistenciaRegistrada: true }, { new: true }).exec();
  }

  async create(payload: Partial<Clase>) {
    const newDoc = new this.claseModel(payload);
    return newDoc.save();
  }
}
