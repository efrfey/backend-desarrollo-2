import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ClaseDocument = Clase & Document;

@Schema({ collection: 'clases' })
export class Clase {
  @Prop({ type: String, required: true, unique: true })
  idClase: string;

  @Prop({ type: String, required: true })
  idDocente: string; // referencia al docente

  @Prop({ type: String, required: true })
  materia: string;

  @Prop({ type: Date, required: true })
  fecha: Date;

  @Prop({ type: String })
  horaInicio: string;

  @Prop({ type: String })
  horaFin: string;

  @Prop({ type: Boolean, default: false })
  asistenciaRegistrada: boolean;

  @Prop({ type: String })
  observaciones: string;
}

export const ClaseSchema = SchemaFactory.createForClass(Clase);
