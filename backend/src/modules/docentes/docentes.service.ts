import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Docente, DocenteDocument } from './docente.schema';

@Injectable()
export class DocentesService {
  constructor(@InjectModel(Docente.name) private docenteModel: Model<DocenteDocument>) {}

  async create(payload: Partial<Docente>) {
    const nuevoDocente = new this.docenteModel(payload);
    return nuevoDocente.save();
  }

  async findAll() {
    return this.docenteModel.find().exec();
  }

  async findOne(cedula: string) {
    return this.docenteModel.findOne({ cedula }).exec();
  }

  async delete(cedula: string) {
    return this.docenteModel.deleteOne({ cedula }).exec();
  }
}
