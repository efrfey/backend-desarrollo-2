import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DocenteDocument = Docente & Document;

@Schema({ collection: 'docentes' })
export class Docente {
  @Prop({ type: String, required: true, unique: true })
  cedula: string;

  @Prop({ type: String, required: true })
  nombre: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String })
  telefono: string;

  @Prop({ type: String })
  departamento?: string;

  @Prop({ type: String })
  titulo?: string;
}

export const DocenteSchema = SchemaFactory.createForClass(Docente);
