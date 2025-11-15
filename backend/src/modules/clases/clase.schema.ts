import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClaseDocument = Clase & Document;

@Schema({ collection: 'clases' })
export class Clase {
  @Prop({ type: String, required: true, unique: true })
  idClase: string;

  @Prop({ type: String })
  idDocente: string;

  @Prop({ type: Number })
  cedula: number; // <-- AGREGADO

  @Prop({ type: String, required: true })
  materia: string;

  @Prop({ type: Date, required: true })
  fecha: Date;

  @Prop()
  horaInicio: string;

  @Prop()
  horaFin: string;

  @Prop({ type: Boolean, default: false })
  asistenciaRegistrada: boolean;

  @Prop()
  observaciones: string;
}

export const ClaseSchema = SchemaFactory.createForClass(Clase);
