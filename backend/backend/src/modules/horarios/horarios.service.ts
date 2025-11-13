import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Horario, HorarioDocument } from './horario.schema';

@Injectable()
export class HorariosService {
  constructor(@InjectModel(Horario.name) private horarioModel: Model<HorarioDocument>) {}

  async findAll() {
    return this.horarioModel.find().exec();
  }

  async findByDocente(idDocente: string) {
    return this.horarioModel.find({ idDocente }).exec();
  }

  async findTodayByDocente(idDocente: string) {
    const start = new Date();
    start.setHours(0,0,0,0);
    const end = new Date();
    end.setHours(23,59,59,999);
    return this.horarioModel.find({
      idDocente,
      fecha: { $gte: start, $lte: end }
    }).exec();
  }

  async create(payload: Partial<Horario>) {
    const nuevoHorario = new this.horarioModel(payload);
    return nuevoHorario.save();
  }
}
